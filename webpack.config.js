var webpack           = require('webpack');
var path              = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var production = process.env.NODE_ENV === 'production';

const VENDOR_LIBS = [
  'react', 
  'react-dom', 
  'react-input-range', 
  'react-router', 
  'react-redux', 
  'redux', 
  'redux-thunk',
  'lodash.assignin'
];

var config = {
  devtool: production ? false : 'cheap-eval-source-map',
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'server/public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        options: {
          presets: ['latest', 'react']
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'server/public'),
    port: 9000
  }
}

module.exports = config;
