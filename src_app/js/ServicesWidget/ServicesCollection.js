define(["backbone", "Settings", "ServicesWidget/ServicesModel"],
	function(Backbone, Settings, ServicesModel) {

		ServicesCollection = Backbone.Collection.extend({
			model: ServicesModel,
			url: Settings.apiPath + 'ffSummarizedDir.php',

			// sorting by name
			comparator: function(entry) {
				return (entry.get('name'));
			},

			parse: function(response) {
				var communities = _.map(response, function(community) {
					//console.log(community);
					if (typeof community.services !== 'undefined') {
						return {
							name: community.name,
							services: community.services
						};
					} else {
						return false;
					}
				});
				return communities;
			}
		});
		return ServicesCollection;

	}
);
