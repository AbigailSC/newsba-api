import express, { Express } from 'express';
import { config } from '@config';

export class Server {
  app: Express;
  port: string | number;

  constructor() {
    this.app = express();
    this.port = config.app.port;
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`✔️ ...Server running on port ${this.port}`);
    });
  }
}
