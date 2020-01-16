module.exports = {
  name: 'webpack-boilerplate', // https://github.com/facebook/jest/issues/7732
  verbose: true,
  // The root of the directory containing your Jest config file
  roots: [
    '<rootDir>'
  ],
  setupFiles: [
    '<rootDir>/jest.setup.js'
  ],
  // The issue with TS being slow may be caused by the order of module extension resolution. By default, Jest searches first for ['js', 'json', 'jsx', 'ts', 'tsx', 'node'] – so TS is supported, but at a performance cost. You can adjust the moduleFileExtensions config, to have ts and tsx at the very beginning, e.g. ['ts', 'tsx', 'js', 'json', 'jsx', 'node'].
  moduleFileExtensions: [
    'ts', 'tsx', 'js', 'json', 'jsx'
  ],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileTransformer.js'
  },
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  globals: {
    // Ettől működik teszteléskor a typechecking!
    'ts-jest': {
      // https://huafu.github.io/ts-jest/user/config/diagnostics
      diagnostics: {
        // https://github.com/Microsoft/TypeScript/blob/master/src/compiler/diagnosticMessages.json
        ignoreCodes: [
          // 2307, // Cannot find module
          2451,  // Cannot redeclare block-scoped variable
        ]
      }
    },
    __DEV__: true,
    __PROD__: false,
    __TEST__: true
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$'
  ],
  snapshotSerializers: [ 'jest-serializer-html' ]
}
