module.exports = {
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'plugin:react/jsx-runtime',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    '@emotion',
  ],
  rules: {
    '@emotion/jsx-import': 'error',
    '@emotion/styled-import': 'error',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: [
          '.tsx',
        ],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/self-closing-comp': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/require-default-props': 'off',
    'react/button-has-type': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'no-console': [
      'warn',
      {
        allow: [
          'warn',
          'error',
        ],
      },
    ],
  },
};
