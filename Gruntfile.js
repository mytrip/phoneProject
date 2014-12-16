// Generated on 2014-11-27 using @ali/generator-mobile-dpl 0.0.4
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    cdnPrefix: 'http://g.tbcdn.cn/',
    app: require('./bower.json').appPath || 'app',
    appName: 'testapp',
    dist: 'build'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/{,*/}*.js', '<%= yeoman.app %>/*/mods/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      less: {
        files: ['<%= yeoman.app %>/{,*/}*.less'],
        tasks: ['less:server'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/pages/{,*/}*.html'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'), //css加载到访问路径
              connect().use(
                '/bower_components',
                connect.static('./bower_components') //组件加载到访问路径
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.dist)
            ];
          }
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/{,*/}*.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        cwd: ''
      },
      app: {
        src: ['<%= yeoman.app %>/pages/{,*/}*.html'],
        ignorePath:  /\.\.\//
      },
      less: {
        src: ['<%= yeoman.app %>/{,*/}*.less'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Copies files
    copy: {
      appindex: {
        expand: true,
        cwd: '<%= yeoman.app %>/',
        dest: '<%= yeoman.dist %>/',
        src: 'index.html'
      },
      pages: {
        expand: true,
        cwd: '<%= yeoman.app %>/pages',
        dest: '<%= yeoman.dist %>/pages',
        src: '*.html'
      }
    },

    // Compiles less to CSS and generates necessary files if requested
    less: {
      server: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['**/*.less'],
          dest: '.tmp/',
          ext: '.css'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['**/*.less'],
          dest: '.tmp/',
          ext: '.css'
        }],
        options: {
          yuicompress: true
        }
      }
    },

    //JS files build
    kmc: {
      options: {
        comboOnly: false,
        fixModuleName: true,
        comboMap: false,
        packages: [
          {
            name: '<%= yeoman.appName %>',
            path: './<%= yeoman.app %>/',
            charset: 'utf-8',
            ignorePackageNameInUri: true

          }
        ],
      },
      main: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/',
            src: [ '*/*.js' ],
            dest: '.tmp/script/'
          }
        ]
      }
    },

    //js 压缩
    uglify: {
      js: {
        options: {
          beautify: {
            ascii_only: true
          }
        },
        files: [
          {
            expand: true,
            cwd: '.tmp/script/',
            src: ['**/*.js'],
            ext: ".js",
            dest: '<%= yeoman.dist %>/'
          }
        ]
      }
    },

    // Performs rewrites and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/pages/{,*/}*.html'],
      options: {
        blockReplacements: {
          css: function (block) {
            return '<link rel="stylesheet" href="'+appConfig.cdnPrefix+block.dest+'">';
          }
        }
      }
    },

    // minify css, and generate to build dir
    cssmin: {
      minify: {
        expand: true,
        cwd: '.tmp/',
        src: ['{,*/}*.css'],
        dest: '<%= yeoman.dist %>',
        ext: '.css'
      }
    },

    // replace kissy config path
    replace: {
      cdnpath:{
        src: ['<%= yeoman.dist %>/pages/{,*/}*.html'], // source files array
        dest: '<%= yeoman.dist %>/pages/',             // destination directory or file
        replacements: [{
          from: '{cdnPrefix}',                         // string replacement
          to: function(){
            return appConfig.cdnPrefix;
          }
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: ['less:server'],
      dist: ['less:dist']
    }

  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    if (target === 'daily') {
      appConfig.cdnPrefix = 'http://g.assets.daily.taobao.net/';
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'copy:appindex',
    'copy:pages',
    'wiredep',
    'concurrent:dist',
    'cssmin',
    'kmc',
    'uglify',
    'usemin',
    'replace:cdnpath'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'serve'
  ]);
};
