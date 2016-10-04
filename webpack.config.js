const webpack = require('webpack');

// File ops
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Folder ops
const path = require('path');

// Constants
const APP = path.join(__dirname, 'app');
const BUILD = path.join(__dirname, 'build');
const TEMPLATE = path.join(__dirname, 'app/templates/index_default.html');
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8081;

module.exports = {
    entry: {
        app: APP
    },
    output: {
        path: BUILD,
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    devtool: 'eval-source-map',
    // webpack-dev-server configuration
    devServer: {
        historyApiFallback: true,
        // hot: true,
        inline: true,
        progress: true,

        stats: 'errors-only',

        host: HOST,
        port: PORT,

        outputPath: BUILD
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: TEMPLATE,
            // JS placed at the bottom of the body element
            inject: 'body'
        })
    ]
};