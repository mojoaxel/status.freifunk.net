define(["backbone", "Settings", "AppRouter", "TimelineWidget/TimelinesCollection", "TimelineWidget/TimelineWidget"],

	function(Backbone, Settings, AppRouter, TimelinesCollection, TimelineWidget) {

		/* 
		 * Enable support for CORS headers.
		 * This is needed to load data from a remote server
		 */
		Backbone.$.support.cors = true;

		/*
		 * set global AJAX timeout in milliseconds
		 */
		$.ajaxSetup({
			timeout: 20000 //TODO set lower
		});

		/*
		 * set global AJAX error handler
		 */
		$(document).ajaxError(function(event, request, settings, thrownError) {
			console.error("AJAX-ERROR: " + thrownError + ": ", settings);
		});

		/* Create the application */
		var appRouter = new AppRouter();

		Backbone.history.start({
			pushState: false
		});

		/*
		appRouter.navigate("app", {
			trigger: true
		});
		*/

		return appRouter;
	}
);
