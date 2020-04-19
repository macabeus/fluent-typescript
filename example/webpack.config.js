const path = require('path')

module.exports = (env, argv) => ({
  module: {
    rules: [
      // 🚨 If you are using raw-loader, you should import that before of fluent-typescript-loader
      {
        test: /\.ftl$/,
        use: 'raw-loader',
      },
      {
        test: /\.ftl$/,
        use: {
          loader: path.resolve(__dirname, '../src/loader.js'),
        },
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
