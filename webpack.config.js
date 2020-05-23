const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals')


module.exports = {
  mode: 'none',
  context: __dirname,
  entry: slsw.lib.entries,
  resolve: {
    extensions: ['.js', '.ts']
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ]
      },
    ],
  }
};