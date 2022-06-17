module.exports = {
  mode: 'development',
    module: {
      resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
      },
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: ['@svgr/webpack', 'url-loader'],
          loader: require.resolve("babel-loader"),
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    },
  };
