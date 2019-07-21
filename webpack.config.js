const path = require("path");
const webpack = require("webpack");
let plugins = []; // if using any plugins for both dev and production
const devPlugins = []; // if using any plugins for development

const prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
];

plugins = plugins.concat(
  process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins
)

module.exports = {
  context: __dirname,
  entry: "./frontend/entry.jsx",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: plugins,
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  optimization: {
    minimize: true
  }
};
