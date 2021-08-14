module.exports = {
  env: {
    es2021: true,
    node: true,
    mocha: true,
  },
  plugins: ['mocha'],
  extends: ['airbnb-base', 'plugin:mocha/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'object-curly-newline': 'off',
  },
};
