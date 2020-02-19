module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off'
  },
  plugins: ['prettier', 'jsdoc'],
};
