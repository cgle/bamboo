define(['jquery','underscore','backbone','bootstrap','text!templates/login.html','views/userProfileView'],
	function($,_,Backbone,bootstrap,loginTemplate,userProfileView){
		var loginView = Backbone.View.extend({
		el: $("#container"),
		initialize: function(){
			this.$el.html(_.template(loginTemplate));
		},
		render: function(){
		}

		});
		
	return loginView;
});