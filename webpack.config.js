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
        include: /client/,
        loaders: ["babel-loader"],
      },
    ],
  },

  plugins: [HtmlWebpackPluginConfig],
}
