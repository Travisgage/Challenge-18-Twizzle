import globals from 'globals';


export default [
  {files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'}},
  {languageOptions: { globals: globals.browser }},
  {
    rules: {
      'no-unused-vars': 'error',
      'no-extra-semi': 'error',
      'no-irregular-whitespace': 'error',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
  
    }
  }
];