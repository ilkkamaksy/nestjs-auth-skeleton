export const POSTGRES_HOST = process.env.POSTGRES_HOST || '';
export const POSTGRES_PORT =
  (process.env.POSTGRES_PORT as unknown as number) || 5432;
export const POSTGRES_USER = process.env.POSTGRES_USER || '';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
export const POSTGRES_DB = process.env.POSTGRES_DB || '';

export const USER_REPOSITORY = 'USER_REPOSITORY';
export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const JWTCONSTANTS = {
  secret: process.env.JWT_SECRET || 'secret',
};
