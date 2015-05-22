define(["backbone", "Templates", "vis"],
	function(Backbone, Templates, vis) {

		ServicesWidget = Backbone.View.extend({
			template: JST.ServicesWidget,

			el: "#widget",

			initialize: function() {
				console.log("ServicesWidget.initialize", this.collection);
				this.collection.bind("reset sync", this.render, this);
			},

			render: function() {
				var widget = this;
				console.log("ServicesWidget.render");
				widget.$el.empty();
				_.each(widget.collection.models, function(model) {
					var modelHtml = widget.template(model.toJSON());
					widget.$el.append($(modelHtml));
				});
				return widget;
			}
		});
		return ServicesWidget;

	});
