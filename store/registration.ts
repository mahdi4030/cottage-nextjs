"use client";
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User } from "@supabase/gotrue-js";

import { Registration, Resident, Property, Address, Occupancy, CottageUsers } from "@/types/models";
import {
  PropertyType,
  ElectricStatus,
  RegistrationAccountType,
  RegistrationFlowType,
  CottageConnectUserType,
  ElectricSupplyStatus,
  CommunitySolarStatusTypes
} from "@/types/enums";

import { OccupancyStore, AddressStore, PropertyStore, RegServicesStore, CottageUserStore } from './';

import { generateReferralString } from "@/utils/referrals";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';

interface RegistrationState {
  loaded: boolean;
  registration: Registration;

  reset: () => void;
  createRegistration: (user: User) => void;
  postCreateAccountNotifications: (userEmail: string | undefined) => {};
  setRegistration: (registration: Registration) => void;
  setResidentFirstName: (firstName: string) => void;
  setResidentLastName: (firstName: string) => void;
  setAccountType: (accountType: string) => void;
  setResidentStartServiceDate: (startServiceDate: string) => void;
  setDisplayAddress: (displayAddress: string) => void;
  setIsAddressCovered: (isAddressCovered: boolean) => void;
  setPropertyUnitNumber: (unitNumber: string) => void;
  setFlowType: (flowType: string) => void;
}

function initRegistration() {
  return {
    resident: {} as Resident,
    property: {} as Property,
    address: {} as Address,
    isAddressCovered: false,
    isActiveBuilding: false,
    isValidAddress: false,
    displayAddress: "",
    referrerCode: "",
    referrerID: "",
    accountType: RegistrationAccountType.NONE,
    // flowType: RegistrationFlowType.NONE,
    flowType: RegistrationFlowType.DEFAULT,
  } as Partial<Registration>;
}
export const RegistrationStore = create<RegistrationState>()(
  devtools(
    persist(
      (set, get) => ({
        loaded: false,
        registration: initRegistration() as Registration,
        reset: () => {
          set({ loaded: false, registration: initRegistration() as Registration });
          if (typeof window !== 'undefined') { //!process.server in nuxt
            document.cookie = "registration=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          }
        },
        createRegistration: async (user: User) => {
          // create CottageUser
          const supabase = createClientComponentClient<Database>();
          const { data: cottageUserData, error: cottageUserError } = await supabase
            .from("CottageUsers")
            .insert({
              id: user.id,
              referralCode: get().registration.resident.firstName?.toUpperCase() + "-" + generateReferralString(),
              cottageConnectUserType: CottageConnectUserType.CUSTOMER,
              email: user.email,
              termsAndConditionsDate: new Date(),
            })
            .select("*")
            .limit(1)
            .single();
          if (cottageUserError) {
            throw cottageUserError;
          }
          const { setCottageUser } = CottageUserStore.getState();
          setCottageUser(cottageUserData as CottageUsers);

          const { firstName, lastName } = get().registration.resident;
          const startServiceDate =
            get().registration.resident.startServiceDate === "" ? new Date().toLocaleDateString() : get().registration.resident.startServiceDate;
          const { data: residentData, error: residentError } = await supabase
            .from("Resident")
            .insert({
              firstName,
              lastName,
              startServiceDate,
              cottageUserID: user.id,
              isRegistrationComplete: false,
            })
            .select("*")
            .limit(1)
            .single();
          if (residentError) {
            throw residentError;
          }
          set({ registration: { ...Object.assign(get().registration), resident: residentData } as Registration });

          const existingAddressID = await AddressStore.getState().getAddressIdByGooglePlaceID(get().registration.address.googlePlaceID);
          if (!existingAddressID) {
            const { street, city, state, zip, googlePlaceID } = get().registration.address;
            const { data: addressData, error: addressError } = await supabase
              .from("Address")
              .insert({
                street,
                city,
                state,
                zip,
                googlePlaceID,
              })
              .select("*")
              .limit(1)
              .single();
            if (addressError) {
              throw addressError;
            }
            set({ registration: { ...Object.assign(get().registration), address: addressData } as Registration });
          } else {
            set({ registration: { ...Object.assign(get().registration), address: { ...Object.assign(get().registration.address), id: existingAddressID } as Address } as Registration });
          }

          let unitNumber = get().registration?.property?.unitNumber;
          if (!unitNumber) unitNumber = null;
          const { getPropertyIDByAddressId } = PropertyStore.getState();
          const existingProperty = await getPropertyIDByAddressId(get().registration.address.id ?? null, unitNumber);
          if (!existingProperty) {
            const propertyType = unitNumber && unitNumber.length > 0 ? PropertyType.APARTMENT : PropertyType.HOME;
            const { data: propertyData, error: propertyError } = await supabase
              .from("Property")
              .insert({
                addressID: get().registration.address.id,
                unitNumber: unitNumber,
                type: propertyType,
              })
              .select("*")
              .limit(1)
              .single();
            if (propertyError) {
              throw propertyError;
            }
            set({ registration: { ...Object.assign(get().registration), property: propertyData } as Registration });
          } else {
            set({ registration: { ...Object.assign(get().registration), property: { ...get().registration.property, id: existingProperty } } as Registration });
          }

          const { data: electricAccountData, error: electricAccountError } = await supabase
            .from("ElectricAccount")
            .insert({
              isActive: get().registration.accountType === RegistrationAccountType.EXISTING,
              electricCompanyID: RegServicesStore.getState().serviceGroup.electricCompanyID?.id,
              cottageUserID: user.id,
              accountNumber: "",
              status: get().registration.accountType === RegistrationAccountType.EXISTING ? ElectricStatus.PENDING_LINK : ElectricStatus.NEW,
              isAccountLinkedWithUtility: false,
              startDate: startServiceDate,
              endDate: "2099-12-31",
              supplyStatus: ElectricSupplyStatus.DEFAULT,
              communitySolarStatus: CommunitySolarStatusTypes.NONE,
              propertyID: get().registration.property.id,
            })
            .select("*")
            .limit(1)
            .single();
          if (electricAccountError) {
            throw electricAccountError;
          }
          const { data: occupancyData, error: occupancyError } = await supabase.from("Occupancy").insert({
            cottageUserID: user.id,
            propertyID: get().registration.property.id,
            electricAccountID: electricAccountData.id,
            startDate: startServiceDate,
            isActive: true,
            endDate: "2099-12-31",
          });
          if (occupancyError) {
            throw occupancyError;
          }
          const { setOccupancy } = OccupancyStore.getState();
          setOccupancy(occupancyData as Occupancy);

          if (get().registration.referrerCode) {
            try {
              await fetch("/api/referrals/create-referral", {
                method: "post",
                body: JSON.stringify({
                  referrerCode: get().registration.referrerCode,
                  userID: user.id,
                }),
              });
            } catch (error) {
              console.error("ERROR ADDING REFERRAL FOR USER", error);
            }
          }

          try {
            get().postCreateAccountNotifications(user.email);
          } catch (error) {
            console.error(error);
          }
        },
        postCreateAccountNotifications: async (userEmail: string | undefined) => {
          const { registration } = get();
          const mailBody = {
            to: {
              name: registration.resident.firstName + " " + registration.resident.lastName,
              email: userEmail,
              BCC: "welcome@energybycottage.com",
              BCCName: "Cottage Energy",
            },
            data: {
              firstName: registration.resident.firstName,
              streetAddress: registration.address.street,
              streetAddress2: registration.property.unitNumber,
              city: registration.address.city,
              state: registration.address.state,
              zip: registration.address.zip,
              isNewAccount: registration.accountType === RegistrationAccountType.NEW,
              isExistingAccount: registration.accountType === RegistrationAccountType.EXISTING,
            },
            template: "REGISTRATION",
          };

          await fetch("/api/send-mail", {
            method: "post",
            body: JSON.stringify(mailBody),
          });

          const alertBody = {
            message: `New registration for ${registration.resident.firstName} ${registration.resident.lastName} 
            at ${registration.address.street}, ${registration.property.unitNumber}, 
            ${registration.address.city}, ${registration.address.state}, ${registration.address.zip}, 
            at ${new Date().toLocaleString()}`,
            channel: "sign-ups",
          };

          await fetch("/api/send-alert", {
            method: "post",
            body: JSON.stringify(alertBody),
          });
        },
        setRegistration: (registration: Registration) => {
          set({ registration: registration });
        },
        setResidentFirstName: (firstName: string) => {
          const { registration } = get();
          set({ registration: { ...Object.assign(registration), resident: { ...registration.resident, firstName: firstName } } as Registration });
        },
        setResidentLastName: (lastName: string) => {
          const { registration } = get();
          set({ registration: { ...Object.assign(registration), resident: { ...registration.resident, lastName: lastName } } as Registration });
        },
        setAccountType: (accountType: string) => {
          const { registration } = get();
          set({ registration: { ...Object.assign(registration), accountType: accountType } as Registration });
        },
        setResidentStartServiceDate: (startServiceDate: string) => {
          const { registration } = get();
          set({ registration: { ...Object.assign(registration), resident: { ...registration.resident, startServiceDate: startServiceDate } } as Registration });
        },
        setDisplayAddress: (displayAddress: string) => {
          const { registration } = get();
          const isValidAddress = (displayAddress.length != 0 && displayAddress == registration.formatted_address);
          set({ registration: { ...Object.assign(registration), displayAddress: displayAddress, isValidAddress, formatted_address: (isValidAddress?registration.formatted_address:""), address: (isValidAddress?registration.address:{}) } as Registration });
        },
        setIsAddressCovered: (isAddressCovered: boolean) => {
          const { registration } = get();
          set({ registration: { ...Object.assign(registration), isAddressCovered: isAddressCovered } as Registration });
        },
        setPropertyUnitNumber: (unitNumber: string) => {
          const { registration } = get();
          set({ registration: { ...Object.assign(registration), property: { ...registration.property, unitNumber } } });
        },
        setFlowType: (flowType: string) => {
          const { registration } = get();
          set({ registration: { ...Object.assign(registration), flowType } as Registration });
        }
      }),
      { name: "registration-store" }
    )
  )
);
