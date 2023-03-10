const withImages = require('next-images');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');

const path = require('path');

const { i18n } = require('./next-i18next.config');

module.exports = withCustomBabelConfigFile(
  withImages({
    babelConfigFile: path.resolve('./babel.config.js'),
    cssModules: true,
    env: {
      url: process.env.URL || 'http://localhost:3000',
      apiUrl: process.env.API_URL || 'http://localhost:3001/api',
      crispWebsiteId: process.env.CRISP_WEBSITE_ID || 'a469e44d-ad86-48ac-b50f-6f112bd30d81',
    },
    experimental: {
      externalDir: true,
    },
    async headers() {
      return [];
    },
    webpack(config) {
      config.module.rules.push = (...items) => {
        Array.prototype.push.call(
          config.module.rules,
          ...items.filter((item) => item.test.toString() !== '/\\.svg$/'),
        );
      };
      return config;
    },
    i18n,
  }),
);
