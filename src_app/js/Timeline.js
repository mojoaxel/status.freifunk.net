define(["marionette"],
	function(Marionette) {

		/* Create the application */
		var Timeline = new Marionette.Application();

		Timeline.on("start", function() {
			console.log("Timeline.onStart");

			require(["vis"], function(vis) {
				// DOM element where the Timeline will be attached
				var container = document.getElementById('timeline');

				var groups = new vis.DataSet([{
					id: 'weimarnetz',
					content: 'weimarnetz',
					className: 'weimarnetz'
				}, {
					id: 'greifswald',
					content: 'Freifunk Greifswald',
					className: 'greifswald',
				}]);

				// Create a DataSet with data (enables two way data binding)
				var items = new vis.DataSet([{
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
				]);

				// Configuration for the Timeline
				var options = {};

				// Create a Timeline
				var timeline = new vis.Timeline(container);
				timeline.setOptions(options);
				timeline.setGroups(groups);
				timeline.setItems(items);
			});

		});
		window.Timeline = Timeline;
		return window.Timeline;
	}
);
