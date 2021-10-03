/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API: process.env.API,
    TOKEN_COOKIE_NAME: process.env.TOKEN_COOKIE_NAME,
  },
};
