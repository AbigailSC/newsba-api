export const config = {
  app: {
    env: process.env.NODE_ENV ?? 'development',
    port: process.env.PORT ?? 4000,
    originUrl: process.env.ORIGIN_URL ?? 'http://localhost:4000/newsba'
  },
  db: {
    uri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/newsba'
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? 'SECRET',
    jwtRefresh: process.env.JWT_REFRESH ?? 'REFRESH'
  },
  email: {
    user: process.env.EMAIL_USER ?? 'EMAIL_USER',
    pass: process.env.EMAIL_PASS ?? 'EMAIL_PASS'
  }
};
