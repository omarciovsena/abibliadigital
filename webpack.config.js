const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJS = require('uglify-es')

const extractSass = new ExtractTextPlugin({
  filename: '../public/app.css'
})

function plugins() {
  return [
    {
      test: /\.(sass|scss)$/,
      loader: extractSass.extract(['css-loader', 'sass-loader'])
    },
    {
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel-loader',
      options: { presets: ['env'] }
    }
  ]
}

module.exports = {
  entry: [
    './resources/assets/sass/app.scss',
    './resources/assets/scripts/app.js'
  ],
  output: {
    filename: '../public/app.js',
    path: __dirname + '/public'
  },
  module: {
    rules: plugins()
  },
  plugins: [
    extractSass,
    new CompressionPlugin({ algorithm: 'gzip' }),
    new CopyWebpackPlugin([
      {
        from: './resources/assets/theme/js/*.js',
        to: '../public/theme/js/[name].[ext]',
        transform(content) {
          return UglifyJS.minify(content.toString()).code
        }
      },
      {
        from: './resources/assets/theme/fonts/**',
        to: '../public/theme/fonts/[name].[ext]'
      },
      {
        from: './resources/assets/theme/images/**',
        to: '../public/theme/images/[name].[ext]'
      }
    ])
  ]
}
