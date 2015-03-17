module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		//watching
		watch: {
		  options: {
		  	// Start another live reload server on port 1336
        	livereload: 1336,
			atBegin: true
		  },
		  js: {
			files: 'jquery.daterangepicker.js',
			tasks: ['development']
		  },
		  css: {
			files: ['*.css'],
			tasks: ['development']
		  }
		},
		//JSHint
		jshint: {
			options: {
				curly: false,
				eqeqeq: false,
				newcap: true,
				noarg: true,
				sub: false,
				undef: true,
				boss: true,
				browser: true,
				multistr: true,
			    globals: {
			        window: true,
			        console: true,
			        moment: true,
			        jQuery: true,
			        define: true,
			        require: true
			    },
			},
			//具体任务配置
			files: {
				src: ['jquery.daterangepicker.js']
			}
		},
		//uglify
		uglify: {
	      	options: {
				separator: "\n",
				stripBanners: true,
				banner: "/*\r\n<%= pkg.name %> - v<%= pkg.version %>\r\n" +
					"Description: <%= pkg.description %>\r\n" +
					//"Author: <%= pkg.author %>\r\n" +
					'Update: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\r\n' +
					"*/\r\n"
			},
			js: {
				files: {
					'dist/js/jquery.daterangepicker.min.js': ['jquery.daterangepicker.js']
				}
			},
		},
		//cssmin
		cssmin: {
	      	options: {
				separator: "\n",
				stripBanners: true,
				banner: "/*\r\n<%= pkg.name %> - v<%= pkg.version %>\r\n" +
					"Description: <%= pkg.description %>\r\n" +
					//"Author: <%= pkg.author %>\r\n" +
					'Update: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\r\n' +
					"*/\r\n"
			},
			target: {
				files: [{
					expand: true,
					cwd: './',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/css',
					ext: '.min.css'
				}]
			}
		}
	});
	//plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	//default task
	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);
	//custom task
	grunt.registerTask('development', ['uglify', 'cssmin']);
	grunt.registerTask('production', [/*'jshint', */'uglify', 'cssmin']);
};