const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        'bundle': ['./src/js/index.js', './src/scss/style.scss'],
    },
    output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].js'
	},
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css|.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    //'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
          })
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.vue', '.css', '.scss']
    },
    devServer: {
        static: path.join(__dirname, './dist'),
        hot: true,
        port: 8083
    }
};