import * as gulp from 'gulp';
import * as del from 'del';
// import * as rimraf from 'rimraf';
import * as rename from 'gulp-rename';
import * as install from 'gulp-install';
import * as replace from 'gulp-string-replace';
import * as fs from 'fs';
// import { IDatabase } from './Server/Types/Dbo/IDatabase';
// import { ServiceLocator } from './Server/Framework/ServiceLocator';
// import { IChannelStorageRepository } from './Server/Types/Repositories/IChannelStorageRepository';

gulp.task('client-clean-js', () => {
    return del([
        './Client/**/*.js',
        './Client/**/*.js.map',
        '!./Client/node_modules/**/*.js'
    ]);
});

gulp.task('leads-clean-js', () => {
    return del([
        './*.js',
        './*.js.map',
        './**/*.js',
        './**/*.js.map',
        '!./Client/**/*.js',
        '!./node_modules/**/*.js'
    ]);
});

gulp.task('copy-files', () => {
    gulp.src([
        './Server/**/*.js',
        '!./Server/Test',
        '!./Server/Test/**'
    ])
        .pipe(gulp.dest('./Dist/Elsa/Application/Server/'));

    gulp.src([
        './Server/appSettings.template.json',
        './Server/services.template.json'
    ]).pipe(gulp.dest('./Dist/Settings/'))

    gulp.src([
        './Shared/**/*.js',
        '!./Shared/Interfaces',
        '!./Shared/Interfaces/**'
    ]).pipe(gulp.dest('./Dist/Elsa/Application/Shared/'));

    gulp.src('./Client/dist/**')
        .pipe(gulp.dest('./Dist/Elsa/Application/Client/'));

    gulp.src('./Main.js')
        .pipe(gulp.dest('./Dist/Elsa/Application/'));

    gulp.src('./Data/Database.template.json')
        .pipe(gulp.dest('./Dist/Elsa/Data/'));

    gulp.src('./start.sh')
        .pipe(gulp.dest('./Dist/Elsa/Application/'));

    gulp.src('./Install/**')
        .pipe(gulp.dest('./Dist/Install/'));
});

gulp.task('install', () => {
    return gulp.src('./package.json')
        .pipe(gulp.dest('./Dist/Elsa/Application/'))
        .pipe(install({ production: true }));
});

function setConfigForEnvironment(configName: any) {
    if (configName === 'Staging' || configName === 'Production') {
        gulp.src('./Settings/AppSettings.ts')
            .pipe(replace(/aaa/g, 'aaaaaaaaa'))
            // .pipe(replace(/require\(\'..\/appSettings.json\'\)/g, 'require(\'../../../Settings/appSettings.json\')'))
            .pipe(gulp.dest('./Dist/Settings/'));

        gulp.src('./Framework/ServiceLocator.ts')
            .pipe(replace(/require\(\'..\/..\/services.json\'\)/g, 'require(\'../../../Settings/services.json\')'))
            .pipe(gulp.dest('./Dist/Settings/'));
    }
    else if (configName === 'Local') {
        gulp.src('./Settings/AppSettings.ts')
            .pipe(replace(/require\(\'..\/appSettings.json\'\)/g, ))
            .pipe(gulp.dest('./Dist/Settings/'));

        gulp.src('./Framework/ServiceLocator.ts')
            .pipe(replace(/require\(\'..\/..\/services.json\'\)/g, 'require(\'../../../Settings/services.json\')'))
            .pipe(gulp.dest('./Dist/Settings/'));
    }
}

gulp.task('SetConfig-Local', function () {
    return setConfigForEnvironment('Local');
});

gulp.task('SetConfig-Staging', function () {
    return setConfigForEnvironment('Staging');
});

gulp.task('SetConfig-Production', function () {
    return setConfigForEnvironment('Production');
});

// gulp.task('clean-npm', (done: any) => {
//     rimraf('node_modules', done);
// });

// gulp.task('clean-npm-client', (done: any) => {
//     rimraf('./Client/node_modules', done);
// });

// gulp.task('clean-dist', (done: any) => {
//     rimraf('Dist', done);
// });

// gulp.task('clean-dist-client', (done: any) => {
//     rimraf('./Client/Dist', done);
// });

// gulp.task('create-database', () => {
//     let repo: IChannelStorageRepository = ServiceLocator.Instance.Get('IChannelStorageRepository');
//     repo.CreateDb();
// });
