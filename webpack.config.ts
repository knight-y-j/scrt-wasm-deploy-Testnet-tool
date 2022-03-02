import path from 'path';
import {} from "webpack-dev-server";
import { Configuration } from "webpack";
import Dotenv from 'dotenv-webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const config: Configuration = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'dist'),
        publicPath: "/dist",
      },
      {
        directory: __dirname,
        publicPath: "/",
      },
    ]
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".json", ".wasm"],
    fallback: {
      "fs": false,
      "path": require.resolve("path-browserify"),
      "crypto-browserify": require.resolve('crypto-browserify')
    }
  },
  plugins: [
    new NodePolyfillPlugin(),
    new Dotenv()
  ]
};

export default config;
