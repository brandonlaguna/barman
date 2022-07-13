const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults"
              }],
              '@babel/preset-react'
            ]
          }
        }]
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name:'assets/[name].[ext]'
              }
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: true,
                },
                optipng: {
                  optimizationLevel: 7,
                }
              }
            }
          }]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    preferRelative: true,
    enforceExtension: false,
    extensions: ['.js', '.jsx', '.json', '...'],
    mainFiles: ['index'],
    alias: {
      assets$: path.resolve(__dirname, 'path/to/file.js'),
    },
  },
};