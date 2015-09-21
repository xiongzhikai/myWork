module.exports = function(grunt) {


 
  // Project configuration.
  grunt.initConfig({
  
  	shell  : {
  		options: {
            stderr: false
        },
        target: {
            command: 'node main.js'
        }
  	},

    htmlmin: {                                     // Task 
	    dist: {                                      // Target 
	      options: {                                 // Target options 
	        collapseWhitespace: true
	      },
	      files: {                                   // Dictionary of files 
	        'dist/index.html': 'src/index.html'     // 'destination': 'source'
	      }
	    }
	},
	cssmin: {
	  target: {
	    files: [{
	      expand: true,
	      cwd: 'src/css',
	      src: ['*.css', '!*.min.css'],
	      dest: 'dist/css',
	      ext: '.min.css'
	    }]
	  }
	},
	  uglify: {
		  my_target: {
			  files: {
				  'dist/js/ua.min.js': ['src/js/ua.js']
			  }
		  }
	  }
  });

	grunt.task.registerTask('merge', 'A sample task that logs stuff.', function() {
		var css = grunt.file.read('dist/css/main.min.css');
		var js = grunt.file.read('dist/js/ua.min.js');
		var html = grunt.file.read('dist/index.html');
		var cssArr = html.split('<!--replace main.css-->');
		cssArr[1] = '<style rel="stylesheet">'+css+'</style>';
		html = cssArr.join('<!--replace main.css-->');
		var jsArr = html.split('<!--replace ua.js-->');
		jsArr[1] = '<script >'+js+'</script>';
		html = jsArr.join('<!--replace ua.js-->');

		grunt.file.write('dist/index.html', html);
		grunt.file.delete('dist/css');
		grunt.file.delete('dist/js');
	});
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // 默认被执行的任务列表。
  grunt.registerTask('test', ['shell']);
  grunt.registerTask('product', ['shell', 'cssmin','uglify','htmlmin', 'merge']);
};