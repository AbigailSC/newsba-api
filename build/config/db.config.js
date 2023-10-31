"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConnection = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = require("./config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const dbConnection = async () => {
  try {
    const dbURL = _config.config.app.env === 'development' ? _config.config.db.devUri : _config.config.db.uri;
    if (!dbURL) {
      throw new Error('MongoDB URL not defined');
    }
    await _mongoose.default.connect(dbURL);
    console.log('✔️ ...Database connected!');
  } catch (error) {
    console.log(error);
    throw new Error('❌ ...Database connection failed!');
  }
};
exports.dbConnection = dbConnection;