define(["backbone"],
	function(Backbone) {

		TimelineModel = Backbone.Model.extend({
			defaults: {
				id: null,
				name: null,
				timeline: null
			}
		});
		return TimelineModel;

	}
);
