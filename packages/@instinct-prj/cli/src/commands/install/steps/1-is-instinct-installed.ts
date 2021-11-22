import CLIPrompt from 'prompts';

export async function isInstinctInstalled(): Promise<void> {
  async function promptUserForPriorInstallation(): Promise<void> {
    const {priorInstall}: {priorInstall: boolean} = await CLIPrompt({
      type: 'confirm',
      name: 'priorInstall',
      message: 'Is there an existing copy of Instinct?',
    });

    if (priorInstall) {
      console.log('Please delete your installation and try again');
      throw new Error('Previous installation exists');
    }
  }

  await promptUserForPriorInstallation();
}
