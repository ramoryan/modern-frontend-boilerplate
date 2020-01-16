const path = require('path')

module.exports = {
  // "off"   or 0 - turn the rule off
  // "warn"  or 1 - turn the rule on as a warning (doesn’t affect exit code)
  // "error" or 2 - turn the rule on as an error (exit code will be 1)

  parser: '@typescript-eslint/parser',

  parserOptions: {
    // AssertionError: ImportDeclaration should appear when the mode is ES6 and in the module context.
    // https://github.com/eslint/typescript-eslint-parser/issues/117
    sourceType: 'module',

    ecmaFeatures: {
      jsx: true,
      modules: true
    },

    useJSXTextNode: true,
    project: path.resolve(__dirname, 'tsconfig.json'),
    tsconfigRootDir: __dirname
  },

  // Ez a sorrend kell így, hogy a ts típusok használatát is észrevegye
  extends: [
    'eslint:recommended',
    'plugin:wc/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],

  plugins: [
    '@typescript-eslint',
    'import',
    'react',
    'wc'
  ],

  settings: {
    react: {
      pragma: 'dom',
      version: 'latest'
    }
  },

  env: {
    es6: true
  },

  globals: {
    // tudjuk, mit csinálunk :)
    window: true,
    document: true,
    setTimeout: true,
    console: true,

    // webpack
    __DEV__: true,
    __TEST__: true,
    require: true,

    // Sajátok
    Fragment: true,
    log: true,
    utils: true,

    // Natív
    HTMLElement: true,
    HTMLUnknownElement: true,
    customElements: true
  },

  rules: {
    'template-curly-spacing': [ 1, 'always' ],
    'no-multi-spaces': 0, // jó volna, csak nehéz belőni az exceptions-t
    'indent': 0, // szabadság! ez nem a behúzási indent!
    'key-spacing': 0, // szabadság!
    'comma-dangle': 0, // mindegy
    'brace-style': [ 1, 'stroustrup', { allowSingleLine: false }],
    'no-unused-vars': [ 1, { vars: 'all', args: 'none' }],
    'class-methods-use-this': 0, // sok függvényünk van, ahol nem kell a this
    'no-floating-decimal': 0,
    'no-var': 1,
    'array-bracket-spacing': [ 1, 'always' ],
    'lines-between-class-members': [ 1, 'always', { exceptAfterSingleLine: true } ],
    'no-empty': 1, // van hogy skeletont csinálok, akkor ne legyen error

    'react/jsx-key': 0,
    'react/jsx-curly-spacing': [ 1, 'always' ],
    'react/react-in-jsx-scope': 0, // mert a wp PluginProvide megoldja
    'react/jsx-no-undef': [ 1, { allowGlobals: true } ],
    'react/jsx-tag-spacing': [ 1, { closingSlash: 'never' } ],
    'react/jsx-one-expression-per-line': 0, // TODO
    'react/destructuring-assignment' : 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': [ 1, { extensions: [ '.jsx', '.tsx' ] } ],

    // Web Components
    // https://github.com/43081j/eslint-plugin-wc
    'wc/no-constructor-attributes': 2,
    'wc/no-invalid-element-name': 2,
    'wc/no-self-class': 0,
    'wc/attach-shadow-constructor': 0,
    'wc/guard-super-call': 2,
    'wc/no-closed-shadow-root': 0,
    'wc/no-typos': 2,

    // Import
    // https://github.com/benmosher/eslint-plugin-import
    'import/no-duplicates': 0, // SLOW

    // Typescript
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    //
    // SLOW RULES
    '@typescript-eslint/indent': [ 1, 2, {
      MemberExpression: 'off',
      SwitchCase: 1,
      ignoredNodes: [
        'ConditionalExpression'
      ]
    } ],
    // --- Innentől jók
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-function-return-type': [ 1, { allowExpressions: true } ],
    '@typescript-eslint/explicit-member-accessibility': [ 1, { accessibility: 'explicit' } ],
    '@typescript-eslint/member-delimiter-style': 0, // TODO
    '@typescript-eslint/interface-name-prefix': [ 1, 'always' ],
    '@typescript-eslint/no-explicit-any': 0, // TODO
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/camelcase': 1,
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/no-use-before-define': 1,
    '@typescript-eslint/type-annotation-spacing': [ 1, {
      before: false,
      after: true,
      overrides: {
        arrow: {
          before: true, after: true
        }
      }
    } ],
    '@typescript-eslint/prefer-string-starts-ends-with': 1,
    '@typescript-eslint/prefer-includes': 1,
    '@typescript-eslint/no-magic-numbers': 0, // majd egyszer talán
    /*
    '@typescript-eslint/no-magic-numbers': [ 1, {
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
      detectObjects: true,
      ignoreEnums: true
    } ],
    */
    '@typescript-eslint/member-ordering': 1,
    '@typescript-eslint/no-inferrable-types': 1,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/brace-style': [ 1, 'stroustrup', { allowSingleLine: false }],
  }
}
