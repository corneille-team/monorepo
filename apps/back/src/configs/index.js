export const configs = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3001/',
  frontUrl: process.env.FRONT_URL || 'http://localhost:3000/',
  authorizedUrls: process.env.AUTHORIZED_URLS || 'http://localhost:3000',
  port: process.env.PORT || 3001,
  environment: process.env.ENVIRONMENT || 'local',
  freeTrialWords: process.env.FREE_TRIAL_WORDS || 5000,
  services: {
    stripe: {
      secretKey:
        process.env.STRIPE_SECRET_KEY ||
        'sk_test_51KrhBnK7B0lK4WDZJIQJ2OToG1hgQP0tN1Wz9gGGqsjm3NDUyQvdA8T7qgpoQPA8TpqtXIgxFUk6bA5znh2T1c3900mYlMq8kq',
    },
    bcrypt: {
      salt_rounds: process.env.SALT_ROUNDS || 10,
    },
    jwt: {
      secret: process.env.JWT_TOKEN_SECRET || 'secret',
      duration: process.env.JWT_TOKEN_DURATION || '15d',
    },
    express: {
      session_secret: process.env.EXPRESS_SESSION_SECRET || 'expresssessionsecret',
    },
    mongodb: {
      uri:
        process.env.MONGODB_ADDON_URI ||
        'mongodb://root:password@localhost:27017/local-api?authSource=admin',
    },
    s3: {
      host: process.env.CELLAR_ADDON_HOST || 'http://0.0.0.0:4568',
      keyId: process.env.CELLAR_ADDON_KEY_ID || 'S3RVER',
      keySecret: process.env.CELLAR_ADDON_KEY_SECRET || 'S3RVER',
      bucketName: process.env.CELLAR_ADDON_BUCKET_NAME || 'TEST_BUCKET',
    },
  },
};

export default configs;
