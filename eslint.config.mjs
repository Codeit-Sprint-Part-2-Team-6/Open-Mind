import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },

  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  prettier,

  {
    plugins: {
      prettier: pluginPrettier,
    },
  },

  {
    rules: {
      'prettier/prettier': 'error',

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      'no-unused-vars': 'off',
    },
  },
];
