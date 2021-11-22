import Bcrypt from 'bcryptjs';
import {getConnection} from 'typeorm';
import {userService} from '../../../service/user';
import CLIPrompt, {Answers, PromptObject} from 'prompts';

export async function createDefaultAdmin(): Promise<void> {
  const promptCreateDefaultAdmin: {value: boolean} = await CLIPrompt({
    type: 'confirm',
    name: 'value',
    message: 'Do you want to create an admin account?',
  });

  if (!promptCreateDefaultAdmin.value) {
    return;
  }

  console.log('Creating default admin');
  const questions: PromptObject[] = [
    {
      type: 'text',
      name: 'username',
      message: 'What is your username?',
    },
    {
      type: 'text',
      name: 'email',
      message: 'What is your email?  (Note: This is public)',
    },
    {
      type: 'password',
      name: 'password',
      message: 'What is your password?',
    },
  ];

  const userProvidedCredentials: Answers<'username' | 'email' | 'password'> =
    await CLIPrompt(questions);

  const [usernameTaken, emailTaken] = await Promise.all([
    userService.existsByUsername(userProvidedCredentials.username),
    userService.existsByEmail(userProvidedCredentials.email),
  ]);

  if (usernameTaken) {
    throw new Error(
      `Username ${userProvidedCredentials.username} is already taken`
    );
  }

  if (emailTaken) {
    throw new Error(`Email ${userProvidedCredentials.email} is already taken`);
  }

  const adminRank: Array<{id: number; rank_name: string}> =
    await getConnection().query(
      'SELECT id, rank_name FROM permissions ORDER BY level DESC LIMIT 1'
    );

  if (adminRank.length === 0) {
    throw new Error('Failed to create default admin.  No admin rank exists');
  }

  const hashedPassword = Bcrypt.hashSync(userProvidedCredentials.password);

  await userService.createUser(
    userProvidedCredentials.username,
    userProvidedCredentials.email,
    hashedPassword,
    adminRank[0].id
  );

  console.log(
    `Created user ${userProvidedCredentials.username} with rank ${adminRank[0].rank_name}`
  );
}
