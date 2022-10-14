// file generated when running npm init @eslint/config
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'max-len': 'off',
    'import/order': 'off',
  },
  ignorePatterns: ['**/views', 'node_modules', '**/src', 'tests'],
};
