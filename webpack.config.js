const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    './src/app.jsx',
  ],
  output: {
    publicPath: './'
  },
  module: {
    rules: [{
      test: /\.m?jsx$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    },
    {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ]
};
