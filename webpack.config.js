const path = require('path');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var config = {
    entry: './src/init.tsx',
    output: {
        filename: './build/app/app.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        alias: {
          react: path.resolve('./node_modules/react')
        }
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}

config.target = webpackTargetElectronRenderer(config);
module.exports = config;
