 const gulp = require("gulp");
 const sass = require("gulp-sass");
 const concat = require("gulp-concat");
// const uglify = require("gulp-uglify");
 const minify = require("gulp-minify-css");

//监听任务
gulp.task("watchall",async ()=>{
    //监听html,进行复制
    gulp.watch("*.html",async ()=>{
        gulp.src("*.html")
        .pipe(gulp.dest("D:\\phpstudy1\\www\\oneleaf"))
    })
    gulp.watch("js/**/*",async ()=>{
        gulp.src("js/**/*")
        .pipe(gulp.dest("D:\\phpstudy1\\www\\oneleaf\\js"))
    })
    gulp.watch("img/**/*",async ()=>{
        gulp.src("img/**/*")
        .pipe(gulp.dest("D:\\phpstudy1\\www\\oneleaf\\img"))
    })
    gulp.watch("demosass/*.scss",async ()=>{
        gulp.src("demosass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("D:\\oneleaf\\css"));
    });
    gulp.watch("css/**/*",async ()=>{
        gulp.src("css/**/*")
        .pipe(gulp.dest("D:\\phpstudy1\\www\\oneleaf\\css"))
    })
    gulp.watch("*.php",async ()=>{
        gulp.src("*.php")
        .pipe(gulp.dest("D:\\phpstudy1\\www\\oneleaf"))
    })

})