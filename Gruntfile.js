module.exports = function (grunt) {

    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        srcDir: './app',
        buildDir: './dist',

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '<%= buildDir %>'
                }
            }
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= srcDir %>',
                    src: [
                        '**/*.*',
                        '!{,*/}*.scss'
                    ],
                    dest: '<%= buildDir %>'
                }]
            }
        },

        sass: {
            build: {
                files: {
                    '<%= buildDir %>/css/sb-admin.css': '<%= srcDir %>/css/sb-admin.scss'
                }
            }
        },

        watch: {
            pages: {
                files: ['<%= srcDir %>/**/*.html'],
                tasks: ['copy:build'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            styles: {
                files: ['<%= srcDir %>/**/*.scss'],
                tasks: ['sass:build'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },

        clean: {
            build: ['<%= buildDir %>']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', [
        'clean:build',
        'sass:build',
        'copy:build'
    ]);

    grunt.registerTask('default', [
        'build',
        'connect:server',
        'watch'
    ]);
};
