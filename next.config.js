// Не поддавайтесь соблазну использовать здесь import
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  experimental: { esmExternals: true },
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'xieffect.pythonanywhere.com',
      'cdn.discordapp.com',
      'localhost:3000',
      'localhost:5000',
      'xieffect.ru:5000',
      'xieffect.ru',
      'www.youtube.com',
    ],
  },
  pwa: {
    dest: 'public',
    register: true,
    runtimeCaching,
    mode: 'production',
    reloadOnOnline: true,
    cacheOnFrontEndNav: true,
    disable: process.env.NODE_ENV === 'development',
    skipWaiting: true,
    sw: '/sw.js',
    buildExcludes: [
      /middleware-manifest\.json$/,
      /_middleware\.js$/,
      /_middleware\.js\.map$/,
      /middleware-runtime\.js$/,
      /server\/pages\/_middleware\.js$/,
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      type: 'asset/resource',
    });
    return config;
  },
});
