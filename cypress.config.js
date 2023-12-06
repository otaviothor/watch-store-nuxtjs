const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'vrib23',

  e2e: {
    supportFile: './cypress/support/index.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'nuxt',
      bundler: 'webpack',
    },
  },
});
