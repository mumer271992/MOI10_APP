const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, args) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname , "public" , "dist"),
            filename: "bundle.js"
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                },
                {
                  test: /\.(eot|svg|ttf|woff|woff2)$/,
                  loader: 'file-loader?name=./fonts/[name].[ext]'
                }
            ]
        },
        plugins: [
            CSSExtract,
            new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'src', 'assets'),
                to: path.join(__dirname, 'public', 'dist') }
            ]),
        ],
        devtool: isProduction ? "source-map" : "inline-source-map",
        devServer: {
            contentBase: path.join(__dirname , "public"),
            historyApiFallback: true,
            publicPath: "/dist/"
        },
        node: {
            fs: 'empty'
        }
    }
};