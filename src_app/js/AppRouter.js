define(["Backbone", "TimelineWidget/TimelinesCollection"],
	function(Backbone, TimelinesCollection) {

		var AppRouter = Backbone.Router.extend({

			routes: {
				"*path": "showWidget"
			},

			initialize: function() {
				console.log("AppRouter.initialize");
				this.timelines = new TimelinesCollection();
				this.widget = new TimelineWidget({
					collection: this.timelines
				});
			},

			showWidget: function(param) {
				var that = this;
				console.log("AppRouter.showWidget: ", param);
				this.timelines.fetch();
			}

		});
		return AppRouter;

	}
);
