// const { withPlausibleProxy } = require("next-plausible")
const withPWA = require('next-pwa')
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  experimental: { esmExternals: false },
  reactStrictMode: false,
  images: {
    domains: ["xieffect.pythonanywhere.com", "cdn.discordapp.com", "localhost:3000", "localhost:5000", "xieffect.ru:5000", "xieffect.ru",  "www.youtube.com"],
  },
  pwa: {
    dest: 'public',
    register: true,
		skipWaiting: true,
		runtimeCaching,
		buildExcludes: [/middleware-manifest.json$/]
  }
})
