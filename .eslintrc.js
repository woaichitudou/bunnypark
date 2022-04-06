module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // 'standard', 'standard-jsx', 'standard-react'
    'standard-with-typescript', 'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    // parser: 'babel-eslint'
    project: './tsconfig.json'
  },
  rules: {
    'no-console': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/promise-function-async': 0,
    '@typescript-eslint/no-unnecessary-type-assertion': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-void': 'off'
  }
}
