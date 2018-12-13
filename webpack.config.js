const {VueLoaderPlugin} = require('vue-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        './home/js/bundle': `${__dirname}/src/home-app/index.js`,
        './home/js/bundle.min': `${__dirname}/src/home-app/index.js`,
        './login/js/bundle': `${__dirname}/src/login-app/index.js`,
        './login/js/bundle.min': `${__dirname}/src/login-app/index.js`,
        './admin/js/bundle': `${__dirname}/src/admin-app/index.js`,
        './admin/js/bundle.min': `${__dirname}/src/admin-app/index.js`,
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Admin',
            template: './src/index.html',
            filename: './admin/index.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            title: 'Login',
            template: './src/index.html',
            filename: './login/index.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            title: 'MEVN Stack',
            template: './src/index.html',
            filename: './home/index.html',
            inject: false
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            include: /\.min\.js$/
        })]
    }
};