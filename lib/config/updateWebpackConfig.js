'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateWebpackConfig;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _context = require('../context');

var _context2 = _interopRequireDefault(_context);

var _getStyleLoadersConfig = require('./getStyleLoadersConfig');

var _getStyleLoadersConfig2 = _interopRequireDefault(_getStyleLoadersConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var bishengLib = _path2.default.join(__dirname, '..');
var bishengLibLoaders = _path2.default.join(bishengLib, 'loaders');

function updateWebpackConfig(webpackConfig, mode) {
  var bishengConfig = _context2.default.bishengConfig;

  var styleLoadersConfig = (0, _getStyleLoadersConfig2.default)(bishengConfig.postcssConfig);

  /* eslint-disable no-param-reassign */
  webpackConfig.entry = {};
  if (_context2.default.isBuild) {
    webpackConfig.output.path = _path2.default.join(process.cwd(), bishengConfig.output);
  }
  webpackConfig.output.publicPath = _context2.default.isBuild ? bishengConfig.root : '/';
  if (mode === 'start') {
    styleLoadersConfig.forEach(function (config) {
      webpackConfig.module.rules.push({
        test: config.test,
        use: ['style-loader'].concat(_toConsumableArray(config.use))
      });
    });
  }
  if (mode === 'build') {
    styleLoadersConfig.forEach(function (config) {
      webpackConfig.module.rules.push({
        test: config.test,
        use: _extractTextWebpackPlugin2.default.extract({
          use: config.use
        })
      });
    });
  }
  webpackConfig.module.rules.push({
    test: function test(filename) {
      return filename === _path2.default.join(bishengLib, 'utils', 'data.js') || filename === _path2.default.join(bishengLib, 'utils', 'ssr-data.js');
    },

    loader: _path2.default.join(bishengLibLoaders, 'bisheng-data-loader')
  });
  /* eslint-enable no-param-reassign */

  var customizedWebpackConfig = bishengConfig.webpackConfig(webpackConfig, _webpack2.default);

  var entryPath = _path2.default.join(bishengLib, '..', 'tmp', 'entry.' + bishengConfig.entryName + '.js');
  if (customizedWebpackConfig.entry[bishengConfig.entryName]) {
    throw new Error('Should not set `webpackConfig.entry.' + bishengConfig.entryName + '`!');
  }
  customizedWebpackConfig.entry[bishengConfig.entryName] = entryPath;
  return customizedWebpackConfig;
}