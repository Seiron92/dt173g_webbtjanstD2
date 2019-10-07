/* SETUP 
RUN:

** GIT **
git init
git remote add origin https://github.com/Seiron92/dt175g_webbtjanstD2.git
git push origin master

** NPM **
npm init
npm install -g gulp-cli
npm install gulp --save-dev
Don't forget to init git, create .gitignore and add node_modules in this file.
Install all (npm)packages (minify, etc) and declaire them.

ADD in package.json under scripts: "gulp": "gulp"
execute with: npm run gulp
IF REGULAR GIT PUSH DOESN'T WORK : git push -f origin master
*/

const { src, dest, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require('gulp-uglify-es').default;
const watch = require('gulp-watch');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');


const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');

const sourcemapsB = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concatB = require("gulp-concat");
// PATHS
const files = {
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    sassPath: "src/**/*.scss",
    cssPath:  "src/**/*.css",
    imgPath: "src/images/**"
};


// TASK: Copy HTML files from src to pub
function copyHTML() {

    return src(files.htmlPath)
        .pipe(browserSync.stream())
        .pipe(dest("pub")

        );
}

// TASK : Concat and minify js-files

function jsTask() {
    return src(files.jsPath)
        .pipe(browserSync.stream())
       // .pipe(uglify())
        .pipe(sourcemapsB.init())
        .pipe(babel())
        .pipe(concatB("main.js"))
        .pipe(sourcemapsB.write("."))
        .pipe(dest('pub/js')

        );
}
    // TASK : Move Css to pub, minify files 

    function cssTask(){
        return src(files.cssPath)
        .pipe(browserSync.stream())
     .pipe(concatCss("css/main.css"))
     .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('pub')
       );
        }

// TASK : Compile SASS and compress
function sassTask() {
return src(files.sassPath)
.pipe(browserSync.stream())
.pipe(sourcemaps.init())
.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
.pipe(sourcemaps.write('.maps'))
.pipe(dest('pub')
);
}

// TASK : Minify images and copy from src to pub

function imgsPath() {
    return src(files.imgPath)
        .pipe(browserSync.stream())
      //  .pipe(imagemin())
        .pipe(dest('pub/images')
        );
}


// TASK : watcher
function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'pub/'
        }
    });

    watch([files.htmlPath, files.jsPath, files.sassPath, files.imgPath],
        parallel(copyHTML, jsTask, cssTask,sassTask, imgsPath),

    );
}

exports.default = series(
    parallel(copyHTML, jsTask, cssTask, sassTask, imgsPath),
    watchTask

);