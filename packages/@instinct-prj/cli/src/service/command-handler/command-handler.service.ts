import {Command} from './command-handler.types';
import {installInstinct} from '../../commands/install';

export class CommandHandlerService {
  private readonly commands: Command[] = [
    {
      name: 'Install',
      command: 'install',
      execute: () => installInstinct(),
    },
  ];

  runCommand() {
    const availableCommands = this.commands;
    const providedCommand = availableCommands.find(_ =>
      process.argv.includes(_.command)
    );
    providedCommand?.execute();
  }
}
