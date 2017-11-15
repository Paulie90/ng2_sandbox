'use strict';
var _ = require('lodash');

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src', 'app', 'bootstrap'),
        vendor: path.resolve(__dirname, 'src', 'app', 'vendor')
    },
    resolve: {
        extensions: ['.js', '.ts', '.pug', '.scss']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    devServer: {
        contentBase: __dirname,
        stats: 'minimal',
        port: 9000,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(jpe?g|png|gif|woff2|woff|ttf|eot|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
        new webpack.ProvidePlugin({
            moment: 'moment',
            'window.moment': 'moment',

            _: 'lodash',
            'window._': 'lodash',
        }),
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.resolve(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.optimize.CommonsChunkPlugin(
            {
                name: "vendor",
                filename: "vendor.[hash].js"
            }
        ),
        new ExtractTextPlugin({
            filename: 'styles.[hash].css',
            allChunks: true,
            ignoreOrder: true
        }),
        new UglifyJSPlugin({
            parallel: true,
            sourceMap: true,
            cache: true,
            extractComments: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true
        })
    ]
}
