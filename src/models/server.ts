import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import limitter from 'express-rate-limit';
import { config, dbConnection } from '@config';
import {
  analysis,
  article,
  auth,
  category,
  favorite,
  tag,
  user
} from '@routes';
import { validateJWT, validateVerified } from '@middlewares';
export class Server {
  app: Express;
  port: string | number;
  rootPath: string;
  authPath: string;
  userPath: string;
  favoritePath: string;
  articlePath: string;
  tagPath: string;
  categoriesPath: string;
  analysisPath: string;

  constructor() {
    this.app = express();
    this.port = config.app.port;
    this.rootPath = '/api/v1/';
    this.authPath = 'auth';
    this.userPath = 'users';
    this.favoritePath = 'favorites';
    this.articlePath = 'articles';
    this.tagPath = 'tags';
    this.categoriesPath = 'categories';
    this.analysisPath = 'analysis';

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
    this.app.use(limitter());
    this.app.use(morgan('dev'));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(cookieParser());
  }

  routes(): void {
    this.app.use(`${this.rootPath}${this.authPath}`, auth);
    this.app.use(`${this.rootPath}${this.userPath}`, validateJWT, user);
    this.app.use(
      `${this.rootPath}${this.favoritePath}`,
      validateJWT,
      validateVerified,
      favorite
    );
    this.app.use(
      `${this.rootPath}${this.articlePath}`,
      validateJWT,
      validateVerified,
      article
    );
    this.app.use(`${this.rootPath}${this.tagPath}`, validateJWT, tag);
    this.app.use(
      `${this.rootPath}${this.categoriesPath}`,
      validateJWT,
      category
    );
    this.app.use(
      `${this.rootPath}${this.analysisPath}`,
      validateJWT,
      validateVerified,
      analysis
    );
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀...Server running on http://127.0.0.1:${this.port}`);
    });
  }
}
