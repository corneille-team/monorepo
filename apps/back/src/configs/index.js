export const configs = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3001/',
  frontUrl: process.env.FRONT_URL || 'http://localhost:3000/',
  authorizedUrls: process.env.AUTHORIZED_URLS || 'http://localhost:3000',
  port: process.env.PORT || 3001,
  environment: process.env.ENVIRONMENT || 'local',
  freeTrialWords: process.env.FREE_TRIAL_WORDS || 5000,
  services: {
    bcrypt: {
      salt_rounds: process.env.SALT_ROUNDS || 10,
    },
    jwt: {
      secret: process.env.JWT_TOKEN_SECRET || 'secret',
      duration: process.env.JWT_TOKEN_DURATION || '15d',
    },
    mongodb: {
      uri:
        process.env.MONGODB_ADDON_URI ||
        'mongodb://root:password@localhost:27017/local-api?authSource=admin',
    },
  },
};

export default configs;
