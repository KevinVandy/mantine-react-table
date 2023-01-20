/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['mantine-react-table'],
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [];
  },
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
  },
});

const { withPlausibleProxy } = require('next-plausible');

module.exports = {
  ...withPlausibleProxy()({ ...nextConfig }),
  ...withMDX({
    pageExtensions: ['js', 'ts', 'tsx', 'jsx', 'md', 'mdx'],
  }),
};
