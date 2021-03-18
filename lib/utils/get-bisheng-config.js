'use strict';

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _resolve = require('resolve');

var resolve = _interopRequireWildcard(_resolve);

var _rucksackCss = require('rucksack-css');

var _rucksackCss2 = _interopRequireDefault(_rucksackCss);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var markdownTransformer = path.join(__dirname, '..', 'transformers', 'markdown');

var defaultConfig = {
  port: 8000,
  source: './posts',
  output: './_site',
  theme: './_theme',
  htmlTemplate: path.join(__dirname, '../template.html'),
  transformers: [],
  devServerConfig: {},
  postcssConfig: {
    plugins: [(0, _rucksackCss2.default)(), (0, _autoprefixer2.default)({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
    })]
  },
  webpackConfig: function webpackConfig(config) {
    return config;
  },


  entryName: 'index',
  root: '/',
  filePathMapper: function filePathMapper(filePath) {
    return filePath;
  }
};

module.exports = function getBishengConfig(configFile) {
  var customizedConfig = fs.existsSync(configFile) ? require(configFile) : {};
  var config = Object.assign({}, defaultConfig, customizedConfig);
  config.theme = resolve.sync(config.theme, { basedir: process.cwd() });
  config.transformers = config.transformers.concat({
    test: /\.md$/,
    use: markdownTransformer
  }).map(function (_ref) {
    var test = _ref.test,
        use = _ref.use;
    return {
      test: test.toString(), // Hack, for we cannot send RegExp to child process
      use: use
    };
  });
  return config;
};