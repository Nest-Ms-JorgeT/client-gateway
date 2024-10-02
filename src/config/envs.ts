import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  APP_PORT: number;
  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;
  ORDERS_MS_HOST: string;
  ORDERS_MS_PORT: number;
}

const envsSchema = joi
  .object({
    APP_PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
    ORDERS_MS_HOST: joi.string().required(),
    ORDERS_MS_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  appPort: envVars.APP_PORT,
  productsMs: {
    host: envVars.PRODUCTS_MS_HOST,
    port: envVars.PRODUCTS_MS_PORT
  },
  ordersMs: {
    host: envVars.ORDERS_MS_HOST,
    port: envVars.ORDERS_MS_PORT
  }
};
