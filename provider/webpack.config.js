/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require("./package.json").dependencies;
const port = 8082;

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
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          url: false
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: "web_common",
      remotes: {},
      filename: "remoteEntry.js",
      exposes: {
        "./HelloWorld": "./src/components/HelloWorld.vue",
      },
      shared: {
        ...deps,
      },
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