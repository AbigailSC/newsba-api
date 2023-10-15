import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserType } from '@interfaces';
import { ROLES } from '@constants';

const usersSchema = new Schema<UserType>(
  {
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
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true
    },
    rol: {
      type: String,
      default: ROLES.user
    },
    verified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true
    },
    emailVerifyTokenLink: {
      type: String,
      default: '',
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

usersSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

usersSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

usersSchema.methods.toJSON = function () {
  const { _v, password, _id, emailVerifyTokenLink, ...user } = this.toObject();
  return user;
};

const User: Model<UserType> = model<UserType>('User', usersSchema);

export default User;
