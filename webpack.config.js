module.exports = {
    context: __dirname + '/src',
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: __dirname + '/dist'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: { presets: ['es2015', 'react'] },
                exclude: /node_modules/
            },
            {
                test: /\.css$/, 
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
                use: [
                    'url-loader'
                ]
            }
        ]
    }
}