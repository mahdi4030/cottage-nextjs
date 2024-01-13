import type { Database } from "./db";
import type { RegistrationAccountType, RegistrationFlowType } from "./enums";

export type Address = Database["public"]["Tables"]["Address"]["Row"];
export type Building = Database["public"]["Tables"]["Building"]["Row"];
export type Building_BuildingManager = Database["public"]["Tables"]["Building_BuildingManager"]["Row"];
export type BuildingManager = Database["public"]["Tables"]["BuildingManager"]["Row"];
export type CommunitySolarProvider = Database["public"]["Tables"]["CommunitySolarProvider"]["Row"];
export type CottageUsers = Database["public"]["Tables"]["CottageUsers"]["Row"];
export type ElectricAccount = Database["public"]["Tables"]["ElectricAccount"]["Row"];
export type ElectricBill = Database["public"]["Tables"]["ElectricBill"]["Row"];
export type ElectricCompany = Database["public"]["Tables"]["ElectricCompany"]["Row"];
export type ElectricSupplyPlan = Database["public"]["Tables"]["ElectricSupplyPlan"]["Row"];
export type Occupancy = Database["public"]["Tables"]["Occupancy"]["Row"];
export type Property = Database["public"]["Tables"]["Property"]["Row"];
export type ReferralPartner = Database["public"]["Tables"]["ReferralPartner"]["Row"];
export type ReferralPartner_Building = Database["public"]["Tables"]["ReferralPartner_Building"]["Row"];
export type Referrals = Database["public"]["Tables"]["Referrals"]["Row"];
export type RenewableSubscriptionPayments = Database["public"]["Tables"]["RenewableSubscriptionPayments"]["Row"];
export type RenewableSubscriptionPlan = Database["public"]["Tables"]["RenewableSubscriptionPlan"]["Row"];
export type RenewableSubscriptions = Database["public"]["Tables"]["RenewableSubscriptions"]["Row"];
export type Resident = Database["public"]["Tables"]["Resident"]["Row"];
export type ServiceGroup = Database["public"]["Tables"]["ServiceGroup"]["Row"];
export type ServiceZip = Database["public"]["Tables"]["ServiceZip"]["Row"];
export type WaitList = Database["public"]["Tables"]["WaitList"]["Row"];
export type GreenButtonOAuth = Database["public"]["Tables"]["GreenButtonOAuth"]["Row"];

export type Registration = {
	resident: Resident;
	property: Property;
	address: Address;
	formatted_address: string;
	// HELPERS THAT DO NOT GET SYNCED TO DB
	termsAndConditions: boolean;
	isAddressCovered: boolean;
	isActiveBuilding: boolean;
	isValidAddress: boolean;
	displayAddress: string;
	isOAuthBeforeUtilityLink: boolean;
	referrerCode: string;
	referrerID: string;
	// accountType: RegistrationAccountType;
	// flowType: RegistrationFlowType;
	accountType: string;
	flowType: string;
};
