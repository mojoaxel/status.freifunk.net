define(["backbone", "Templates", "vis"],
	function(Backbone, Templates, vis) {

		TimelineWidget = Backbone.View.extend({
			template: JST.TimelineWidget,

			el: "#timeline",

			initialize: function() {
				this.idsFilter = null;
				console.log("TimelineWidget.initialize", this.collection);
				this.collection.bind("reset sync", this.render, this);
			},

			setIdFilter: function(ids) {
				console.log("TimelineWidget.setIdFilter: ", ids);
				this.idsFilter = ids;
			},

			render: function() {
				var idsFilter = this.idsFilter;
				console.log("TimelineWidget.render: ", this.collection.models.length);

				this.$el.empty().html(this.template(this.collection.models));

				var groups = [];
				var events = [];
				_.each(this.collection.models, function(community) {
					var groupId = community.get('id');

					if (idsFilter && _.indexOf(idsFilter, groupId) < 0) {
						return;
					}

					groups.push({
						id: groupId,
						content: community.get('name'),
						className: groupId,
					});

					_.each(community.get('timeline'), function(entry, index) {
						var start = moment.utc(entry.timestamp, ['YYYY-MM-DD', moment.ISO_8601]);
						var api = community.get('api');

						// @see https://github.com/freifunk/api.freifunk.net/commit/33e52f79025520c2ccd78023c7d0865c7be91bfb
						var content = entry.description || entry.decription;

						var url = entry.url;
						if (content && url) {
							// decription and url are availible
							content = '<a href="' + url + '">' + content + '</a>';
						} else if (!content && url) {
							// no decription but a url is availible
							content = '<a href="' + url + '">' + url + '</a>';
						}

						if (!start.isValid()) {
							console.error("Invalid timestamp in " + groupId + ".timeline[" + index + "]: \"" + entry.timestamp + "\"");
						} else if (!content || content.length <= 0) {
							console.error("missing description or url in " + groupId + ".timeline[" + index + "]");
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
