var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var del = require('del');
var rename = require('gulp-rename')
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');


gulp.task('clean', async function(){
  del.sync('dist')
})

gulp.task('scss', function(){
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass({outputStyle: 'expanded'}))
	.pipe(autoprefixer({
      browsers: ['last 8 versions']
    }))
    // .pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}))

});

gulp.task('html', function(){
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({stream:true}))
})

gulp.task('browser-sync', function(){
	browserSync.init({
		server:{
			baseDir:"app/"
		}
	})
});

gulp.task('pug',function() {
	return gulp.src('app/template/index.pug')
 	.pipe(pug({
	    doctype: 'html',
	    pretty: true
 	}))
 	.pipe(gulp.dest('app/'));
});

gulp.task('export', async function(){
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let BuildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
    
  let BuildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  let BuildImg = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'));   
});

gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
	gulp.watch('app/*html', gulp.parallel('html'));
	gulp.watch('app/template/**/*.pug', gulp.parallel('pug'));
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
