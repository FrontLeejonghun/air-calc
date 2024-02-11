const withPlugins = require('next-compose-plugins');
const CompressionPlugin = require('compression-webpack-plugin');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: {
      exclude:
        process.env.NODE_ENV === 'production'
          ? ['error', 'info', 'warn']
          : ['log', 'error', 'info', 'warn', 'table'],
    },
  },
  webpack(config) {
    config.plugins.push(
      new CompressionPlugin({
        algorithm: 'gzip',
      }),
    );
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: ['@svgr/webpack'],
      },
      {
        test: /\.node/,
        use: 'raw-loader',
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = withPlugins(
  [
    withBundleAnalyzer({
      compress: true,
    }),
  ],
  nextConfig,
);
