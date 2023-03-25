module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react', 
    'prettier'
  ],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/no-non-null-assertion": "off"
  }
}
