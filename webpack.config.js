// webpack.config.js
const path = require('path')

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js' // Output file name
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Process JavaScript and JSX files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader' // Use Babel for JavaScript/JSX transpilation
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 3000,
    open: true
  }
}
