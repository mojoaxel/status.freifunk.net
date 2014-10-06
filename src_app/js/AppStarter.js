require(["Timeline", "backboneRelational", "Settings", "Helper"],

	function(Timeline, backboneRelational, Settings, Helper) {

		/* Enable support for CORS headers.
		 * This is needed to load data from a remote server */
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

			// do not show the API-Errors for other errors (e.g. recommendation app)
			if (settings.suppressErrors) {
				return;
			}

			if (!Dashboard.showedAjaxError) {
				// Bad Request (e.g. parameter missing)
				if (request.status === 400 || request.status === 500 || request.status === 503) {
					if (request.responseJSON) {
						alert("Error loading \"" + request.responseJSON.error.url + "\":  \n" +
							request.responseJSON.error.msg);
					}
				} else if (request.status === 500) {
					if (request.responseJSON) {
						alert("Error loading \"" + request.responseJSON.error.url + "\": \n" +
							"The database query could not be executed: \n" +
							request.responseJSON.error.msg);
					}
				} else if (request.status === 503) {
					if (request.responseJSON) {
						alert("Error loading \"" + request.responseJSON.error.url + "\": \n" +
							"Could not connect to the database server: \n" +
							request.responseJSON.error.msg);
					}
				} else {
					// only show an ajax-error once in every 30 Minutes
					alert("Could not load data from the API. \nPlease check the server-setting.");
				}

				// set a flag, that an error was already shown to the user
				Dashboard.showedAjaxError = true;

				// reset the error flag after 30 seconds
				setTimeout(function() {
					Dashboard.showedAjaxError = false;
				}, 30000);
			}
		});

		Timeline.start();
	}

);
