let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
	'faker', 'lodash', 'react', 'react-dom', 'react-input-range', 'react-redux', 'react-router',
	'redux', 'redux-form', 'redux-thunk',
]

module.exports = {
	entry: {
		bundle: './src/index.js', // Creates bundle with our project
		vendor: VENDOR_LIBS, // Creates bundle with project's dependencies 
	},
  output: {
    path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].js' // Build entry bundles and save them as the keys specified above.
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				use: ['style-loader', 'css-loader'],
				test: /\.css$/
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]
};
