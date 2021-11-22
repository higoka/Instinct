import {createConnection, getConnection} from 'typeorm';
import {databaseMigrations} from '@instinct-api/database-migrations';

export class DatabaseService {
  async testConnection(
    databaseHost: string,
    databaseUsername: string,
    databasePassword: string,
    databaseName: string
  ): Promise<boolean> {
    try {
      await this.closeOpenConnections();
      await createConnection({
        type: 'mysql',
        host: databaseHost,
        username: databaseUsername,
        password: databasePassword,
        database: databaseName,
        synchronize: false,
      });
      return true;
    } catch (e) {
      console.log(`DatabaseService (testConnection) failed due to ${e}`);
      return false;
    }
  }

  async runMigrations(
    databaseHost: string,
    databaseUsername: string,
    databasePassword: string,
    databaseName: string
  ): Promise<void> {
    try {
      await this.closeOpenConnections();
      await createConnection({
        type: 'mysql',
        host: databaseHost,
        username: databaseUsername,
        password: databasePassword,
        database: databaseName,
        synchronize: false,
        migrationsRun: true,
        migrations: databaseMigrations,
      });
    } catch (e) {
      console.log(`DatabaseService (runMigrations) failed due to ${e}`);
      throw e;
    }
  }

  private async closeOpenConnections() {
    try {
      const existingConnection = await getConnection();
      await existingConnection.close();
    } catch {
      // Do nothing
    }
  }
}
