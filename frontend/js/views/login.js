define(['jquery','underscore','backbone','bootstrap','text!templates/login.html','views/userProfileView'],
	function($,_,Backbone,bootstrap,loginTemplate,userProfileView){
		var loginView = Backbone.View.extend({
		el: $("#dashboard"),
		initialize: function(){
			this.render();
		},
		render: function(){
			var that = this;
			this.$el.html(_.template(loginTemplate));
			$('#login-button').on('click', function() {
				that.login($("input#login-username").val());
			});
			$('#register-button').on('click', function() {
				that.register($("input#register-username").val());
			});
		},
		login: function(username) {
			var that = this;
			$.ajax({
				url: '/api/login',
				type: 'post',
				data: {username: username},
				success: function() {
					var newUser = new userProfileView({});
					newUser.render();
				},
				error: function() {
					console.log(error);
				}
			});
		},
		register: function(username) {
			$.ajax({
				url: '/api/register',
				type: 'post',
				data: {username: username},
				success: function(data) {
					console.log(data);
					var newUser = new userProfileView({});
					newUser.render();
				},
				error: function() {
					console.log(error);
				}
			});
		}

		});

	return loginView;
});
