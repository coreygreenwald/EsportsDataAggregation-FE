module.exports = {
  entry: './browser/index.js',
  output: {
    path: __dirname,
    filename: '../EsportsDataV2/public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
