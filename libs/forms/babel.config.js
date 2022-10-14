// Config: This file needs to be in babel.config.js format
// https://github.com/nrwl/nx/issues/4611

module.exports = function (api) {
  api.cache(true)

  return {
    presets: ['@nrwl/react/babel'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
  }
}
