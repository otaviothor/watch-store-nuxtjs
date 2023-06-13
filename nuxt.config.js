export default {
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
  plugins: ['@/plugins/miragejs'],
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
};
