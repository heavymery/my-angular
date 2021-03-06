// Generated on 2015-05-30 using generator-angular 0.11.1
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
    module: require('./bower.json').moduleName || 'myAngular',
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
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
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        // FIXME: Actually not newer
        // tasks: ['newer:jshint:all'],
        tasks: ['jshint:all'],
        options: {
          spawn: false,
          interrupt: true,
          debounceDelay: 0,
          // livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '<%= yeoman.app %>/views/{,*/,*/*/}*.html',
          '<%= yeoman.app %>/scripts/{,*/}*.js',
          // '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      proxies: [
        {
          context: '/api',
          host: '0.0.0.0',
          port: 3000
        }
      ],
      livereload: {
        options: {
          open: false,
          middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            // Setup the proxy
            var middlewares = [
              require('grunt-connect-proxy/lib/utils').proxyRequest,
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app),
              connect.static('.tmp')
            ];

            // Make directory browse-able.
            var directory = options.directory || options.base[options.base.length - 1];
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            // Setup the proxy
            var middlewares = [
              require('grunt-connect-proxy/lib/utils').proxyRequest,
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static('test'),
              connect.static('.tmp')
            ];

            // Make directory browse-able.
            var directory = options.directory || options.base[options.base.length - 1];
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
        }
      },
      dist: {
        options: {
          open: false,
          middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            // Setup the proxy
            var middlewares = [
              require('grunt-connect-proxy/lib/utils').proxyRequest,
              connect.static(appConfig.dist),
            ];

            // Make directory browse-able.
            var directory = options.directory || options.base[options.base.length - 1];
            middlewares.push(connect.directory(directory));

            return middlewares;
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
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
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
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          // cwd: '.tmp/styles/',
          cwd: '<%= yeoman.app %>/styles/',
          src: '{,*/}*.css',
          // dest: '.tmp/styles/'
          dest: '<%= yeoman.app %>/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          // cwd: '.tmp/styles/',
          cwd: '<%= yeoman.dist %>/styles/',
          src: '{,*/}*.css',
          // dest: '.tmp/styles/'
          dest: '<%= yeoman.dist %>/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.local.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath:  /\.\.\/\.\.\/\.\.\//
        //ignorePath: /(\.\.\/)*bower_components\//
      }
    },

    // // Compiles Sass to CSS and generates necessary files if requested
    // compass: {
    //   options: {
    //     sassDir: '<%= yeoman.app %>/styles',
    //     cssDir: '.tmp/styles',
    //     generatedImagesDir: '.tmp/images/generated',
    //     imagesDir: '<%= yeoman.app %>/images',
    //     javascriptsDir: '<%= yeoman.app %>/scripts',
    //     fontsDir: '<%= yeoman.app %>/styles/fonts',
    //     importPath: './bower_components',
    //     httpImagesPath: '/images',
    //     httpGeneratedImagesPath: '/images/generated',
    //     httpFontsPath: '/styles/fonts',
    //     relativeAssets: false,
    //     assetCacheBuster: false,
    //     raw: 'Sass::Script::Number.precision = 10\n'
    //   },
    //   dist: {
    //     options: {
    //       generatedImagesDir: '<%= yeoman.dist %>/images/generated'
    //     }
    //   },
    //   server: {
    //     options: {
    //       sourcemap: true
    //     }
    //   }
    // },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['concat', 'cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ],
        patterns: {
          js: [
            [/(images\/[\w/.@-]*\.(png|jpg|gif|svg))/ig, 'Update the JS with the new image filenames']
          ]
        }
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    uglify: {
      options: {
        compress: {
          'drop_console': true
        }
      },
    },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    ngtemplates: {
      options: {
        htmlmin:  {
          collapseBooleanAttributes: true,
          removeAttributeQuotes: false,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: false,
          removeOptionalTags: true,
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true
        },
        module: '<%= yeoman.module %>'
      },
      files: {
        cwd: '<%= yeoman.app %>',
        src: 'views/**/*.html',
        dest: '.tmp/scripts/templates.js'
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            // '*.html',
            // 'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>'
        }]
      },
      index: {
        expand: true,
        cwd: '.tmp',
        dest: '<%= yeoman.dist %>',
        src: '*.html'
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      test: {
        expand: true,
        cwd: '<%= yeoman.app %>',
        dest: '.tmp',
        src: '**/*'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
      ],
      test: [
        'shell:sassCompile',
        'copy:test'
      ],
      dist: [
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      local: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      },
      browserstack: {
        configFile: 'test/karma-browserstack.conf.js',
        singleRun: true
      }
    },

    'protractor_webdriver': {
      start: {
        options: {
          path: 'node_modules/protractor/bin/',
          command: 'webdriver-manager start'
        }
      }
    },

    protractor: {
      options: {
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      local: {
        options: {
          configFile: 'test/e2e/protractor.conf.js'
        }
      },
      browserstack: {
        options: {
          configFile: 'test/e2e/protractor-browserstack.conf.js'
        }
      }
    },

    preprocess: {
      options: {
        inline: true,
        context: {
          DEVELOP: false
        }
      },
      buildHtml: {
        expand: true,
        cwd: '<%= yeoman.app %>',
        dest: '.tmp',
        src: ['index.html', 'views/**/*.html']
      },
      buildJs: {
        src: '.tmp/concat/scripts/*.js'
      },
      test: {
        src: [
          '.tmp/index.html',
          '.tmp/scripts/app.js'
        ]
      }
    },

    shell: {
      webdriverUpdate: {
        command: 'node_modules/protractor/bin/webdriver-manager update --standalone',
        options: {
          async: false
        }
      },
      launchApiServer: {
        command: 'node test/e2e/awesome-server.js',
        options: {
          async: true,
          execOptions: {
            cwd: './'
          }
        }
      },
      initApiData: {
        command: '',
        options: {
          async: false,
          execOptions: {
            cwd: './'
          }
        }
      },
      sassCompile: {
        command: 'node_modules/node-sass/bin/node-sass --recursive --source-map true <%= yeoman.app %>/styles/sass/ --output <%= yeoman.app %>/styles/',
      },
      sassWatch: {
        command: 'node_modules/node-sass/bin/node-sass --watch --recursive --source-map true <%= yeoman.app %>/styles/sass/ --output <%= yeoman.app %>/styles/',
        options: {
          async: true
        }
      }
    }

  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      // return grunt.task.run(['build', 'connect:dist:keepalive']);
      return grunt.task.run([
        'configureProxies:dist',
        'connect:dist:keepalive'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      // 'autoprefixer:server',
      'configureProxies:livereload',
      'connect:livereload',
      'shell:sassWatch',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', 'Unit & E2E test', function () {
    var tasks = [
      'clean:server',
      'wiredep',
      'concurrent:test',
      'autoprefixer:server',
      'configureProxies:test',
      'connect:test',
      'karma:local'
    ];

    if(grunt.option('e2e')) {
      tasks.push('shell:webdriverUpdate');
      tasks.push('protractor_webdriver');

       if(!grunt.option('mock')) {
         tasks.push('preprocess:test');
         tasks.push('shell:initApiData');
         tasks.push('shell:launchApiServer');
       }

      tasks.push('protractor:local');
    }

    grunt.task.run(tasks);
  });

  var BrowserStackTunnel = require('browserstacktunnel-wrapper');
  var browserStackTunnel = new BrowserStackTunnel({
    // BrowserStack Access Key
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    hosts: [{
      name: 'localhost',
      port: 9001,
      sslFlag: 0
    }],
    v: true,
    force: true
  });

  grunt.registerTask('browserstacktunnel', 'Start/Stop BrowserStackTunnel', function(target) {
    var done = this.async();

    switch(target) {
      case 'stop':
        browserStackTunnel.stop(function(error) {
          if (error) {
            grunt.log.error('Could not stop tunnel');
            grunt.log.debug(error);
            done(false);
          } else {
            grunt.log.ok('Stop tunnel successfully');
            done();
          }
        });
        break;

      case 'start':
        browserStackTunnel.start(function(error) {
          if (error) {
            grunt.log.error('Could not start tunnel');
            grunt.log.debug(error);
            done(false);
          } else {
            grunt.log.ok('Start tunnel successfully');

            setTimeout(function() {
              done();
            }, 1000);
          }
        });
        break;
    }
  });


  grunt.registerTask('test:browserstack', 'Unit & E2E test for BrowserStack', function () {
    var tasks = [
      'clean:server',
      'wiredep',
      'concurrent:test',
      'autoprefixer:server',
      'configureProxies:test',
      'connect:test',
      'karma:browserstack'
    ];

    if(grunt.option('e2e')) {
      tasks.push('browserstacktunnel:start');

      if(!grunt.option('mock')) {
        tasks.push('preprocess:test');
        tasks.push('shell:initApiData');
        tasks.push('shell:launchApiServer');
      }

      tasks.push('protractor:browserstack');
      tasks.push('browserstacktunnel:stop');
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'shell:sassCompile',
    'autoprefixer:dist',
    'preprocess:buildHtml',
    'ngtemplates',
    'concat',
    'preprocess:buildJs',
    'ngAnnotate',
    'copy:dist',
    'copy:index',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
