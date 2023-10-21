import { config } from '@config';
import { sign } from 'jsonwebtoken';

export const generateJWT = async (id = ''): Promise<string> => {
  const payload = {
    id
  };
  return await new Promise((resolve, reject) => {
    sign(
      payload,
      config.auth.jwtSecret,
      { expiresIn: config.auth.jwtExpires },
      (err: Error | null, token: string | undefined) => {
        if (err) {
          console.log(err);
          reject(new Error('Error generating token'));
        } else {
          resolve(token as string);
        }
      }
    );
  });
};
