const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, 'favicon.ico'),
      template: 'src/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
}

module.exports = () => {
  config.mode = isProduction ? 'production' : 'development'
  return config
}