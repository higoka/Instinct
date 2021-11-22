import {getConnection} from 'typeorm';

export class UserService {
  async createUser(
    username: string,
    email: string,
    password: string,
    rankID: number
  ): Promise<void> {
    await getConnection().query(
      `INSERT INTO \`users\` (\`username\`, \`password\`, \`mail\`, \`account_created\`, \`ip_register\`, \`ip_current\`, \`rank\`) VALUES ('${username}', '${password}', '${email}', 1, '127.0.0.1', '127.0.0.1', '${rankID}')`
    );
  }

  async existsByUsername(username: string): Promise<boolean> {
    const matchingUsers: Array<{id: number}> = await getConnection().query(
      `SELECT id FROM users WHERE username = '${username}'`
    );
    return matchingUsers.length > 0;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const matchingUsers: Array<{id: number}> = await getConnection().query(
      `SELECT id FROM users WHERE mail = '${email}'`
    );
    return matchingUsers.length > 0;
  }
}
