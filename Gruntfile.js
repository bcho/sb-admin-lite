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
                        '**/*.*'
                    ],
                    dest: '<%= buildDir %>'
                }]
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
            }
        },

        clean: {
            build: ['<%= buildDir %>']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'clean:build',
        'copy:build',
        'connect:server',
        'watch:pages'
    ]);
};
