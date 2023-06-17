module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: ['jest'],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    'import/order': 'off',
    'import/no-named-as-default-member': 'off',
    'unicorn/error-message': 'off',
    'no-unused-vars': 'off',
  },
};
