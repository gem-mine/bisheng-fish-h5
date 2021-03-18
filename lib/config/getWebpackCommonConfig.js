'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWebpackCommonConfig;

var _path = require('path');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var _friendlyErrorsWebpackPlugin2 = _interopRequireDefault(_friendlyErrorsWebpackPlugin);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _getBabelCommonConfig = require('./getBabelCommonConfig');

var _getBabelCommonConfig2 = _interopRequireDefault(_getBabelCommonConfig);

var _getTSCommonConfig = require('./getTSCommonConfig');

var _getTSCommonConfig2 = _interopRequireDefault(_getTSCommonConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint quotes:0 */

function getWebpackCommonConfig() {
  var jsFileName = '[name].js';
  var cssFileName = '[name].css';
  var commonName = 'common.js';

  var babelOptions = (0, _getBabelCommonConfig2.default)();
  var tsOptions = (0, _getTSCommonConfig2.default)();

  return {
    output: {
      filename: jsFileName,
      chunkFilename: jsFileName
    },

    resolve: {
      modules: ['node_modules', (0, _path.join)(__dirname, '../../node_modules')],
      extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
    },

    resolveLoader: {
      modules: ['node_modules', (0, _path.join)(__dirname, '../../node_modules')]
    },

    module: {
      noParse: [/moment.js/],
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelOptions
      }, {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: babelOptions
      }, {
        test: /\.tsx?$/,
        use: [{
          loader: 'babel-loader',
          options: babelOptions
        }, {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: tsOptions
          }
        }]
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/vnd.ms-fontobject'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=image/svg+xml'
      }, {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'url-loader?limit=10000'
      }]
    },

    plugins: [new _webpack2.default.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: commonName
    }), new _extractTextWebpackPlugin2.default({
      filename: cssFileName,
      disable: false,
      allChunks: true
    }), new _caseSensitivePathsWebpackPlugin2.default(), new _webpack2.default.ProgressPlugin(function (percentage, msg, addInfo) {
      var stream = process.stderr;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write('\uD83D\uDCE6  ' + _chalk2.default.magenta(msg) + ' (' + _chalk2.default.magenta(addInfo) + ')');
        stream.clearLine(1);
      } else if (percentage === 1) {
        console.log(_chalk2.default.green('\nwebpack: bundle build is now finished.'));
      }
    }), new _friendlyErrorsWebpackPlugin2.default()]
  };
}