import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  rootDir: './src',
  testRegex: '.*\\.test\\.ts$',
};

export default config;
