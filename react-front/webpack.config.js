const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(jpe?g)$/i,
				loader  : 'url-loader?limit=30000'
			},
			{
				test: /\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
				loader: "file-loader?name=/images/[name].[ext]"
			},
			 {
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'less-loader'
				]
			}, {
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			}
		]
	},
	entry: {
		app: './src/react-tools/entry-loader.js'
	},
	output: {
		filename: '[hash].[name].js',
		publicPath: isDev ? '/' : '/_/',
		path: isDev ? path.resolve('./dev') : path.resolve('./build/_'),
		chunkFilename: '[hash].[name].js'
	},
	devServer: {
		port: 3000,
		historyApiFallback: true
	},
	plugins: [
		new CleanWebpackPlugin(['_'], {
			root: path.resolve('./build'),
			verbose: true,
			dry: false,
			watch: true
		}),
		new MiniCssExtractPlugin({
			filename: '[hash].[name].css',
			chunkFilename: '[hash].[id].css'
		}),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: isDev ? 1 : 10
		}),
		new Dotenv({ path: `./env/.env.${process.env.NODE_ENV}` }),
		new HTMLWebpackPlugin({
			template: './template/template_index.html',
			filename: isDev ? './index.html' : '../index.html',
			chunksSortMode: 'none',
			chunkFilename: '[hash].[name].js'
		})
	]
};

