module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	'vue/no-unused-vars': "off" ,//作用在vue模板部分，
	'semi': ["error", "always"],
  },
  "globals":{
    "error": true,
    "that": true
    }
}
