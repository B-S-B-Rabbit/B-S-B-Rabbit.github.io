const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: [path.resolve(__dirname, 'scripts', 'calculator', 'app.js')],
    using: [path.resolve(__dirname, 'scripts', 'using', 'app.js')],
    about: [path.resolve(__dirname, 'scripts', 'about', 'app.js')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'templates', 'index.html'),
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'templates', 'using.html'),
      filename: 'using.html',
      chunks: ['using'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'templates', 'about.html'),
      filename: 'about.html',
      chunks: ['about'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
