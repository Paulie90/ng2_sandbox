'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    watch: true,
    devtool: 'source-map',
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
    resolve: {
        extensions: ['.js', '.ts', '.pug', '.scss']
    },
    entry: {
        app: path.resolve(__dirname, 'src', 'app', 'bootstrap'),
        vendor: path.resolve(__dirname, 'src', 'app', 'vendor')
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
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            minimize: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.resolve(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.optimize.CommonsChunkPlugin(
            {
                name: "vendor",
                filename: "vendor.bundle.js"
            }
        ),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new UglifyJSPlugin({
            parallel: true,
            sourceMap: true,
            cache: true
        })
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
