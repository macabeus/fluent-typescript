module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.ftl$/,
        use: 'raw-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
})
