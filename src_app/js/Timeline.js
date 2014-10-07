define(["marionette", "moment"],
	function(Marionette, moment) {

		/* Create the application */
		var Timeline = new Marionette.Application();

		Timeline.on("start", function() {
			console.log("Timeline.onStart");

			require(["vis"], function(vis) {
				var groups = [{
					id: 'weimarnetz',
					content: 'weimarnetz',
					className: 'weimarnetz'
				}, {
					id: 'greifswald',
					content: 'Freifunk Greifswald',
					className: 'greifswald',
				}];

				// Create a DataSet with data (enables two way data binding)
				var events = [{
						id: 'weimarnetz_000',
						content: "Initialz\u00fcndung",
						start: "2001-07-08T00",
						group: 'weimarnetz'
					}, {
						id: 'weimarnetz_001',
						content: "Gr\u00fcndung Weimarnetz e.V.",
						start: "2005-05-31T00",
						group: 'weimarnetz'
					}, {
						id: 'weimarnetz_002',
						content: "Weimarnetz e.V. anerkannt gemeinn\u00fctzig",
						start: "2011-11-15T00",
						group: 'weimarnetz'
					},

					{
						id: 'greifswald_000',
						content: "Birth",
						start: "2011-08-28",
						group: 'greifswald'
					}, {
						id: 'greifswald_001',
						content: "Rebirth",
						start: "2014-06-19",
						group: 'greifswald'
					}, {
						id: 'greifswald_002',
						content: "eigenes Gateway",
						start: "2014-09-12",
						group: 'greifswald'
					}
				];

				//change all start-dates into moment-objects
				events = _.each(events, function(event) {
					event.start = moment.utc(event.start, ['YYYY-MM-DD', moment.ISO_8601]);
					return event;
				});

				//get only the dates for min/max calulation
				var dates = _.pluck(events, 'start');
				var minDate = new Date(moment.min(dates).clone().subtract(1, 'year').year() + "-01-01");
				var maxDate = new Date(moment.max(dates).clone().add(3, 'year').year() + "-12-31");

				var ONEYEAR = 1000 * 60 * 60 * 24 * 365; //one year in ms
				// Configuration for the Timeline
				var options = {
					orientation: 'top',
					showCurrentTime: false,
					type: 'point',
					min: minDate,
					max: maxDate,
					zoomMin: ONEYEAR, //one year
					zoomMax: ONEYEAR * 50, //50 years 
				};

				// DOM element where the Timeline will be attached
				var container = document.getElementById('timeline');

				// Create a Timeline
				console.log("creating timeline");
				var timeline = new vis.Timeline(container, new vis.DataSet(events), options);
				timeline.setGroups(new vis.DataSet(groups));
			});

		});
		window.Timeline = Timeline;
		return window.Timeline;
	}
);
