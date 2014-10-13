require.config({
	paths: {
		jQuery: '../../bower_libs/jquery/jquery',
		underscore: '../../bower_libs/underscore/underscore',
		backbone: '../../bower_libs/backbone/backbone',
		vis: '../../bower_libs/vis/vis',

		moment: '../../bower_libs/moment/moment',
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
		}
	},
	config: {
		moment: {
			noGlobal: true
		}
	}
});
