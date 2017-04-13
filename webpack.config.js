var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  context: __dirname + "/client",
  entry: "./index.js",

  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline'
            }
          }
        ]
      },
    ],
  },

  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
}
