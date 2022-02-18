const path = require('path');
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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { presets: ["@babel/env", "@babel/preset-react"] }
            },
            {
                test: /\.(s[ac]ss)$/,
                use: [ // 아래의 로더부터 변환함. 위의 로더가 제일 마지막에 실행
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    devServer: {
        static: path.join(__dirname, './dist'),
        hot: true,
        port: 8082
    }
};