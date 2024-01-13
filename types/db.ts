export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			Address: {
				Row: {
					city: string | null;
					googlePlaceID: string | null;
					id: string;
					state: string | null;
					street: string | null;
					zip: string | null;
				};
				Insert: {
					city?: string | null;
					googlePlaceID?: string | null;
					id?: string;
					state?: string | null;
					street?: string | null;
					zip?: string | null;
				};
				Update: {
					city?: string | null;
					googlePlaceID?: string | null;
					id?: string;
					state?: string | null;
					street?: string | null;
					zip?: string | null;
				};
			};
			Building: {
				Row: {
					addressID: string | null;
					id: number;
					name: string | null;
				};
				Insert: {
					addressID?: string | null;
					id?: number;
					name?: string | null;
				};
				Update: {
					addressID?: string | null;
					id?: number;
					name?: string | null;
				};
			};
			Building_BuildingManager: {
				Row: {
					buildingID: number | null;
					buildingManagerID: string | null;
					isActive: boolean | null;
				};
				Insert: {
					buildingID?: number | null;
					buildingManagerID?: string | null;
					isActive?: boolean | null;
				};
				Update: {
					buildingID?: number | null;
					buildingManagerID?: string | null;
					isActive?: boolean | null;
				};
			};
			BuildingManager: {
				Row: {
					firstName: string | null;
					id: string;
					lastName: string | null;
				};
				Insert: {
					firstName?: string | null;
					id: string;
					lastName?: string | null;
				};
				Update: {
					firstName?: string | null;
					id?: string;
					lastName?: string | null;
				};
			};
			CommunitySolarProvider: {
				Row: {
					capacity: number | null;
					companyName: string | null;
					coverageServiceGroupID: string | null;
					enrollment: number | null;
					id: number;
					savingsPercent: string | null;
				};
				Insert: {
					capacity?: number | null;
					companyName?: string | null;
					coverageServiceGroupID?: string | null;
					enrollment?: number | null;
					id?: number;
					savingsPercent?: string | null;
				};
				Update: {
					capacity?: number | null;
					companyName?: string | null;
					coverageServiceGroupID?: string | null;
					enrollment?: number | null;
					id?: number;
					savingsPercent?: string | null;
				};
			};
			ConnectCustomerCompanyAccess: {
				Row: {
					companyId: string;
					created_at: string;
					customerId: string;
					id: number;
					utilityProviders: string[] | null;
				};
				Insert: {
					companyId: string;
					created_at?: string;
					customerId: string;
					id?: number;
					utilityProviders?: string[] | null;
				};
				Update: {
					companyId?: string;
					created_at?: string;
					customerId?: string;
					id?: number;
					utilityProviders?: string[] | null;
				};
			};
			ConnectRequest: {
				Row: {
					canceled: boolean | null;
					completed: boolean | null;
					createdAt: string | null;
					expiresAt: string | null;
					grantedAt: string | null;
					id: string;
					permissions: string[] | null;
					redirectUrl: string | null;
					requestedFromId: string | null;
					requestorId: string | null;
					revoked: boolean | null;
				};
				Insert: {
					canceled?: boolean | null;
					completed?: boolean | null;
					createdAt?: string | null;
					expiresAt?: string | null;
					grantedAt?: string | null;
					id?: string;
					permissions?: string[] | null;
					redirectUrl?: string | null;
					requestedFromId?: string | null;
					requestorId?: string | null;
					revoked?: boolean | null;
				};
				Update: {
					canceled?: boolean | null;
					completed?: boolean | null;
					createdAt?: string | null;
					expiresAt?: string | null;
					grantedAt?: string | null;
					id?: string;
					permissions?: string[] | null;
					redirectUrl?: string | null;
					requestedFromId?: string | null;
					requestorId?: string | null;
					revoked?: boolean | null;
				};
			};
			CottageUsers: {
				Row: {
					cottageConnectUserType: Database["public"]["Enums"]["enum_CottageUsers_cottageConnectUserType"] | null;
					createdAt: string | null;
					email: string | null;
					id: string;
					referralCode: string | null;
					stripeCustomerID: string | null;
					stripePaymentMethodID: string | null;
					stripePaymentMethodType: Database["public"]["Enums"]["enum_CottageUsers_stripePaymentMethodType"] | null;
					termsAndConditionsDate: string | null;
				};
				Insert: {
					cottageConnectUserType?: Database["public"]["Enums"]["enum_CottageUsers_cottageConnectUserType"] | null;
					createdAt?: string | null;
					email?: string | null;
					id: string;
					referralCode?: string | null;
					stripeCustomerID?: string | null;
					stripePaymentMethodID?: string | null;
					stripePaymentMethodType?: Database["public"]["Enums"]["enum_CottageUsers_stripePaymentMethodType"] | null;
					termsAndConditionsDate?: string | null;
				};
				Update: {
					cottageConnectUserType?: Database["public"]["Enums"]["enum_CottageUsers_cottageConnectUserType"] | null;
					createdAt?: string | null;
					email?: string | null;
					id?: string;
					referralCode?: string | null;
					stripeCustomerID?: string | null;
					stripePaymentMethodID?: string | null;
					stripePaymentMethodType?: Database["public"]["Enums"]["enum_CottageUsers_stripePaymentMethodType"] | null;
					termsAndConditionsDate?: string | null;
				};
			};
			ElectricAccount: {
				Row: {
					accountNumber: string | null;
					communitySolarProviderID: number | null;
					communitySolarStatus: Database["public"]["Enums"]["enum_ElectricAccount_communitySolarStatus"] | null;
					cottageUserID: string | null;
					createdAt: string | null;
					electricCompanyID: string | null;
					electricSupplyPlanID: number | null;
					endDate: string | null;
					id: number;
					isAccountLinkedWithUtility: boolean | null;
					isActive: boolean | null;
					propertyID: number | null;
					startDate: string | null;
					status: Database["public"]["Enums"]["enum_ElectricAccount_status"] | null;
					supplyStatus: Database["public"]["Enums"]["enum_ElectricAccount_supplyStatus"] | null;
				};
				Insert: {
					accountNumber?: string | null;
					communitySolarProviderID?: number | null;
					communitySolarStatus?: Database["public"]["Enums"]["enum_ElectricAccount_communitySolarStatus"] | null;
					cottageUserID?: string | null;
					createdAt?: string | null;
					electricCompanyID?: string | null;
					electricSupplyPlanID?: number | null;
					endDate?: string | null;
					id?: number;
					isAccountLinkedWithUtility?: boolean | null;
					isActive?: boolean | null;
					propertyID?: number | null;
					startDate?: string | null;
					status?: Database["public"]["Enums"]["enum_ElectricAccount_status"] | null;
					supplyStatus?: Database["public"]["Enums"]["enum_ElectricAccount_supplyStatus"] | null;
				};
				Update: {
					accountNumber?: string | null;
					communitySolarProviderID?: number | null;
					communitySolarStatus?: Database["public"]["Enums"]["enum_ElectricAccount_communitySolarStatus"] | null;
					cottageUserID?: string | null;
					createdAt?: string | null;
					electricCompanyID?: string | null;
					electricSupplyPlanID?: number | null;
					endDate?: string | null;
					id?: number;
					isAccountLinkedWithUtility?: boolean | null;
					isActive?: boolean | null;
					propertyID?: number | null;
					startDate?: string | null;
					status?: Database["public"]["Enums"]["enum_ElectricAccount_status"] | null;
					supplyStatus?: Database["public"]["Enums"]["enum_ElectricAccount_supplyStatus"] | null;
				};
			};
			ElectricBill: {
				Row: {
					createdAt: string | null;
					electricAccountID: number | null;
					endDate: string | null;
					id: number;
					startDate: string | null;
					totalAmountDue: number | null;
					totalUsage: number | null;
				};
				Insert: {
					createdAt?: string | null;
					electricAccountID?: number | null;
					endDate?: string | null;
					id?: number;
					startDate?: string | null;
					totalAmountDue?: number | null;
					totalUsage?: number | null;
				};
				Update: {
					createdAt?: string | null;
					electricAccountID?: number | null;
					endDate?: string | null;
					id?: number;
					startDate?: string | null;
					totalAmountDue?: number | null;
					totalUsage?: number | null;
				};
			};
			ElectricCompany: {
				Row: {
					checkOutageStatusURL: string | null;
					electricIntegrationType: Database["public"]["Enums"]["electricIntegrationType"] | null;
					id: string;
					isElectricIntegrationActive: boolean | null;
					isHandleMoveIns: boolean | null;
					logoURL: string | null;
					name: string | null;
					outageMapURL: string | null;
					reportOutageURL: string | null;
					website: string | null;
				};
				Insert: {
					checkOutageStatusURL?: string | null;
					electricIntegrationType?: Database["public"]["Enums"]["electricIntegrationType"] | null;
					id: string;
					isElectricIntegrationActive?: boolean | null;
					isHandleMoveIns?: boolean | null;
					logoURL?: string | null;
					name?: string | null;
					outageMapURL?: string | null;
					reportOutageURL?: string | null;
					website?: string | null;
				};
				Update: {
					checkOutageStatusURL?: string | null;
					electricIntegrationType?: Database["public"]["Enums"]["electricIntegrationType"] | null;
					id?: string;
					isElectricIntegrationActive?: boolean | null;
					isHandleMoveIns?: boolean | null;
					logoURL?: string | null;
					name?: string | null;
					outageMapURL?: string | null;
					reportOutageURL?: string | null;
					website?: string | null;
				};
			};
			ElectricSupplyPlan: {
				Row: {
					cancellationFee: string | null;
					contractLengthMonths: number | null;
					electricCompany: string | null;
					endDate: string | null;
					hasCancellationFees: boolean | null;
					id: number;
					rate: string | null;
					rateType: Database["public"]["Enums"]["enum_ElectricSupplyPlan_rateType"] | null;
					renewablePercentage: number | null;
					startDate: string | null;
					supplierName: string | null;
				};
				Insert: {
					cancellationFee?: string | null;
					contractLengthMonths?: number | null;
					electricCompany?: string | null;
					endDate?: string | null;
					hasCancellationFees?: boolean | null;
					id?: number;
					rate?: string | null;
					rateType?: Database["public"]["Enums"]["enum_ElectricSupplyPlan_rateType"] | null;
					renewablePercentage?: number | null;
					startDate?: string | null;
					supplierName?: string | null;
				};
				Update: {
					cancellationFee?: string | null;
					contractLengthMonths?: number | null;
					electricCompany?: string | null;
					endDate?: string | null;
					hasCancellationFees?: boolean | null;
					id?: number;
					rate?: string | null;
					rateType?: Database["public"]["Enums"]["enum_ElectricSupplyPlan_rateType"] | null;
					renewablePercentage?: number | null;
					startDate?: string | null;
					supplierName?: string | null;
				};
			};
			ExternalCompany: {
				Row: {
					created_at: string | null;
					id: string;
					name: string | null;
				};
				Insert: {
					created_at?: string | null;
					id: string;
					name?: string | null;
				};
				Update: {
					created_at?: string | null;
					id?: string;
					name?: string | null;
				};
			};
			GreenButtonBillingSummary: {
				Row: {
					billedAmount: number | null;
					billingSummaryId: string | null;
					consumption: number | null;
					currency: number | null;
					endDate: string | null;
					greenButtonOAuthId: number;
					greenButtonUsagePoint: string;
					icapTag: number | null;
					id: number;
					qualityOfReading: number | null;
					serviceClass: string | null;
					startDate: string | null;
					statusTimestamp: string | null;
				};
				Insert: {
					billedAmount?: number | null;
					billingSummaryId?: string | null;
					consumption?: number | null;
					currency?: number | null;
					endDate?: string | null;
					greenButtonOAuthId: number;
					greenButtonUsagePoint: string;
					icapTag?: number | null;
					id?: number;
					qualityOfReading?: number | null;
					serviceClass?: string | null;
					startDate?: string | null;
					statusTimestamp?: string | null;
				};
				Update: {
					billedAmount?: number | null;
					billingSummaryId?: string | null;
					consumption?: number | null;
					currency?: number | null;
					endDate?: string | null;
					greenButtonOAuthId?: number;
					greenButtonUsagePoint?: string;
					icapTag?: number | null;
					id?: number;
					qualityOfReading?: number | null;
					serviceClass?: string | null;
					startDate?: string | null;
					statusTimestamp?: string | null;
				};
			};
			GreenButtonBulkDownload: {
				Row: {
					createdAt: string | null;
					description: string | null;
					id: number;
					provider: string | null;
					status: string | null;
					url: string | null;
				};
				Insert: {
					createdAt?: string | null;
					description?: string | null;
					id?: number;
					provider?: string | null;
					status?: string | null;
					url?: string | null;
				};
				Update: {
					createdAt?: string | null;
					description?: string | null;
					id?: number;
					provider?: string | null;
					status?: string | null;
					url?: string | null;
				};
			};
			GreenButtonMeterReading: {
				Row: {
					greenButtonOAuthId: number;
					id: number;
					meterReadingId: string;
					serviceCategoryKind: number | null;
					usagePointId: string;
				};
				Insert: {
					greenButtonOAuthId: number;
					id?: number;
					meterReadingId: string;
					serviceCategoryKind?: number | null;
					usagePointId: string;
				};
				Update: {
					greenButtonOAuthId?: number;
					id?: number;
					meterReadingId?: string;
					serviceCategoryKind?: number | null;
					usagePointId?: string;
				};
			};
			GreenButtonOAuth: {
				Row: {
					accessToken: string | null;
					accountNumber: string | null;
					cottageUserID: string | null;
					createdAt: string | null;
					electricAccountID: number | null;
					endDate: string | null;
					id: number;
					provider: string | null;
					refreshToken: string | null;
					scopes: string | null;
					startDate: string | null;
					subscriptionID: string | null;
				};
				Insert: {
					accessToken?: string | null;
					accountNumber?: string | null;
					cottageUserID?: string | null;
					createdAt?: string | null;
					electricAccountID?: number | null;
					endDate?: string | null;
					id?: number;
					provider?: string | null;
					refreshToken?: string | null;
					scopes?: string | null;
					startDate?: string | null;
					subscriptionID?: string | null;
				};
				Update: {
					accessToken?: string | null;
					accountNumber?: string | null;
					cottageUserID?: string | null;
					createdAt?: string | null;
					electricAccountID?: number | null;
					endDate?: string | null;
					id?: number;
					provider?: string | null;
					refreshToken?: string | null;
					scopes?: string | null;
					startDate?: string | null;
					subscriptionID?: string | null;
				};
			};
			GreenButtonSyncLog: {
				Row: {
					description: string | null;
					greenButtonOAuthId: number;
					id: number;
					operation: string | null;
					status: string | null;
					timestamp: string;
				};
				Insert: {
					description?: string | null;
					greenButtonOAuthId: number;
					id?: number;
					operation?: string | null;
					status?: string | null;
					timestamp?: string;
				};
				Update: {
					description?: string | null;
					greenButtonOAuthId?: number;
					id?: number;
					operation?: string | null;
					status?: string | null;
					timestamp?: string;
				};
			};
			MeterReadings: {
				Row: {
					created_at: string | null;
					duration: number | null;
					property: number | null;
					reading: number | null;
					readingAt: string;
				};
				Insert: {
					created_at?: string | null;
					duration?: number | null;
					property?: number | null;
					reading?: number | null;
					readingAt: string;
				};
				Update: {
					created_at?: string | null;
					duration?: number | null;
					property?: number | null;
					reading?: number | null;
					readingAt?: string;
				};
			};
			Occupancy: {
				Row: {
					cottageUserID: string | null;
					createdAt: string | null;
					electricAccountID: number | null;
					endDate: string | null;
					id: number;
					isActive: boolean | null;
					propertyID: number | null;
					startDate: string | null;
				};
				Insert: {
					cottageUserID?: string | null;
					createdAt?: string | null;
					electricAccountID?: number | null;
					endDate?: string | null;
					id?: number;
					isActive?: boolean | null;
					propertyID?: number | null;
					startDate?: string | null;
				};
				Update: {
					cottageUserID?: string | null;
					createdAt?: string | null;
					electricAccountID?: number | null;
					endDate?: string | null;
					id?: number;
					isActive?: boolean | null;
					propertyID?: number | null;
					startDate?: string | null;
				};
			};
			Property: {
				Row: {
					addressID: string | null;
					buildingID: number | null;
					createdAt: string | null;
					id: number;
					isRenewablePaidFor: boolean | null;
					type: Database["public"]["Enums"]["enum_Unit_residenceType"] | null;
					unitNumber: string | null;
				};
				Insert: {
					addressID?: string | null;
					buildingID?: number | null;
					createdAt?: string | null;
					id?: number;
					isRenewablePaidFor?: boolean | null;
					type?: Database["public"]["Enums"]["enum_Unit_residenceType"] | null;
					unitNumber?: string | null;
				};
				Update: {
					addressID?: string | null;
					buildingID?: number | null;
					createdAt?: string | null;
					id?: number;
					isRenewablePaidFor?: boolean | null;
					type?: Database["public"]["Enums"]["enum_Unit_residenceType"] | null;
					unitNumber?: string | null;
				};
			};
			ReferralPartner: {
				Row: {
					code: string | null;
					id: string;
					imgURL: string | null;
					name: string | null;
					useBuildingLookup: boolean | null;
				};
				Insert: {
					code?: string | null;
					id: string;
					imgURL?: string | null;
					name?: string | null;
					useBuildingLookup?: boolean | null;
				};
				Update: {
					code?: string | null;
					id?: string;
					imgURL?: string | null;
					name?: string | null;
					useBuildingLookup?: boolean | null;
				};
			};
			ReferralPartner_Building: {
				Row: {
					buildingID: number;
					referralPartnerID: string;
				};
				Insert: {
					buildingID: number;
					referralPartnerID: string;
				};
				Update: {
					buildingID?: number;
					referralPartnerID?: string;
				};
			};
			Referrals: {
				Row: {
					createdAt: string | null;
					referralStatus: Database["public"]["Enums"]["referral_status"];
					referred: string;
					referredBy: string;
				};
				Insert: {
					createdAt?: string | null;
					referralStatus?: Database["public"]["Enums"]["referral_status"];
					referred: string;
					referredBy: string;
				};
				Update: {
					createdAt?: string | null;
					referralStatus?: Database["public"]["Enums"]["referral_status"];
					referred?: string;
					referredBy?: string;
				};
			};
			RenewableSubscriptionPayments: {
				Row: {
					amount: number | null;
					id: number;
					isProcessed: boolean | null;
					payerID: string | null;
					paymentDate: string | null;
					renewableSubscription: number | null;
					status: Database["public"]["Enums"]["stripepaymentstatus"] | null;
					stripePaymentID: string | null;
				};
				Insert: {
					amount?: number | null;
					id?: number;
					isProcessed?: boolean | null;
					payerID?: string | null;
					paymentDate?: string | null;
					renewableSubscription?: number | null;
					status?: Database["public"]["Enums"]["stripepaymentstatus"] | null;
					stripePaymentID?: string | null;
				};
				Update: {
					amount?: number | null;
					id?: number;
					isProcessed?: boolean | null;
					payerID?: string | null;
					paymentDate?: string | null;
					renewableSubscription?: number | null;
					status?: Database["public"]["Enums"]["stripepaymentstatus"] | null;
					stripePaymentID?: string | null;
				};
			};
			RenewableSubscriptionPlan: {
				Row: {
					costPerMonth: number | null;
					id: number;
				};
				Insert: {
					costPerMonth?: number | null;
					id?: number;
				};
				Update: {
					costPerMonth?: number | null;
					id?: number;
				};
			};
			RenewableSubscriptions: {
				Row: {
					cottageUserId: string | null;
					createdAt: string | null;
					endDate: string | null;
					id: number;
					propertyID: number | null;
					renewableSubscriptionPlan: number | null;
					startDate: string | null;
				};
				Insert: {
					cottageUserId?: string | null;
					createdAt?: string | null;
					endDate?: string | null;
					id?: number;
					propertyID?: number | null;
					renewableSubscriptionPlan?: number | null;
					startDate?: string | null;
				};
				Update: {
					cottageUserId?: string | null;
					createdAt?: string | null;
					endDate?: string | null;
					id?: number;
					propertyID?: number | null;
					renewableSubscriptionPlan?: number | null;
					startDate?: string | null;
				};
			};
			Resident: {
				Row: {
					cottageUserID: string | null;
					createdAt: string | null;
					firstName: string | null;
					id: number;
					isRegistrationComplete: boolean | null;
					lastName: string | null;
					phone: string | null;
					startServiceDate: string | null;
				};
				Insert: {
					cottageUserID?: string | null;
					createdAt?: string | null;
					firstName?: string | null;
					id?: number;
					isRegistrationComplete?: boolean | null;
					lastName?: string | null;
					phone?: string | null;
					startServiceDate?: string | null;
				};
				Update: {
					cottageUserID?: string | null;
					createdAt?: string | null;
					firstName?: string | null;
					id?: number;
					isRegistrationComplete?: boolean | null;
					lastName?: string | null;
					phone?: string | null;
					startServiceDate?: string | null;
				};
			};
			ResidentIdentity: {
				Row: {
					cottageUserID: string | null;
					dateOfBirth: string | null;
					id: number;
					identificationNumber: string | null;
					identificationOther: string | null;
					identificationType: string | null;
				};
				Insert: {
					cottageUserID?: string | null;
					dateOfBirth?: string | null;
					id?: number;
					identificationNumber?: string | null;
					identificationOther?: string | null;
					identificationType?: string | null;
				};
				Update: {
					cottageUserID?: string | null;
					dateOfBirth?: string | null;
					id?: number;
					identificationNumber?: string | null;
					identificationOther?: string | null;
					identificationType?: string | null;
				};
			};
			SequelizeMeta: {
				Row: {
					name: string;
				};
				Insert: {
					name: string;
				};
				Update: {
					name?: string;
				};
			};
			ServiceGroup: {
				Row: {
					activeSupplyPlanID: number | null;
					communitySolarAvailability: Database["public"]["Enums"]["serviceGroupCommunitySolarAvailability"] | null;
					electricCompanyID: string | null;
					id: string;
					isActiveReferralProgram: boolean | null;
					referralProgramAmount: number | null;
					renewableSubscriptionPlanID: number | null;
					status: Database["public"]["Enums"]["serviceGroupStatus"] | null;
				};
				Insert: {
					activeSupplyPlanID?: number | null;
					communitySolarAvailability?: Database["public"]["Enums"]["serviceGroupCommunitySolarAvailability"] | null;
					electricCompanyID?: string | null;
					id: string;
					isActiveReferralProgram?: boolean | null;
					referralProgramAmount?: number | null;
					renewableSubscriptionPlanID?: number | null;
					status?: Database["public"]["Enums"]["serviceGroupStatus"] | null;
				};
				Update: {
					activeSupplyPlanID?: number | null;
					communitySolarAvailability?: Database["public"]["Enums"]["serviceGroupCommunitySolarAvailability"] | null;
					electricCompanyID?: string | null;
					id?: string;
					isActiveReferralProgram?: boolean | null;
					referralProgramAmount?: number | null;
					renewableSubscriptionPlanID?: number | null;
					status?: Database["public"]["Enums"]["serviceGroupStatus"] | null;
				};
			};
			ServiceZip: {
				Row: {
					id: string;
					isActive: boolean | null;
					serviceGroup: string | null;
				};
				Insert: {
					id: string;
					isActive?: boolean | null;
					serviceGroup?: string | null;
				};
				Update: {
					id?: string;
					isActive?: boolean | null;
					serviceGroup?: string | null;
				};
			};
			UtilityAPIReferrals: {
				Row: {
					id: number;
					manuallyProcessed: boolean | null;
					provider: string | null;
					referral: string | null;
					userId: string | null;
				};
				Insert: {
					id?: number;
					manuallyProcessed?: boolean | null;
					provider?: string | null;
					referral?: string | null;
					userId?: string | null;
				};
				Update: {
					id?: number;
					manuallyProcessed?: boolean | null;
					provider?: string | null;
					referral?: string | null;
					userId?: string | null;
				};
			};
			UtilityAutomationLog: {
				Row: {
					attempt_count: number | null;
					created_at: string | null;
					description: string | null;
					id: number;
					operation: string;
					payload: string | null;
					provider: string;
					status: string;
					updated_at: string | null;
					user: string | null;
				};
				Insert: {
					attempt_count?: number | null;
					created_at?: string | null;
					description?: string | null;
					id?: number;
					operation: string;
					payload?: string | null;
					provider: string;
					status: string;
					updated_at?: string | null;
					user?: string | null;
				};
				Update: {
					attempt_count?: number | null;
					created_at?: string | null;
					description?: string | null;
					id?: number;
					operation?: string;
					payload?: string | null;
					provider?: string;
					status?: string;
					updated_at?: string | null;
					user?: string | null;
				};
			};
			WaitList: {
				Row: {
					address: string | null;
					created_at: string | null;
					email: string | null;
					id: number;
					isForBeta: boolean | null;
					name: string | null;
					reference: string | null;
					zip: string | null;
				};
				Insert: {
					address?: string | null;
					created_at?: string | null;
					email?: string | null;
					id?: number;
					isForBeta?: boolean | null;
					name?: string | null;
					reference?: string | null;
					zip?: string | null;
				};
				Update: {
					address?: string | null;
					created_at?: string | null;
					email?: string | null;
					id?: number;
					isForBeta?: boolean | null;
					name?: string | null;
					reference?: string | null;
					zip?: string | null;
				};
			};
		};
		Views: {
			UserProviderPermission: {
				Row: {
					provider: string | null;
					user: string | null;
				};
				Insert: {
					provider?: string | null;
					user?: string | null;
				};
				Update: {
					provider?: string | null;
					user?: string | null;
				};
			};
		};
		Functions: {
			fetch_referrals: {
				Args: {
					userid: string;
				};
				Returns: {
					referred: string;
					referredBy: string;
					referralStatus: Database["public"]["Enums"]["referral_status"];
					name: string;
					first_name: string;
					created_at: string;
				}[];
			};
			fetch_referrals_secure: {
				Args: Record<PropertyKey, never>;
				Returns: {
					referred: string;
					referredBy: string;
					referralStatus: Database["public"]["Enums"]["referral_status"];
					name: string;
					first_name: string;
					createdAt: string;
				}[];
			};
			get_green_button_sync_jobs_to_retry: {
				Args: Record<PropertyKey, never>;
				Returns: {
					greenbuttonoauthid: number;
					operation: string;
					status: string;
					subscriptionid: string;
					refreshtoken: string;
					userid: string;
					provider: string;
				}[];
			};
			get_referrals: {
				Args: {
					userid: string;
				};
				Returns: {
					referred: string;
					referredBy: string;
					referralStatus: Database["public"]["Enums"]["referral_status"];
					firstName: string;
					lastName: string;
					name: string;
					createdAt: string;
				}[];
			};
			hello_world: {
				Args: Record<PropertyKey, never>;
				Returns: string;
			};
			http: {
				Args: {
					request: Database["public"]["CompositeTypes"]["http_request"];
				};
				Returns: Database["public"]["CompositeTypes"]["http_response"];
			};
			http_delete: {
				Args: {
					uri: string;
				};
				Returns: Database["public"]["CompositeTypes"]["http_response"];
			};
			http_get: {
				Args: {
					uri: string;
				};
				Returns: Database["public"]["CompositeTypes"]["http_response"];
			};
			http_head: {
				Args: {
					uri: string;
				};
				Returns: Database["public"]["CompositeTypes"]["http_response"];
			};
			http_header: {
				Args: {
					field: string;
					value: string;
				};
				Returns: Database["public"]["CompositeTypes"]["http_header"];
			};
			http_patch: {
				Args: {
					uri: string;
					content: string;
					content_type: string;
				};
				Returns: Database["public"]["CompositeTypes"]["http_response"];
			};
			http_post: {
				Args: {
					uri: string;
					content: string;
					content_type: string;
				};
				Returns: Database["public"]["CompositeTypes"]["http_response"];
			};
			http_put: {
				Args: {
					uri: string;
					content: string;
					content_type: string;
				};
				Returns: Database["public"]["CompositeTypes"]["http_response"];
			};
			http_reset_curlopt: {
				Args: Record<PropertyKey, never>;
				Returns: boolean;
			};
			http_set_curlopt: {
				Args: {
					curlopt: string;
					value: string;
				};
				Returns: boolean;
			};
			retry_green_button_jobs:
				| {
						Args: {
							url: string;
						};
						Returns: {
							http_post: string;
						}[];
				  }
				| {
						Args: {
							url: string;
							secret: string;
						};
						Returns: {
							http_post: string;
						}[];
				  };
			retry_utility_automation_jobs: {
				Args: {
					url: string;
					secret: string;
				};
				Returns: {
					http_post: string;
				}[];
			};
			urlencode: {
				Args: {
					string: string;
				};
				Returns: string;
			};
		};
		Enums: {
			electricIntegrationType: "greenButton" | "automation" | "other";
			enum_CottageUsers_cottageConnectUserType: "CUSTOMER" | "COMPANY" | "REFERRAL_PARTNER" | "BUILDING";
			enum_CottageUsers_stripePaymentMethodType: "card" | "us_bank_account";
			enum_ElectricAccount_communitySolarStatus: "NONE" | "PENDING" | "ENROLLED";
			enum_ElectricAccount_status: "NEW" | "PENDING_CREATE" | "PENDING_LINK" | "ACTIVE" | "INACTIVE";
			enum_ElectricAccount_supplyStatus: "DEFAULT" | "CHANGE_PENDING" | "NON_DEFAULT";
			enum_ElectricSupplyPlan_rateType: "FIXED" | "VARIABLE" | "TIME_OF_USE";
			enum_Unit_residenceType: "APARTMENT" | "HOME";
			referral_status: "pending" | "complete" | "invalid";
			serviceGroupCommunitySolarAvailability: "NONE" | "WAITLIST" | "ACTIVE";
			serviceGroupStatus: "ACTIVE" | "BETA" | "NOT_ACTIVE";
			stripepaymentstatus:
				| "requires_payment_method"
				| "requires_confirmation"
				| "requires_action"
				| "processing"
				| "requires_capture"
				| "canceled"
				| "succeeded";
		};
		CompositeTypes: {
			http_header: {
				field: string;
				value: string;
			};
			http_request: {
				method: unknown;
				uri: string;
				headers: unknown;
				content_type: string;
				content: string;
			};
			http_response: {
				status: number;
				content_type: string;
				headers: unknown;
				content: string;
			};
		};
	};
}
