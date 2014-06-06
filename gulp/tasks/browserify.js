var browserify = require('browserify');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');

gulp.task('browserify', function(){
  return browserify({
    entries: ['./src/ExampleApp.react'],
    extensions: [
      '.coffee',
      '.cjsx',
    ]
  })
  .bundle({debug: true})
  .on('error', handleErrors)
  .pipe(source('app.js'))
  .pipe(gulp.dest('./public/javascript/'));
});
