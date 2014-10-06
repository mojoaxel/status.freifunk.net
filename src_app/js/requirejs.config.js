require.config({
	paths: {
		jquery: '../../bower_libs/jquery/jquery',
		underscore: '../../bower_libs/underscore/underscore',
		backbone: '../../bower_libs/backbone/backbone',
		backboneRelational: '../../bower_libs/backbone/backbone-relational',
		marionette: '../../bower_libs/marionette/backbone.marionette',
		moment: '../../bower_libs/moment/moment',
		vis: '../../bower_libs/vis/vis',
		templates: "Templates"
	},
	shim: {
		jquery: {
			exports: 'jQuery'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		backboneRelational: {
			deps: ['backbone'],
			exports: 'Backbone'
		},
		marionette: {
			deps: ['backbone'],
			exports: 'Marionette'
		},
		vis: {
			deps: ['moment'],
			exports: 'vis'
		},
		templates: {
			exports: 'Templates'
		}
	},
	config: {
		moment: {
			noGlobal: true
		}
	}
});
