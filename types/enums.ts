export enum ElectricSupplyStatus {
	CHANGE_PENDING = "CHANGE_PENDING",
	DEFAULT = "DEFAULT",
	NON_DEFAULT = "NON_DEFAULT",
	NULL = "NULL",
}

export enum RegistrationAccountType {
	NEW = "NEW",
	EXISTING = "EXISTING",
	NONE = "NONE",
}

export enum CottageConnectUserType {
	PARTNER = "PARTNER",
	COMPANY = "COMPANY",
	CUSTOMER = "CUSTOMER",
	NONE = "NONE",
}

export enum RegistrationFlowType {
	NONE = "NONE",
	PARTNER = "PARTNER",
	DEFAULT = "DEFAULT"
}

export enum ElectricAccountFor {
	PROPERTY = "PROPERTY",
	RESIDENT = "RESIDENT",
}

export enum CommunitySolarStatusTypes {
	PENDING = "PENDING",
	ENROLLED = "ENROLLED",
	NONE = "NONE",
}

export enum ElectricCompanyType {
	SUPPLY = "SUPPLY",
	UTILITY = "UTILITY",
}

export enum ElectricIntegrationType {
	GREENBUTTON = "greenButton",
	AUTOMATION = "automation",
	OTHER = "other",
	NONE = "none",
}

export enum SupplyPlanType {
	RENEWABLE = "100_RENEWABLE",
	MIXED = "MIXED",
	DEFAULT = "DEFAULT",
	GUARANTEED_SAVINGS = "GUARANTEED_SAVINGS",
	NONE = "",
}

export enum SupplyContractType {
	FIXED = "FIXED",
	VARIABLE = "VARIABLE",
	NONE = "",
}

export enum OccupancyType {
	RESIDENT = "RESIDENT",
	PROPERTY_MANAGER = "PROPERTY_MANAGER",
}

export enum PaymentMethod {
	CARD = "CARD",
	ACH = "ACH",
}

export enum PaymentMethodType {
	CARD = "card",
	BANK_ACCOUNT = "us_bank_account",
}

export enum ServiceGroupStatus {
	ACTIVE = "ACTIVE",
	BETA = "BETA",
	NOT_ACTIVE = "NOT_ACTIVE",
}

export enum CommunitySolarAvailabilityTypes {
	NONE = "NONE",
	WAITLIST = "WAITLIST",
	ACTIVE = "ACTIVE",
}

export enum ElectricStatus {
	NULL = "NULL",
	NEW = "NEW",
	PENDING_CREATE = "PENDING_CREATE",
	PENDING_LINK = "PENDING_LINK",
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
}

export enum PropertyType {
	APARTMENT = "APARTMENT",
	HOME = "HOME",
}
