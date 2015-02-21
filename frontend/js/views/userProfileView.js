define(['jquery','underscore','backbone','bootstrap','text!templates/user-profile.html'],
	function($,_,Backbone,bootstrap,userProfileTemplate){
		var userProfileView = Backbone.View.extend({
		el: $("#dashboard"),
		initialize: function(){
			this.$el.html(_.template(userProfileTemplate));
			this.play();
		},
		render: function(){

		},
		play: function() {
			var socket = io();
			socket.on('broadcasting', function(stream) {

			});
		}

	});

	return userProfileView;
});
