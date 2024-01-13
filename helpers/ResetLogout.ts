import {
	ResidentStore,
	OccupancyStore,
	PropertyStore,
	ElectricAccountStore,
	RegServicesStore,
	RegistrationStore
 } from '@/store';

export function ResetLogout() {
	const { reset: resetResident } = ResidentStore.getState();
	const { reset: resetOccupancy } = OccupancyStore.getState();
	const { reset: resetProperty } = PropertyStore.getState();
	const { reset: resetElectricAccount } = ElectricAccountStore.getState();
	const { reset: resetRegServices, resetPartnerCode } = RegServicesStore.getState();

	resetResident();
	resetOccupancy();
	resetProperty();
	resetElectricAccount();
	resetRegServices();
	resetPartnerCode();
}

export function useResetOnboarding() {
	const { reset: resetRegistration } = RegistrationStore.getState();
	const { reset: resetRegServices } = RegServicesStore.getState();

	resetRegistration();
	resetRegServices();
}
