module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: ['@svgr/webpack', 'url-loader'],
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    },
  };