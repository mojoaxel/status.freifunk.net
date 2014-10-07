require.config({
	paths: {
		jQuery: '../../bower_libs/jquery/jquery',
		Underscore: '../../bower_libs/underscore/underscore',
		Backbone: '../../bower_libs/backbone/backbone',
		vis: '../../bower_libs/vis/vis',

		moment: '../../bower_libs/moment/moment',
		Templates: "Templates"
	},
	shim: {
		jQuery: {
			exports: 'jQuery'
		},
		Underscore: {
			exports: '_'
		},
		Backbone: {
			deps: ['jQuery', 'Underscore'],
			exports: 'Backbone'
		},
		vis: {
			deps: ['moment'],
			exports: 'vis'
		}
	},
	config: {
		moment: {
			noGlobal: true
		}
	}
});
