define(["Timeline"],
	function(Timeline) {

		Timeline.settings = {
			apiPath: '../api/'
		};

		/* START-DEVELOPMENT-BLOCK */
		/* ************************************************************************************ */
		/* This block gets removed by grunt-job "strip_code" */

		/**
		 * It is possible to overwrite the apiPath in development mode.
		 * This is usefull if the app should habe access to a remote api-server while developing.
		 */
		//Timeline.settings.apiPath = 'http://192.168.10.107/TGW/api/';

		/* ************************************************************************************ */
		/* END-DEVELOPMENT-BLOCK */

		return Timeline.settings;
	}
);
