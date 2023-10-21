import { sendEmail } from '@config';
import { UserType } from '@interfaces';
import { User } from '@models';
import { verifyAccountTemplate } from '@utils';

export const emailExists = async (email: string): Promise<void> => {
  const exists: UserType | null = await User.findOne({ email });
  if (exists && exists.verified) {
    throw new Error(`Email ${email} already exists`);
  }
  if (exists && !exists.verified) {
    const html = verifyAccountTemplate(exists.code);
    await sendEmail(email, html);
    throw new Error(
      `Email ${email} already exists, but it's not verified. A new verification code has been sent to your email.`
    );
  }
};
