import fs from "fs";
import devConfig from "@/server/config/config.dev.json";
import prodConfig from "@/server/config/config.prod.json";
const runTimeConfig = typeof useRuntimeConfig !== "undefined" ? useRuntimeConfig() : { public: { ENVIRONMENT: process.env.ENVIRONMENT } };

function getConfigFile() {
	switch (runTimeConfig.public.ENVIRONMENT) {
		case "prod":
			return prodConfig;
		case "staging":
		case "dev":
		default:
			return devConfig;
	}
}

const config = getConfigFile();

export type ServerConfig = typeof config;
export default config;
