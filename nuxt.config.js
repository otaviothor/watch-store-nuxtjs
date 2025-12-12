export default {
  target: 'static',
  ssr: false,
  head: {
    title: 'watch-store-nuxtjs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: ['@/plugins/miragejs', '@/plugins/cart'],
  components: false,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],
  env: {
    USE_API: !!process.env.USE_API,
  },
  axios: {},
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  build: {},
  watchers: {
    webpack: {
      ignored: /(node_modules)|(.git)|(\**.spec.js)/,
    },
  },
};
