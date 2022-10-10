/* eslint-disable */
export default {
  displayName: 'api',
  preset: '../../jest.preset.js',
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage/apps/api', outputName: `report.xml` }]],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
}
