const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {

    mode: isProduction ? 'production' : 'development',

    entry: './src/vueDatePick.vue',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vueDatePick.js',
        library: 'VueDatePick',
        libraryExport: 'default',
        libraryTarget: 'umd',
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.join(__dirname, 'src')
                ]
            }
        ]
    },
	optimization: {
        minimize: false
    },

    /*optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },*/

    resolve: {
        extensions: ['*', '.js', '.vue', '.json']
    },

    plugins: [
        new VueLoaderPlugin(),
        isProduction && new MiniCssExtractPlugin({filename: 'vueDatePick.css'})
    ].filter(i => i)
};
