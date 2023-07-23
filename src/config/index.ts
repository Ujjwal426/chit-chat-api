import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'test'}.local` });

export const { NODE_ENV, PORT } = process.env;
export const { DB_URL } = process.env;
