const HtmlWebPackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/script/index.jsx'
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(process.cwd(), 'build')
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: true,
    https: false
  },
  resolve: {
    alias: {
      StyleSheets: path.resolve(process.cwd(), 'src/scss/'),
      Components: path.resolve(process.cwd(), 'src/script/components/'),
      Scripts: path.resolve(process.cwd(), 'src/script/'),
      Pages: path.resolve(process.cwd(), 'src/script/pages/'),
      Data: path.resolve(process.cwd(), 'public/data/'),
      images: path.resolve(process.cwd(), 'public/images/')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnError: true,
          failOnWarning: false
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'public/images',
        to: 'images'
      }
    ]),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false, // disable default 'commons' chunk behavior
        vendors: false,
        // vendor chunk
        vendor: {
          // name of the chunk
          name: module => {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
          // async + async chunks
          chunks: 'all',
          // import file path containing node_modules
          test: /[\\/]node_modules[\\/]/,
          // priority
          priority: 20
        },
        // common chunk
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }
};
