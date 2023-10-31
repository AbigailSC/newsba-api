"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;
var _nodemailer = require("nodemailer");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _ = require("./");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const transporter = (0, _nodemailer.createTransport)({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
const sendEmail = async (email, html) => {
  const mailOptions = {
    from: `"NewsBA" <${_.config.email.user}>`,
    to: email,
    subject: 'Confirm your account in NewsBA',
    html
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
exports.sendEmail = sendEmail;