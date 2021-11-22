import FS from 'fs';
import {exec} from 'child_process';

export async function buildWeb(): Promise<void> {
  function buildAssets(): Promise<void> {
    return new Promise((resolve, reject) => {
      exec('cd web && yarn build && cd ..', error => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  function moveAssets(): Promise<void> {
    return FS.promises.rename('./web/build', './api/public');
  }

  await buildAssets();
  await moveAssets();
}
