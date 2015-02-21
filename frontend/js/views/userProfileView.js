define(['jquery','underscore','backbone','bootstrap','text!templates/user-profile.html','views/searchListView'],
	function($,_,Backbone,bootstrap,userProfileTemplate,searchListView){
		var userProfileView = Backbone.View.extend({
		el: $("#dashboard"),
		initialize: function(){
			this.$el.html(_.template(userProfileTemplate));
		},
		render: function(){
		}

		});
		
	return userProfileView;
});