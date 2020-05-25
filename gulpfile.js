const {series, parallel, src, dest} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const rev = require('gulp-rev');
const del = require('del');


function pack_js(cb){
    return src('./src/js/*.js')
        .pipe(dest('./output/js'))
};

exports.default = pack_js;