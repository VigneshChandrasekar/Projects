/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:[
      "ocdevops.blob.core.windows.net"
    ]
  }
}

module.exports = nextConfig
