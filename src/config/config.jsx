import development from "./confDev";
import production from "./productionConf";
import example from "./exConf";
const env = process.env.APP_ENV || 'example';

const config = {
  example,
  development,
  production
};

export default config[env];