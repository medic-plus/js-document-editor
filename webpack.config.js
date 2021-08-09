const path = require("path")
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {  
  return [{
    entry: path.resolve(__dirname, "src/js/index.js"),
    output: {
      path: path.resolve(__dirname, "dist/js"),
      filename: "jeditor.js",
      library: "$",
      libraryTarget: "umd",
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
              MiniCSSExtractPlugin.loader,
              //'style-loader',
              'css-loader',
              //'postcss-loader',
              'sass-loader'
          ],
        },
      ],
    },    
    plugins: [new MiniCSSExtractPlugin({
      filename: "../css/jeditor.css"
    })]
  }]
}