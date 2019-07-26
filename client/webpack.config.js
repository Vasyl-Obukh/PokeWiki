const path               = require('path');
const webpack            = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
const ImageminPlugin     = require('imagemin-webpack-plugin').default;
const ExtractTextPlugin  = require('extract-text-webpack-plugin');

const conf = {
  entry: {
    index: path.join(__dirname, 'src/index.tsx')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(c|sa|sc)ss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: '/static/images/[name].[ext]'
            }
          },
          'img-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/assets/fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader'
      }
    ]
  },
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    overlay: true,
    historyApiFallback: true,
    publicPath: '/',
    disableHostCheck: true,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new CopyWebpackPlugin([
      {
        from: './src/static/images',
        to: './static/images'
      }
    ]),
    new ExtractTextPlugin('./assets/styles/index.css')
  ]
};

module.exports = (env, options) => {
  let production = options.mode === 'production';
  conf.devtool = production ? false : 'eval-sourcemap';
  if (production) {
    conf.plugins.push(
      new ImageminPlugin({
        test: /\.(png|jpe?g|gif|svg)$/i
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    );
  }
  return conf;
};