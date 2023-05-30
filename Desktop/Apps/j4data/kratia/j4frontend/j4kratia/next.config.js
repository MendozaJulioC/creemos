/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env:{
    KEYSECRET:process.env.KEYSECRET
  },
  
}

module.exports = nextConfig
