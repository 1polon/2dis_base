const {series, parallel, src, dest} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const rev = require('gulp-rev');
const del = require('del');
const uglify = require('gulp-uglify');


function pack_js(cb){
    return src('./src/js/*.js')
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(rev())
        .pipe(dest('./output/js'))
        .pipe(rev.manifest('./output/js/rev-manifest.json', {
            merge: true
        }))
        .pipe(dest('./'))
};

exports.default = pack_js;