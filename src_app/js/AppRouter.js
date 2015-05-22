define(["backbone",
		"TimelineWidget/TimelinesCollection",
		"TimelineWidget/TimelineWidget",
		"ServicesWidget/ServicesCollection",
		"ServicesWidget/ServicesWidget"
	],
	function(Backbone,
		TimelinesCollection,
		TimelineWidget,
		ServicesCollection,
		ServicesWidget) {

		var AppRouter = Backbone.Router.extend({

			//https://github.com/jhudson8/backbone-query-parameters#named-route-parameters
			namedParameters: true,

			routes: {
				"*route": "showWidget"
			},

			initialize: function() {
				console.log("AppRouter.initialize");
			},

			showWidget: function(route, params) {
				console.log("AppRouter.showWidget: ", route, params);

				if (route === "timeline") {
					if (!this.timelines) {
						this.timelines = new TimelinesCollection();
						this.timelineWidget = new TimelineWidget({
							collection: this.timelines
						});
						this.timelines.fetch();
					}

					if (params && params.indexOf('ids=') >= 0) {
						var ids = params.split('ids=')[1].split(',');
						if (ids) {
							this.timelineWidget.setIdFilter(ids);
						}
					}
					this.timelineWidget.render();
				} else /*if (route === "services")*/ {
					if (!this.services) {
						this.services = new ServicesCollection();
						this.servicesWidget = new ServicesWidget({
							collection: this.services
						});
						this.services.fetch();
					}
					this.servicesWidget.render();
				}

			}

		});
		return AppRouter;

	}
);
