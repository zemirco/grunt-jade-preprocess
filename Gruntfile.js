
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // remove old deployments
    clean: ['deploy'],
    
    // copy everything but the js folder
    copy: {
      main: {
        files: [
          {src: 'public/images/*', dest: 'deploy/'},
          {src: 'public/stylesheets/*', dest: 'deploy/'},
          {src: 'routes/*', dest: 'deploy/'},
          {src: 'views/*', dest: 'deploy/'},
          {src: 'app.js', dest: 'deploy/app.js'},
          {src: 'package.json', dest: 'deploy/package.json'}
        ]
      }
    },
    
    // concat, unglify and move js
    uglify: {
      'deploy/public/javascripts/script.min.js': [
        'public/javascripts/script1.js',
        'public/javascripts/script2.js',
        'public/javascripts/script3.js'
      ]
    },
    
    // replace js src in jade file
    preprocess: {
      inline: {
        src: ['deploy/views/layout.jade'],
        options: {
          inline: true
        }
      },
      
      // working with a false deployment folder
      // this is just for demo - do not use
      prod: {
        src: ['deploy/views/layout-wrong.jade'],
        options: {
          inline: true,
          context: {
            production: true
          }
        }
      },
      
      // working with a false development folder
      // this is just for demo - do not use
      dev: {
        src: ['deploy/views/layout-wrong.jade'],
        options: {
          inline: true,
          context: {
            production: false
          }
        }
      }
    },
    
    // usemin for html file
    useminPrepare: {
      html: ['deploy/views/example.html']
    },
    usemin: {
      html: ['deploy/views/example.html']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');


  // Default task(s).
  grunt.registerTask('deploy', ['clean', 'copy', 'uglify', 'preprocess:inline']);
  grunt.registerTask('prepDev', 'preprocess:dev');
  grunt.registerTask('prepProd', 'preprocess:prod');

};