const { withPlausibleProxy } = require('next-plausible')

module.exports = withPlausibleProxy()({
  experimental: { esmExternals: false },
  reactStrictMode: false,
  images: {
    domains: ['xieffect.pythonanywhere.com', 'cdn.discordapp.com', 'localhost:3000', 'localhost', "www.youtube.com"],
  },
})
