module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-contrib-jst");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-strip-code');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-license-bower');
	grunt.loadNpmTasks('grunt-contrib-concat');

	//==========================================================================
	// Development
	grunt.registerTask('dev', [
		'jsbeautifier', // JS Code-Formater
		'jshint', // JS Code-Checker
		'jst', // Generiere eine Template Datei
		'bowercopy', // Kopiert benötigte Inhalte aus externen Bibliotheken in das Zielverzeichnis;
		'concat:dev', // kombiniert css
		'copy:dev', // Kopiere statische Dateien un den Ordner DEVELOPMENT
		'requirejs:dev', // Prüfe Abhängigkeiten und erzeuge JS Datei; Abhängig von copy
		'connect:dev', // Starte Server
		'watch' // Beoabachte Datei-Änderungen und lade die aktuelle Seite neu
	]);

	//==========================================================================
	// Distribution
	grunt.registerTask('dist', [
		'clean', // Lösche Dev und Dist Verzeichnisse
		'jsbeautifier', // JS Code-Formater
		'jshint', // JS Code-Checker
		'jst', // Generiere eine Template Datei
		'license', // Generiere eine Übersicht über alle verwendeten Bibliotheken
		'bowercopy', // Kopiert benötigte Inhalte aus externen Bibliotheken in das Zielverzeichnis;
		'concat:dist', // kombiniert css
		'copy:dist', // Kopiere stitische Dateien un den Ordner DEVELOPMENT
		'requirejs:dist', // Prüfe abhängigkeiten und erzeuge JS Datei
		'strip_code:dist', // Entferne DEBUG-Code
		'uglify', //Minimiere app.js
		'cssmin:dist', //Minimiere css
	]);

	//==========================================================================
	// Deployment
	grunt.registerTask('deploy', [
		'copy:deploy' // Kopiere alle Daten aus DISTRIBUTION auf einen Netzlaufwerk
	]);

	grunt.initConfig({
		target: grunt.file.readJSON('package.json'),

		clean: ['DEVELOPMENT', 'DISTRIBUTION'],

		jsbeautifier: {
			files: ["src_app/**/*.js", "Gruntfile.js"],
			options: {
				js: {
					"indent_with_tabs": true
				}
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				},
				ignores: [
					'src_app/js/Templates.js'
				]
			},
			all: ['src_app/js/**/*.js']
		},

		// compile templates and concatenate them into src_app/js/Templates.js
		jst: {
			compile: {
				options: {
					processName: function(filepath) {
						// return only the Filename without extension
						return filepath.replace(/^.*(\\|\/|\:)/, "").replace(/\..*$/, "");
					}
				},
				files: {
					"src_app/js/Templates.js": ["src_app/js/**/*.htm"]
				}
			}
		},

		//copy vendor contents
		bowercopy: {
			options: {
				clean: false, // Bower components folder will be removed afterwards
			},
			default: {
				options: {
					srcPrefix: 'bower_components',
					destPrefix: 'bower_libs/'
				},
				files: {
					// almond
					'almond/almond.js': 'almond/almond.js',

					// jquery
					'jquery/jquery.js': 'jquery/dist/jquery.js',

					//vis
					'vis/vis.css': 'vis/dist/vis.css',
					'vis/vis.js': 'vis/dist/vis.js',

					// underscore
					'underscore/underscore.js': 'underscore/underscore.js',

					// Backbone
					'backbone/backbone.js': 'backbone/backbone.js',
					'backbone/backbone-relational.js': 'backbone-relational/backbone-relational.js',
					// Marionette
					'marionette/backbone.marionette.js': 'marionette/lib/backbone.marionette.js',

					//Moment
					'moment/moment.js': 'moment/moment.js',
					'moment/locale/': 'moment/locale/'
				}
			}
		},

		concat: {
			options: {
				sourceMap: true
			},
			dev: {
				src: ['bower_libs/**/*.css', 'src_app/css/**/*.css'],
				dest: 'DEVELOPMENT/app/css/app.css',
			},
			dist: {
				src: ['bower_libs/**/*.css', 'src_app/css/**/*.css'],
				dest: 'DISTRIBUTION/app/css/app.css',
			},
		},

		// copy files when using 'grunt dist'
		copy: {
			dev: {
				files: [{
					expand: true,
					cwd: 'src_api/',
					src: ['**'],
					dest: 'DEVELOPMENT/api/'
				}, {
					expand: true,
					cwd: 'src_api/',
					src: ['.htaccess'],
					dest: 'DEVELOPMENT/api/'
				}, {
					expand: true,
					cwd: 'src_app/',
					src: ['index.html'],
					dest: 'DEVELOPMENT/app/'
				}, {
					expand: true,
					cwd: 'src_app/style/img/',
					src: ['**'],
					dest: 'DEVELOPMENT/app/style/img'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src_api/',
					src: ['**'],
					dest: 'DISTRIBUTION/api/'
				}, {
					expand: true,
					cwd: 'src_api/',
					src: ['.htaccess'],
					dest: 'DISTRIBUTION/api/'
				}, {
					expand: true,
					cwd: 'src_app/',
					src: ['index.html'],
					dest: 'DISTRIBUTION/app/'
				}, {
					expand: true,
					cwd: 'src_app/style/img/',
					src: ['**'],
					dest: 'DISTRIBUTION/app/style/img'
				}]
			}
		},

		// All options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
		requirejs: {
			dev: {
				options: {
					baseUrl: "src_app/js/",
					name: '../../bower_components/almond/almond',
					include: ['TimelineApp'],
					insertRequire: ['TimelineApp'],
					mainConfigFile: 'src_app/js/requirejs.config.js',
					out: 'DEVELOPMENT/app/js/app.js',
					wrap: true,
					findNestedDependencies: true,
					preserveLicenseComments: true,
					generateSourceMaps: true,
					optimize: "none"
				}
			},
			dist: {
				options: {
					baseUrl: "src_app/js/",
					name: '../../bower_components/almond/almond',
					include: ['TimelineApp'],
					insertRequire: ['TimelineApp'],
					mainConfigFile: 'src_app/js/requirejs.config.js',
					out: 'DISTRIBUTION/app/js/app.js',
					wrap: false,
					findNestedDependencies: true,
					preserveLicenseComments: true,
					generateSourceMaps: false,
					optimize: "none" //is done by an extra job
				}
			}
		},

		strip_code: {
			options: {
				start_comment: 'START-DEVELOPMENT-BLOCK',
				end_comment: 'END-DEVELOPMENT-BLOCK',
			},
			dist: {
				files: [{
					src: 'DISTRIBUTION/app/js/app.js',
					dest: 'DISTRIBUTION/app/js/app.js'
				}],
			}
		},

		// minimize  javascript
		uglify: {
			options: {
				compress: {
					drop_console: true
				}
			},
			all: {
				files: {
					'DISTRIBUTION/app/js/app.js': ['DISTRIBUTION/app/js/app.js']
				}
			}
		},

		cssmin: {
			dist: {
				files: {
					'DISTRIBUTION/app/css/app.css': ['DISTRIBUTION/app/css/app.css']
				}
			}
		},

		license: {
			dist: {
				output: 'LICENSES.json'
			},
		},

		// start local development server
		connect: {
			dev: {
				options: {
					base: "DEVELOPMENT/",
					port: 8000,
					hostname: '*',
					livereload: true,
					middleware: function(connect, options) {
						return [
							connect.static(options.base[0], {
								index: 'index.html'
							})
						];
					}
				}
			}
		},

		// watch file changes
		watch: {
			options: {
				livereload: true
			},
			index: {
				files: "src_app/index.html",
				tasks: ['copy:dev'],
				options: {
					livereload: true
				}
			},
			assets: {
				files: "src_app/style/images/**",
				tasks: ['copy:dev'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: "src_app/style/**/*.less",
				tasks: ['less:dev'],
				options: {
					livereload: true
				}
			},
			scripts: {
				files: 'src_app/js/**/*.js',
				tasks: ['jsbeautifier', 'jshint', 'requirejs:dev', 'copy:dev'],
				options: {
					livereload: true,
				}
			},
			templates: {
				files: ['src_app/**/*.htm'],
				tasks: ['jst', 'requirejs:dev', 'copy:dev'],
				options: {
					livereload: true
				}
			}
		}

	});
};
