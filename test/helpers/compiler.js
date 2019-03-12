/* eslint-disable
  import/order,
  multiline-ternary,
  no-param-reassign,
*/
const del = require('del');
const path = require('path');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');

const moduleConfig = (config) => {
  return {
    rules: config.rules || config.loader
      ? [
        {
          test: config.loader.test || /\.txt$/,
          use: {
            loader: path.resolve(__dirname, '../../lib'),
            options: config.loader.options || {},
          },
        },
      ]
      : [],
  };
};

const output = (config) => {
  return {
    path: path.resolve(
      __dirname,
      `../outputs/${config.output ? config.output : ''}`,
    ),
    filename: '[name].bundle.js',
  };
};

module.exports = (fixture, config, options) => {
  // webpack Config
  config = {
    optimization: {
      splitChunks: {
        name: 'runtime',
        minChunks: Infinity,
      },
    },
    devtool: config.devtool || 'sourcemap',
    context: path.resolve(__dirname, '..', 'fixtures'),
    entry: `./${fixture}`,
    output: output(config),
    module: moduleConfig(config),
    plugins: config.plugins || [],
  };
  // Compiler Options
  options = Object.assign({ output: false }, options);

  if (options.output) del.sync(config.output.path);

  const compiler = webpack(config);

  if (!options.output) compiler.outputFileSystem = new MemoryFS();

  return new Promise((resolve, reject) => compiler.run((err, stats) => {
    if (err) reject(err);

    resolve(stats);
  }));
};
