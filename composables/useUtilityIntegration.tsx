import devConfig from "@/utils/utilityIntegrationConfig/config.dev.json";
import prodConfig from "@/utils/utilityIntegrationConfig/config.prod.json";

import { RegServicesStore } from "@/store";

export default function () {
	const { serviceGroup } = RegServicesStore();

	const oAuthConfig = (key = serviceGroup.electricCompanyID.id) => {
		if (key !== "") {
			switch (process.env.ENVIRONMENT) {
				case "prod":
					return prodConfig[key] ?? {};
				case "staging":
				case "dev":
				default:
					return devConfig[key] ?? {};
			}
		} else {
			return {};
		}
	};

	return {
		oAuthConfig,
	};
}
