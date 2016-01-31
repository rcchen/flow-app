const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var config = {
    entry: './src/init.tsx',
    output: {
        filename: './build/app.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}

config.target = webpackTargetElectronRenderer(config);
module.exports = config;
