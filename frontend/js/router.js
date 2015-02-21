define(['jquery','underscore','backbone','views/searchListView', 'views/userProfileView', 'views/login'],
	function($,_,Backbone, searchListView,userProfileView, login){
		var AppRouter = Backbone.Router.extend({
			routes: {
				"/": "home",
				// "*actions": "defaultAction"
				"search" : "searchList",
				"user/:id" : "userProfile",
				"login" : "loginView"
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
			});
			app_router.on('route:userProfile', function(id){
				var dashboard = new userProfileView();
				dashboard.render();
			});
			app_router.on('route:loginView', function(){
				var dashboard = new login();
				dashboard.render();
			})

			Backbone.history.start();
		}

		return {initialize:initialize};
	});	