const path = require('path');

module.exports = {
    entry: './node_modules/bson/lib/bson.js',
    output: {
        filename: 'bson.common.js',
        path: path.resolve(__dirname, 'lib/third_party'),
        library: 'bson',
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: { 
                        presets: [
                            'env',
                        ], 
                    },
                },
            },
        ],
    },
    plugins: [
    ],
};
