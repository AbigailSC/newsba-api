export interface UserType {
  email: string;
  username: string;
  password: string;
  role: string;
  code: string;
  verified: boolean;
  isActive: boolean;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  encryptPassword: (password: string) => Promise<string>;
}
