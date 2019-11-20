'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const del = require('del');
const mkdir = require('make-dir');
const mergeStream = require('merge-stream');
sass.compiler = require('node-sass');

const directories = {
  src_partials: '_sass/',
  dest_css: 'assets/stylesheets/',
  js_location: 'assets/javascripts/',
  images: 'assets/images/',
  svg: 'assets/SVG/',
  build: '.build'
};

const clean = async () => {
  await del[directories.build];
};

exports.clean = clean;

const mkBuildDirectory = async () => {
  await mkdir(directories.build)
};

const cssConfig = {
  mainSassFile: `${directories.dest_css}/main.scss`,
  partialsGlob: `${directories.src_partials}/**/*.scss`,
  sassOpts: {
    sourceMap: true,
    outputStyle: 'nested',
    precision: 3,
    logErrorsToConsole: true,
    outputCssFile: `${directories.dest_css}/main.css`
  },
  postCSS: [
    require('autoprefixer'),
    require('cssnano')
  ]
};

const copyFile = (src, dest) => {
  () => gulp.src(src)
        .pipe(gulp.dest(dest));
};

const buildSass = async () => {
  gulp.src([
    cssConfig.partialsGlob,
    cssConfig.mainSassFile
  ])
    .pipe(sourcemaps.init())
    .pipe(sass(cssConfig.sassOpts))
    .pipe(postcss)
    .pipe(sourcemaps.write('./'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(directories.dest_css));
};
