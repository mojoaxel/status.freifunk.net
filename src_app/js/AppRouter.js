define(["backbone", "TimelineWidget/TimelinesCollection"],
	function(Backbone, TimelinesCollection) {

		var AppRouter = Backbone.Router.extend({

			//https://github.com/jhudson8/backbone-query-parameters#named-route-parameters
			namedParameters: true,

			routes: {
				"*route": "showWidget"
			},

			initialize: function() {
				console.log("AppRouter.initialize");
				this.timelines = new TimelinesCollection();
				this.widget = new TimelineWidget({
					collection: this.timelines
				});
			},

			showWidget: function(route, params) {
				console.log("AppRouter.showWidget: ", route, params);

				if (params && params.indexOf('ids=') >= 0) {
					var ids = params.split('ids=')[1].split(',');
					if (ids) {
						this.widget.setIdFilter(ids);
					}
				}

				this.timelines.fetch();
			}

		});
		return AppRouter;

	}
);
