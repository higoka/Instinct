import {startAPI} from './steps/6-start-api';
import {buildWeb} from './steps/4-build-web';
import {cloneInstinct} from './steps/2-clone-instinct';
import {setupDatabase} from './steps/3-setup-database';
import {createDefaultAdmin} from './steps/5-create-default-admin';
import {isInstinctInstalled} from './steps/1-is-instinct-installed';

export async function installInstinct(): Promise<void> {
  await isInstinctInstalled();
  await cloneInstinct();
  await setupDatabase();
  await createDefaultAdmin();
  await buildWeb();
  await startAPI();
}
