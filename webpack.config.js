const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {
	entry: './www/app/main.js',
	output: {
		path: path.resolve(__dirname, './www/dist'),
		filename: 'bundle.js'
	},
	module: {
	    rules: [
			{
				test: /\.js$/,
				exclude: [
					path.resolve(__dirname, "node_modules")
				],
				loader: "babel-loader",
				options: {
					presets: ["es2015"],
					plugins : ['transform-object-rest-spread']
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
						sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
					},
					extractCSS: true
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("style.css") 
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	watch : true
}