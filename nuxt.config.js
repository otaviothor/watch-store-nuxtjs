export default {
  mode: process.env.NODE_ENV === 'development' ? 'spa' : 'universal',
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
  axios: {
    baseURL: '/',
  },
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
