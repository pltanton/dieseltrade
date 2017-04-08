var HtmlWebpackPlugin = require('html-webpack-plugin');
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

  plugins: [
    new HtmlWebpackPlugin({
      title: 'dieseltrade',
    }),
  ],
}
