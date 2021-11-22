import FS from 'fs';
import CLIPrompt from 'prompts';
import {createEnvironmentContent} from './environment.base';
import {EnvironmentContent} from './create-environment.types';

export class CreateEnvironmentService {
  private environmentValues: EnvironmentContent = {
    databaseHost: '',
    databaseUsername: '',
    databasePassword: '',
    databaseName: '',
    jwtSecret: '',
    jwtHash: '',
    jwtExpiresIn: 86400000,
    passwordHash: '',
  };

  setKey<Key extends keyof EnvironmentContent>(
    key: Key,
    value: EnvironmentContent[Key]
  ) {
    this.environmentValues[key] = value;
  }

  getKey<Key extends keyof EnvironmentContent>(
    key: Key
  ): EnvironmentContent[Key] {
    return this.environmentValues[key];
  }

  async write() {
    const environmentContent = createEnvironmentContent(this.environmentValues);
    await FS.promises.writeFile('./.env', environmentContent);
  }

  async checkExisting() {
    if (FS.existsSync('./.env')) {
      const confirmDeleteExistingEnvironment: {remove: boolean} =
        await CLIPrompt({
          type: 'confirm',
          name: 'remove',
          message: 'Do you want to remove the existing environment?',
        });

      if (confirmDeleteExistingEnvironment) {
        await FS.promises.unlink('./.env');
        return;
      }

      throw new Error('Environment already exists');
    }
  }
}
