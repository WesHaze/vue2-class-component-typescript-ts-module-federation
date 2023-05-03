/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const deps = require("./package.json");
const port = 8084;

module.exports = {
  mode: "development",
  cache: false,
  devtool: "source-map",
  target: "web",
  optimization: {
    minimize: false
  },
  entry: path.resolve(__dirname, "./src/main.ts"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: `http://localhost:${port}/`
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue: "vue/dist/vue.runtime.esm.js",
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, 'src/assets')
    }
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] }
      },
      {
        test: /\.css|.sass|.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
            name: "[name].[ext]",
            limit: 8192
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      chunks: ["main"],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new ModuleFederationPlugin({
      name: "micro_main",
      remotes: {
        web_common: "web_common@http://localhost:8082/remoteEntry.js"
      },
      shared: {
        vue: {
          eager: true,
          singleton: true,
          requiredVersion: deps.vue
        },
      }
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public")
    },
    compress: true,
    port,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
};