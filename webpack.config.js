const {VueLoaderPlugin} = require('vue-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        './src/home/js/bundle': `${__dirname}/src/home-app/index.js`,
        './src/home/js/bundle.min': `${__dirname}/src/home-app/index.js`,
        './src/admin/js/bundle': `${__dirname}/src/admin-app/index.js`,
        './src/admin/js/bundle.min': `${__dirname}/src/admin-app/index.js`,
    },
    output: {
        path: `${__dirname}`,
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
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            include: /\.min\.js$/
        })]
    }
};