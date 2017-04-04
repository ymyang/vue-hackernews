const gulp = require('gulp');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const jetpack = require('fs-jetpack');

gulp.task('clean', () => {
    jetpack.dir('./dist', { empty: true });
});

gulp.task('build', () => {
    const config = require('./webpack.config.js');
    webpack(config, (err, stats) => {
        if (err) {
            console.error('webpack', err);
            return;
        }
        console.log('webpack ok');
    });
});

gulp.task('serve', () => {
    const config = require('./webpack.config.js');
    const server = new WebpackDevServer(webpack(config), {
        //contentBase: 'http://localhost/',
        //contentBase: './build/',
        //publicPath: './build/',
        //publicPath: 'http://localhost/',
        //historyApiFallback: true,
        hot: true,
        lazy: false,
        proxy: {
            '/v0/*': 'https://hacker-news.firebaseio.com/v0'
        }
    });
    server.listen('1337', 'localhost', (err) => {
        if (err) {
            console.error('dev:', err);
            return;
        }
        console.log('webpack dev server start');
    });
});

gulp.task('default', ['webpack']);