module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
  },
  'import/prefer-default-export': 'off',
};
