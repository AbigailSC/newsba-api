"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const usersSchema = new _mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true
  },
  image: {
    type: String,
    required: false,
    default: _constants.IMAGEPROFILEDEFAULT
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true
  },
  role: {
    type: String,
    required: false,
    default: _constants.ROLES.USER
  },
  code: {
    type: String,
    required: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});
usersSchema.methods.encryptPassword = async password => {
  const salt = await _bcrypt.default.genSalt(10);
  return await _bcrypt.default.hash(password, salt);
};
usersSchema.methods.comparePassword = async function (candidatePassword) {
  return await _bcrypt.default.compare(candidatePassword, this.password);
};
usersSchema.methods.toJSON = function () {
  const {
    _v,
    password,
    _id,
    code,
    isActive,
    createdAt,
    updatedAt,
    ...user
  } = this.toObject();
  return user;
};
const User = (0, _mongoose.model)('User', usersSchema);
var _default = User;
exports.default = _default;