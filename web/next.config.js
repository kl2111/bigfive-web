const createNextIntlPlugin = require('next-intl/plugin');
const { withContentlayer } = require('next-contentlayer');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'zh', 'de'], // 这里列出你支持的语言
    defaultLocale: 'zh',         // 设置默认语言
  },
};

module.exports = withContentlayer(withNextIntl(nextConfig));
