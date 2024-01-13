import { RegistrationStore } from "@/store";
import { ResidentStore } from "@/store";
import { OccupancyStore } from "@/store";
import { PropertyStore } from "@/store";
import { ElectricAccountStore } from "@/store";
import { RegServicesStore } from "@/store";
export default () => {
	const { reset: resetResident } = ResidentStore.getState();
	const { reset: resetOccupancy } = OccupancyStore.getState();
	const { reset: resetProperty } = PropertyStore.getState();
	const { reset: resetElectricAccount } = ElectricAccountStore.getState();
	const { reset: resetRegServices, resetPartnerCode } = RegServicesStore.getState();
	const { reset: resetRegistration } = RegistrationStore.getState();
	// const { reset: resetRegServices } = RegServicesStore();
	const useResetLogout = () => {
		resetResident();
		resetOccupancy();
		resetProperty();
		resetElectricAccount();
		resetRegServices();
		resetPartnerCode();
	}
	
	const useResetOnboarding = () => {
		resetRegistration();
		resetRegServices();
	}
	return {
		useResetLogout,
		useResetOnboarding
	}
}