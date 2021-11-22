import {Injectable} from '@nestjs/common';

@Injectable()
export class ConnectionService {
  private connections = [];

  getConnections() {
    return this.connections;
  }

  async onConnectionReceived() {}

  async onConnectionEnded() {}
}
