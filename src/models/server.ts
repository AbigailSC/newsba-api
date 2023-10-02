import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
// import swaggerUi from 'swagger-ui-express';
// import swaggerJsdoc from 'swagger-jsdoc';
import cookieParser from 'cookie-parser';
import limitter from 'express-rate-limit';
import { config } from '@config';
import { indexRoutes } from '@routes';
import { dbConnection } from 'src/config/db.config';

export class Server {
  app: Express;
  port: string | number;
  rootPath: string;

  constructor() {
    this.app = express();
    this.port = config.app.port;
    this.rootPath = '/api/v1';

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB(): Promise<void> {
    await dbConnection();
  }

  middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(
      limitter({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: {
          status: 429,
          message:
            'Too many requests from this IP, please try again in an hour!'
        }
      })
    );
    this.app.use(morgan('dev'));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(cookieParser());
  }

  routes(): void {
    this.app.use(this.rootPath, indexRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀...Server running on http://127.0.0.1:${this.port}`);
    });
  }
}
