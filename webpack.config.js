const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extract = new ExtractTextPlugin('css/[name]_[hash].css')
const autoprefixer = require('autoprefixer')({ browsers: ['iOS >= 7', 'Android >= 4.1'] })
const IS_ENV = process.env.NODE_ENV == 'production'
const plugins = []
if (IS_ENV) {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }))
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: true
  }))
}

module.exports = {
  target: 'web',
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: 'js/[name]_[hash].js',
    path: path.resolve(__dirname, `dist`)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                css: ExtractTextPlugin.extract({
                  use: ['css-loader'],
                  fallback: 'vue-style-loader'
                }),
                less: ExtractTextPlugin.extract({
                  use: ['css-loader', 'less-loader'],
                  fallback: 'vue-style-loader'
                })
              },
              postcss: [autoprefixer]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: extract.extract([
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer]
            }
          }
        ])
      },
      {
        test: /\.less$/,
        use: extract.extract([
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer]
            }
          },
          'less-loader'
        ])
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|)(\?|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name]_[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2000,
              name: 'images/[name]_[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
    }),
    extract
  ].concat(plugins),
  resolve: {
    alias: {

    },
    extensions: ['.js', '.vue', '.json']
  },
  devtool: IS_ENV ? false : '#cheap-module-eval-source-map'
}