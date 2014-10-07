define(["Backbone", "Templates", "vis"],
	function(Backbone, Templates, vis) {

		TimelineWidget = Backbone.View.extend({
			template: JST.TimelineWidget,

			el: "#timeline",

			initialize: function() {
				console.log("TimelineWidget.initialize", this.collection);
				this.collection.bind("reset sync", this.render, this);
			},

			render: function() {
				console.log("TimelineWidget.render: ", this.collection.models.length);

				this.$el.empty().html(this.template(this.collection.models));

				var groups = [];
				var events = [];
				_.each(this.collection.models, function(community) {
					var groupId = community.get('id');
					groups.push({
						id: groupId,
						content: community.get('name'),
						className: groupId,
					});

					_.each(community.get('timeline'), function(entry, index) {
						var start = moment.utc(entry.timestamp, ['YYYY-MM-DD', moment.ISO_8601]);
						var content = entry.decription; //FIXME changes in 0.4.4

						if (!start.isValid()) {
							console.error("Invalid timestamp in " + groupId + ".timeline[" + index + "]: \"" + entry.timestamp + "\"");
						} else if (!content || content.length <= 0) {
							console.error("missing description in " + groupId + ".timeline[" + index + "]");
						} else {
							events.push({
								id: groupId + '_' + index,
								content: content,
								start: start,
								group: groupId
							});
						}
					});
				});

				//get only the dates for min/max calulation
				var dates = _.pluck(events, 'start');
				var minDate = new Date(moment.min(dates).clone().subtract(1, 'year').year() + "-01-01");
				var maxDate = new Date(moment.max(dates).clone().add(2, 'year').year() + "-12-31");

				var ONEMONTH = 1000 * 60 * 60 * 24 * 31; //one month in ms
				// Configuration for the Timeline
				var options = {
					orientation: 'top',
					showCurrentTime: false,
					type: 'point',
					stack: true,
					min: minDate,
					max: maxDate,
					zoomMin: ONEMONTH, //one month
					zoomMax: ONEMONTH * 12 * 50, //50 years 
				};

				// DOM element where the Timeline will be attached
				var container = document.getElementById('timelineWidget');

				$(container).empty();

				// Create a Timeline
				console.log("creating timeline");
				var timeline = new vis.Timeline(container, new vis.DataSet(events), options);
				timeline.setGroups(new vis.DataSet(groups));

				return this;
			}
		});
		return TimelineWidget;

	});
