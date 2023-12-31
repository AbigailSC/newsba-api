"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const config = {
  app: {
    env: process.env.NODE_ENV ?? 'development',
    port: process.env.PORT ?? 4000,
    originUrl: process.env.ORIGIN_URL ?? 'http://localhost:4000/newsba'
  },
  db: {
    uri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/newsba',
    devUri: process.env.MONGODB_DEV_URI ?? 'mongodb://127.0.0.1:27017/newsba'
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? 'SECRET',
    jwtRefresh: process.env.JWT_REFRESH ?? 'REFRESH',
    jwtExpires: process.env.JWT_EXPIRES ?? '1h',
    adminKey: process.env.ADMIN_KEY ?? 'ADMIN_KEY',
    writter: process.env.WRITTER_KEY ?? 'WRITTER_KEY'
  },
  email: {
    user: process.env.EMAIL_USER ?? 'EMAIL_USER',
    pass: process.env.EMAIL_PASS ?? 'EMAIL_PASS'
  }
};
exports.config = config;