const {series, parallel, src, dest, watch} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const rev = require('gulp-rev');
const del = require('del');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');

function pack_js(){
    return src('./src/js/*.js')
        .pipe(concat('bundle.js'))
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


function pack_css(){
    return src(['./src/css/*.css'])
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(dest('./output/css'))
        .pipe(rev.manifest('./output/css/rev-css-manifest.json', {
            merge: true
        }))
        .pipe(dest('./'))
};

function del_output(){
    return (del('./output'))
};

function watching () {
    watch('./src/js/**/*.*', pack_js)
    watch('./src/css/**/*.*', function (cb) {
        pack_css();
    })
}

exports.default =  watching;