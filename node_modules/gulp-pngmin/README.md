# gulp-pngmin

Gulp plugin for optimize PNG.

[![Build Status](https://travis-ci.org/nariyu/gulp-pngmin.svg?branch=master)](https://travis-ci.org/nariyu/gulp-pngmin)

Required: pngquant

## USAGE

### Install (Mac OS with Homebrew)

```
$ brew install pngquant
$ npm install gulp-pngmin --save-dev
```

### Install (CentOS)

```
$ yum install pngquant
$ npm install gulp-pngmin --save-dev
```

### Example

```javascript
var gulp = require('gulp');
var pngmin = require('gulp-pngmin');

// Basic usage
gulp.task('pngmin', function() {
  gulp.src('src/images/**/*.png')
    .pipe(pngmin())
    .pipe(gulp.dest('dist/images'));
});
```

## Arguments

### 1) the number of colors (default: 256)

```javascript
var gulp = require('gulp');
var pngmin = require('gulp-pngmin');
gulp.task('pngmin', function() {
  gulp.src('src/images/**/*.png')
    .pipe(pngmin([192]))
    .pipe(gulp.dest('dist/images'));
});
```

## License
Copyright (c) 2014 Yusuke Narita
Licensed under the MIT license.
