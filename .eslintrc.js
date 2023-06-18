const path = require('path')
const projectRootDir = path.resolve(__dirname)

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6, // 支持es6
    sourceType: 'module', // 使用 es6 模块化
    // babelOptions: {
    //   plugins: [
    //     '@babel/plugin-proposal-class-properties'
    //   ]
    // }
  },
  env: { // 设置环境
    browser: true, // 支持浏览器环境： 能够使用window上的全局变量
    node: true, // 支持服务器环境:  能够使用node上global的全局变量
    es6: true
  },
  extends: [
    'eslint:recommended', // 使用 eslint 推荐的默认规则 https://cn.eslint.org/docs/rules/
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  settings: {
    'import/resolver': {
      alias: {
        // map: [['@', './src']],
        map: [['@', path.resolve(projectRootDir, './src')]],
        extensions: ['.js', '.jsx']
      }
    }
  },
  globals: { // 声明使用的全局变量, 这样即使没有定义也不会报错了
    // "$": "readonly" // $ 只读变量
  },
  plugins: [
    // '@babel/plugin-proposal-class-properties'
    // '@babel'
  ],
  rules: { // eslint检查的规则  0 忽略 1 警告 2 错误
    // eqeqeq: 1, // 用 == 而不用 === 就警告
    'no-alert': 2, // 不能使用 alert
    'no-console': 0, // 不检查 console
    // 'no-console': process.env.NODE_ENV !== 'production' ? 0 : 2,
    'no-useless-escape': 0,
    'no-empty': 0,
    semi: [2, 'never'],
    quotes: [1, 'single', 'avoid-escape'], // 强制优先使用单引号
    'no-extra-semi': 2,
    'no-debugger': 0,
    indent: [1, 2, { SwitchCase: 1 }],
    'space-before-blocks': [1, { functions: 'always', keywords: 'always', classes: 'always' }],
    'space-before-function-paren': [1, {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always'
    }],
    'key-spacing': [1, { beforeColon: false, afterColon: true }],
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-trailing-spaces': [2, { skipBlankLines: true }],
    'keyword-spacing': [2, {
      overrides: {
        if: { before: true, after: true },
        for: { before: true, after: true },
        while: { before: true, after: true },
        // static: { before: true, after: true },
        as: { before: true, after: true },
      }
    }],
    'space-infix-ops': 1,
    'eol-last': [1, 'always'],
    'no-multiple-empty-lines': [1, { max: 1, maxBOF: 1, maxEOF: 1 }],
    'object-curly-spacing': [1, 'always', { arraysInObjects: true, objectsInObjects: true }],
    'quote-props': [1, 'as-needed', { keywords: false }],
    // 'array-bracket-spacing': [1, 'never', { singleValue: false, objectsInArrays: false, arraysInArrays: false }],
    'array-bracket-spacing': [1, 'never', { singleValue: false }],
    'comma-spacing': [1, { before: false, after: true }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'new-cap': [2, { newIsCap: true, capIsNew: false }],
    'no-class-assign': 2,
    'no-dupe-class-members': 2,
    'no-var': 2,
    'no-whitespace-before-property': 2,
    'nonblock-statement-body-position': 2,
    'prefer-const': 2,
    'rest-spread-spacing': 2,
    'array-callback-return': 2,
    'accessor-pairs': 2,
  }
}
