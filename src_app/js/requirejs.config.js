require.config({
	paths: {
		jQuery: '../../bower_libs/jquery/jquery',
		underscore: '../../bower_libs/underscore/underscore',
		backbone: '../../bower_libs/backbone/backbone',
		vis: '../../bower_libs/vis/vis',
		moment: '../../bower_libs/moment/moment',
		bootstrap: '../../bower_libs/bootstrap/js/bootstrap',
		Templates: "Templates"
	},
	shim: {
		jQuery: {
			exports: 'jQuery'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['jQuery', 'underscore'],
			exports: 'backbone'
		},
		vis: {
			deps: ['moment'],
			exports: 'vis'
		},
		bootstrap: {
			deps: ['jQuery'],
			exports: 'jQuery',
		}
	},
	config: {
		moment: {
			noGlobal: true
		}
	}
});
