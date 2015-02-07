// ┌─────────────┐
// │ Gruntfile   │
// └─────────────┘
// Grunt wraps several tasks to ease development
// runs middleman, deploys the site, and tags new releases

// Gets current version description from CHANGELOG.md
function findVersion(log) {
  var newVersion = log.split('## v')[1];
  var description = newVersion.substring(5,newVersion.length);
  return description;
}

// Javascript banner
var banner = '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '*  <%= pkg.homepage %>\n' +
                '*  Copyright (c) <%= grunt.template.today("yyyy") %> Environmental Systems Research Institute, Inc.\n' +
                '*  Apache 2.0 License */\n';

module.exports = function(grunt) {

  var currentVersion = 'v' + grunt.file.readJSON('package.json').version;
  var log = grunt.file.read('CHANGELOG.md');
  var description = findVersion(log);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'acetate': {
      // Rebuild site with Acetate
      build: {
        config: 'docs/acetate.conf.js'
      },
      // Run a development server with Acetate
      server: {
        config: 'docs/acetate.conf.js',
        options: {
          watch: true,
          server: true,
          port: 8888,
          host: '0.0.0.0'
        }
      }
    },

    // Watch files
    'watch': {
      scripts: {
        files: ['lib/js/calcite-web.js'],
        tasks: [
          'concat:doc',
          'copy:doc',
          'jshint'
        ]
      },
      images: {
        files: ['lib/img/**/*'],
        tasks: [
          'newer:imagemin:doc',
          'copy:doc'
        ]
      },
      libsass: {
        files: ['lib/sass/**/*', 'docs/source/assets/css/**/*'],
        tasks: [
          'libsass:doc',
          'copy:doc'
        ]
      }
    },

    // Check Javascript for errors
    'jshint': {
      all: ['lib/js/calcite-web.js']
    },

    // Build CSS files to dist
    'libsass': {

      options: {
        loadPath: ['lib/sass/']
      },

      expanded: {
        src: 'lib/sass/calcite-web.scss',
        dest: 'dist/css/calcite-web.css'
      },

      doc: {
        expand: true,
        cwd: 'docs/source/assets/css',
        src: ['**/*.scss'],
        dest: 'docs/build/assets/css',
        ext: '.css'
      },

      homepage: {
        src: 'docs/source/assets/css/homepage.scss',
        dest: 'docs/build/assets/css/homepage.css'
      }
    },

    // Create minified version of build css
    'cssmin': {
      target: {
        files: {
          'dist/css/calcite-web.min.css': ['dist/css/calcite-web.css']
        }
      }
    },

    // Build minified Javascript file to dist
    'uglify': {
      options: {
        mangle: false,
        banner: banner
      },
      dist: {
        files: {
          'dist/js/calcite-web.min.js': ['lib/js/calcite-web.js']
        }
      }
    },

    // Copy libsass files to dist, doc assets to build
    'copy': {
      libsass: {
        expand: true,
        cwd: 'lib/',
        src: ['sass/**/*'],
        dest: 'dist/'
      },
      doc: {
        expand: true,
        cwd: 'docs/source/',
        src: ['assets/img/**/*', 'assets/js/**/*'],
        dest: 'docs/build/'
      }
    },

    // Copy Javascript to dist and doc
    'concat': {
      options: {
        banner: banner
      },
      dist: {
        files: {
          'dist/js/calcite-web.js': 'lib/js/calcite-web.js'
        }
      },
      doc: {
        files: {
          'docs/source/assets/js/libs/calcite-web.js': 'lib/js/calcite-web.js'
        }
      }
    },

    // Optimize images and icons for dist and doc
    'imagemin': {
      dist: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['img/**/*.{png,jpg,svg,ico}'],
          dest: 'dist/'
        }]
      },
      doc: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['img/**/*.{png,jpg,svg,ico}'],
          dest: 'docs/source/assets/'
        }]
      }
    },

    // Make a zip file of the dist folder
    'compress': {
      main: {
        options: {
          archive: 'calcite-web.zip'
        },
        files: [
          {
            src: ['dist/**'],
            dest: './'
          },
        ]
      }
    },

    // Load AWS credentials from a json file located at aws.json
    'aws': grunt.file.readJSON('aws.json'),

    // Upload dist folder to s3
    'aws_s3': {
      options: {
        accessKeyId: '<%= aws.id %>',
        secretAccessKey: '<%= aws.secret %>',
        region: 'us-west-1',
        bucket: 'patterns.esri.com',
        endpoint: 'https://s3-us-west-1.amazonaws.com',
        access: 'public-read',
        gzip: true
      },
      production: {
        files: [
          // Manually set content type (plugin was setting incorrectly).
          {expand: true, cwd: 'dist/', src: ['**/*.js'],  dest: 'files/calcite-web/' + currentVersion + '/', params: {ContentType: 'application/javascript'}},
          {expand: true, cwd: 'dist/', src: ['**/*.css'], dest: 'files/calcite-web/' + currentVersion + '/', params: {ContentType: 'text/css'}},
          {expand: true, cwd: 'dist/', src: ['**/*.svg'], dest: 'files/calcite-web/' + currentVersion + '/', params: {ContentType: 'image/svg+xml'}},
          {expand: true, cwd: 'dist/', src: ['**/*.ico'], dest: 'files/calcite-web/' + currentVersion + '/', params: {ContentType: 'image/x-icon'}},
          {expand: true, cwd: 'dist/', src: ['**/*.jpg'], dest: 'files/calcite-web/' + currentVersion + '/', params: {ContentType: 'image/jpg'}},
          {expand: true, cwd: 'dist/', src: ['**/*.json'],dest: 'files/calcite-web/' + currentVersion + '/', params: {ContentType: 'application/javascript'}},
          {expand: true, cwd: 'dist/', src: ['**/*.map'], dest: 'files/calcite-web/' + currentVersion + '/', params: {ContentType: 'application/javascript'}}
        ]
      }
    },

    // Ask for GitHub username and password
    'prompt': {
      target: {
        options: {
          questions: [
            {
              config: 'github-release.options.auth.user',
              type: 'input',
              message: 'GitHub username:'
            },
            {
              config: 'github-release.options.auth.password',
              type: 'password',
              message: 'GitHub password:'
            }
          ]
        }
      }
    },

    // Bump the version on GitHub
    'github-release': {
      options: {
        repository: 'Esri/calcite-web',
        release: {
          tag_name: currentVersion,
          name: currentVersion,
          body: description,
          prerelease: true
        }
      },
      files: {
        src: ['calcite-web.zip']
      }
    },

    // Create a JSON record of current documentation
    'exec': {
      deploy: 'node deploy'
    },

    // Deploy doc site to gh-pages
    'gh-pages': {
      options: {
        base: 'docs/build',
        repo: 'https://github.com/Esri/calcite-web.git'
      },
      src: ['**']
    },

    // Runs tasks concurrently, speeding up Grunt
    'concurrent': {
      prepublish: [
        'sass',
        'uglify',
        'copy',
        'concat:dist',
        'newer:imagemin:dist'
      ]
    }

  });

  // load all grunt modules
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // ┌─────────────┐
  // │ Grunt tasks │
  // └─────────────┘

  // Build sass
  grunt.registerTask('sass', [
    'libsass',
    'cssmin'
  ]);

  // Run a development environment
  grunt.registerTask('dev', [
    'acetate:server',
    'newer:imagemin:doc',
    'concat:doc',
    'libsass:doc',
    'copy:doc',
    'watch'
  ]);

  // Test calcite-web.js
  grunt.registerTask('test', [
    'jshint'
  ]);

  // Build a dist folder with all assets
  grunt.registerTask('prepublish', [
    'concurrent:prepublish'
  ]);

  // Build and deploy doc site to github pages
  grunt.registerTask('deploy', 'Deploy documentation to github pages', function(n) {
    if (grunt.option('message')) {
      grunt.config.set('gh-pages.options.message', grunt.option('message'));
    }
    grunt.task.run([
      'acetate:build',
      'newer:imagemin:doc',
      'concat:doc',
      'libsass:doc',
      'copy:doc',
      'exec:deploy',
      'gh-pages'
    ]);
  });

  // Release a new version of the framework
  grunt.registerTask('release', [
    'prompt',
    'prepublish',
    'exec:deploy',
    'compress',
    'github-release',
    'aws_s3'
  ]);

  // Default task starts up a dev environment
  grunt.registerTask('default', ['dev']);

};
