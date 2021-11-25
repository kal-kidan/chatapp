module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "consistent-return": "off",
    "no-underscore-dangle": "off",
    "func-names": "off",
    "max-len": "off",
  },
  ignorePatterns: ["views", "node_modules"],
};
