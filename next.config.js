/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    BE_API: process.env.BE_API,
    TOKEN_COOKIE_NAME: process.env.TOKEN_COOKIE_NAME,
  },
};
