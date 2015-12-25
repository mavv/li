/* disable no-used-vars*/

var webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		// './src/less/main.less',
		// 'babel-polyfill',
		'./src/js/main'
	],
	output: {
		path: 'bin',
		filename: 'bundle.js'
	},
	target: 'web',
	debug: true,
	cache: true,
	devtool: 'eval-source-map',
	watch: true,
	devServer: {
		hot: true,
		inline: true,
		progress: true,
		colors: true,
		profile: true,
		contentBase: 'bin'
		// displayChuncks: true,
		// displayErrorDetails: true,
		// displayReasons: true,
	},
	module:{
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					plugins: ['transform-runtime'],
					presets: ['es2015']
				}
			},
			{
				test: /\.less$/,
				loader: 'style!css!autoprefixer!less'
			},
			{
				test: /\.html$/,
				loader: 'static',
				query: {
					output: './bin'
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.json', '.less']
	}
};
