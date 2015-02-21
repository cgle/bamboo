define(['jquery','underscore','backbone','views/searchListView'],
	function($,_,Backbone, searchListView){
		var AppRouter = Backbone.Router.extend({
			routes: {
				"/": "home",
				// "*actions": "defaultAction"
				"search" : "searchList"
			}

		});

		var initialize = function() {
			var app_router = new AppRouter();
			// app_router.on("route:defaultAction", function(actions){
			// 	var dashboard = new eventListView();
			// 	dashboard.render();
			// });
			app_router.on('route:searchList', function(){
				var dashboard = new searchListView();
				dashboard.render();
			})

			Backbone.history.start();
		}

		return {initialize:initialize};
	});	