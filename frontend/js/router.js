define(['jquery','underscore','backbone','views/searchListView', 'views/userProfileView', 'views/login', 'views/capture'],
	function($,_,Backbone, searchListView,userProfileView, login, capture){
		var AppRouter = Backbone.Router.extend({
			routes: {
				"": "loginView",
				"search" : "searchList",
				"user/:id" : "userProfile",
				"login" : "loginView",
				"capture": "captureView"
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
			});
			app_router.on('route:captureView', function(){
				var dashboard = new capture();
				dashboard.render();
			});

			Backbone.history.start();
		}

		return {initialize:initialize};
	});
