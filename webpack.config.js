module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "./bundle.js",
        path: __dirname
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    }
};