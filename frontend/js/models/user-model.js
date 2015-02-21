define(['jquery','underscore','backbone'],
	function($,_,Backbone){
		var User = Backbone.Model.extend({
			defaults: {
				"username": "";
			},
		});

		var Users = Backbone.Collection.extend({
			

			model: OutreachEvent,
			comparator: function(user){
				return user.get('username');
			}
			// url: "query.json",
			// parse: function(res){
			// 	return res.outreach_events;
			// }
		});

		return {model:User,collection:Users};
	});