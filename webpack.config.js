const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false,
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      "querystring": require.resolve("querystring-es3"),
      "url": require.resolve("url/"),
      "os": require.resolve("os-browserify/browser"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "assert": require.resolve("assert/"),
      "net": false,
      "tls": false,
      "child_process": false,
      "async_hooks": false,
      "constants": false,
      "console": false,
      "events": require.resolve("events/")
    },
    alias: {
      "node:fs": false,
      "node:path": false,
      "node:http": false,
      "node:net": false,
      "node:zlib": false,
      "node:events": require.resolve("events/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    })
  ]
}; 