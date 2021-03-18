'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = babel;

var _os = require('os');

function babel() {
  return {
    cacheDirectory: (0, _os.tmpdir)(),
    presets: ['react', [require.resolve('babel-preset-env'), {
      targets: {
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
      }
    }]],
    plugins: [require.resolve('babel-plugin-add-module-exports'), require.resolve('babel-plugin-transform-class-properties'), require.resolve('babel-plugin-transform-decorators-legacy'), require.resolve('babel-plugin-transform-object-rest-spread')]
  };
}