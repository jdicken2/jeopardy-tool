/* eslint-env node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    plugins: [
        // CleanWebpackPlugin cleans out the dist directory on each build
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: 'dist/**'
        }),
        // HtmlWebpackPlugin automatically builds the index.html file, with all
        // the bundles included as script tags
        new HtmlWebpackPlugin({
            title: 'jeopardy-tool',
            template: path.resolve(__dirname, 'src/index.html'),
        })
    ],
    module: {
        rules: [
            // loading JavaScript files
            {
                test: /\.m?js$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: {
                    // `cacheDirectory=true` makes it so that the babel output
                    // is cached and dramatically speeds up subsequent builds
                    loader: 'babel-loader?cacheDirectory=true',
                    // options: <see .babelrc for options>
                },
            },
        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, 'src/components'),
            Pages: path.resolve(__dirname, 'src/pages'),
        },
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    devServer: {
        historyApiFallback: true
    }
};
