export interface UserType {
  email: string;
  password: string;
  rol: string;
  verified: boolean;
  isActive: boolean;
  emailVerifyTokenLink: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  encryptPassword: (password: string) => Promise<string>;
}
