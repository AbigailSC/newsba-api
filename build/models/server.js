"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Server = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _path = _interopRequireDefault(require("path"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _config = require("../config");
var _routes = require("../routes");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Server {
  constructor() {
    this.app = (0, _express.default)();
    this.port = _config.config.app.port;
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
  async connectDB() {
    await (0, _config.dbConnection)();
  }
  middlewares() {
    this.app.use(_express.default.json());
    this.app.use(_express.default.urlencoded({
      extended: false
    }));
    this.app.use((0, _cors.default)());
    this.app.use((0, _expressRateLimit.default)());
    this.app.use((0, _morgan.default)('dev'));
    this.app.use(_express.default.static(_path.default.join(__dirname, 'public')));
    this.app.use((0, _cookieParser.default)());
  }
  routes() {
    this.app.use(`${this.rootPath}${this.authPath}`, _routes.auth);
    this.app.use(`${this.rootPath}${this.userPath}`, _middlewares.validateJWT, _routes.user);
    this.app.use(`${this.rootPath}${this.favoritePath}`, _middlewares.validateJWT, _middlewares.validateVerified, _routes.favorite);
    this.app.use(`${this.rootPath}${this.articlePath}`, _middlewares.validateJWT, _middlewares.validateVerified, _routes.article);
    this.app.use(`${this.rootPath}${this.tagPath}`, _middlewares.validateJWT, _routes.tag);
    this.app.use(`${this.rootPath}${this.categoriesPath}`, _middlewares.validateJWT, _routes.category);
    this.app.use(`${this.rootPath}${this.analysisPath}`, _middlewares.validateJWT, _middlewares.validateVerified, _routes.analysis);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀...Server running on http://127.0.0.1:${this.port}`);
    });
  }
}
exports.Server = Server;