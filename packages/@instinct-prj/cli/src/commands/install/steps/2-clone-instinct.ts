import {exec} from 'child_process';
// @ts-ignore - There is no @types
import download from 'download-git-repo';

export async function cloneInstinct(): Promise<void> {
  const REPO_URL = 'https://github.com/chrismpettyjohn/Instinct-App.git';

  function cloneRepo(): Promise<void> {
    return new Promise((resolve, reject) => {
      download(
        `direct:${REPO_URL}`,
        'instinct',
        {clone: true},
        (err?: Error) => {
          if (err) return reject(err);
          return resolve();
        }
      );
    });
  }

  function useClonedRepo(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        process.chdir('./instinct');
        return resolve();
      } catch (e) {
        return reject(e);
      }
    });
  }

  async function installInstinctDependencies(): Promise<void> {
    try {
      await exec('yarn');
    } catch (e) {
      console.log(
        `cloneInstinct (installInstinctDependencies) Failed to install due to ${e}\nHave you installed yarn? npm i yarn --global`
      );
      throw e;
    }
  }

  await cloneRepo();
  await useClonedRepo();
  await installInstinctDependencies();
}
