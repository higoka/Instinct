export interface EnvironmentContent {
  databaseHost: string;
  databaseUsername: string;
  databasePassword: string;
  databaseName: string;
  jwtSecret: string;
  jwtHash: string;
  jwtExpiresIn: number;
  passwordHash: string;
}
