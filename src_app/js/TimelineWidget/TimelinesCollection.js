define(["Backbone", "Settings", "TimelineWidget/TimelineModel"],
	function(Backbone, Settings, TimelineModel) {

		TimelinesCollection = Backbone.Collection.extend({
			model: TimelineModel,
			url: Settings.apiPath + 'Timelines.php'
		});
		return TimelinesCollection;

	}
);
