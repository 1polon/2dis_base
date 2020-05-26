const {series, parallel, src, dest, watch} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const rev = require('gulp-rev');
const del = require('del');
const uglify = require("gulp-uglify");
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const to_webp = require('gulp-webp');

function pack_js(){
    // delete folder for new file witch cache name
    del('./output/js/*.js')
    return src('./src/js/*.js')
        .pipe(babel())
        .pipe(concat('bundle.js'))
        // add cache number
        .pipe(rev())
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(dest('./output/js'))
        //cache information
        .pipe(rev.manifest('./output/rev-manifest.json', {
            merge: true
        }))
        .pipe(dest('./'))
        //reloading browser if file change
        .pipe(connect.reload())
};


function pack_css(){
    del('./output/css/*.css')
    return src(['./src/css/*.css'])
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(dest('./output/css'))
        .pipe(rev.manifest('./output/rev-manifest.json', {
            merge: true
        }))
        .pipe(dest('./'))
        .pipe(connect.reload())
};

function pack_html () {
    return src('./src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true
        }))
        .pipe(dest('./output'))
        .pipe(connect.reload())
}

function del_output(){
    return (del(['!./output/static', './output/js', './output/css', './output/*.*', ]))
};

function watching () {
    watch('./src/js/**/*.*', function p_js () {
        return pack_js();
    })
    watch('./src/css/**/*.*', function p_css () {
        return  pack_css();
    })
    watch('./src/*.*', function p_html () {
        return pack_html();
    })
};

function create_first (cb) {
    pack_css();
    pack_js();
    pack_html();
    cb();
};

function start_server(){
    connect.server({
        root: './output',
        livereload: true
    })
};

function conwert_to_webp () {
    return src('./src/static/*.*')
        .pipe(to_webp())
        .pipe(dest('./output/static'))
}

exports.default =  series(del_output, create_first, parallel(watching, start_server));
exports.conwert_to_webp = conwert_to_webp;