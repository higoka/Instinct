import {createConnection, getConnection} from 'typeorm';
import CLIPrompt, {Answers, PromptObject} from 'prompts';
import {databaseService} from '../../../service/database';
import {databaseMigrations} from '@instinct-api/database-migrations';
import {createEnvironmentService} from '../../../service/create-environment';

export async function setupDatabase(): Promise<void> {
  async function configureDatabase(): Promise<void> {
    console.log('Set up database credentials');

    const questions: PromptObject[] = [
      {
        type: 'text',
        name: 'host',
        message: 'What is your database host?',
      },
      {
        type: 'text',
        name: 'username',
        message: 'What is your database username?',
      },
      {
        type: 'password',
        name: 'password',
        message: 'What is your database password?',
      },
      {
        type: 'text',
        name: 'name',
        message: 'What is your database name?',
      },
    ];

    const userProvidedCredentials: Answers<
      'host' | 'username' | 'password' | 'name'
    > = await CLIPrompt(questions);

    const databaseConnectionSuccess = await databaseService.testConnection(
      userProvidedCredentials.host,
      userProvidedCredentials.username,
      userProvidedCredentials.password,
      userProvidedCredentials.name
    );

    const connectionLog = `${userProvidedCredentials.name} using ${userProvidedCredentials.username}@${userProvidedCredentials.host}`;

    if (!databaseConnectionSuccess) {
      console.log(`Failed to connect to ${connectionLog}`);
      throw new Error('Invalid database credentials');
    }

    console.log(`Successfully connected to ${connectionLog}`);

    createEnvironmentService.setKey(
      'databaseHost',
      userProvidedCredentials.host
    );
    createEnvironmentService.setKey(
      'databaseUsername',
      userProvidedCredentials.username
    );
    createEnvironmentService.setKey(
      'databasePassword',
      userProvidedCredentials.password
    );
    createEnvironmentService.setKey(
      'databaseName',
      userProvidedCredentials.name
    );
  }

  async function closeExistingConnection(): Promise<void> {
    try {
      const existingConnection = await getConnection();
      await existingConnection.close();
    } catch {
      // Do nothing
    }
  }

  async function runMigrations(): Promise<void> {
    try {
      await createConnection({
        type: 'mysql',
        host: createEnvironmentService.getKey('databaseHost'),
        username: createEnvironmentService.getKey('databaseUsername'),
        password: createEnvironmentService.getKey('databasePassword'),
        database: createEnvironmentService.getKey('databaseName'),
        synchronize: false,
        migrationsRun: true,
        migrations: databaseMigrations,
      });
    } catch (e) {
      console.log(`setupDatabase (runMigrations) failed due to ${e}`);
      throw e;
    }
  }

  await configureDatabase();
  await closeExistingConnection();
  await runMigrations();
  await createEnvironmentService.write();
}
