const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 9000,
    hot: false, 
    devMiddleware: {
      writeToDisk: true, 
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: !isDevelopment, 
        },
      },
      {
        test: /\.css$/i,
        exclude: /bootstrap\.min\.css$/i,
        use: [
          isDevelopment ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          "css-loader"],   
      },
      {
        test: /bootstrap\.min\.css$/i,
                use: [
          isDevelopment ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          "rtlcss-loader"], 
      },
         {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
         filename: './images/[name][ext]'
       }
      },
         {
        test: /\.(svg|eot|woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator: {
         filename: './fonts /[name][ext]'
       }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename:"index.html",
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename:"product.html",
      template: './src/product.html'
    }),
    new HtmlWebpackPlugin({
      filename:"checkout.html",
      template: './src/checkout.html'
    }),
    new HtmlWebpackPlugin({
      filename:"payment.html",
      template: './src/payment.html'
    }),
    !isDevelopment && new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
  ].filter(Boolean),
  
  optimization: {
    minimizer: [
      ...(!isDevelopment ? [new CssMinimizerPlugin()] : [])
    ],
  }
};       