define(['jquery','underscore','backbone','bootstrap','text!templates/user-profile.html'],
	function($,_,Backbone,bootstrap,userProfileTemplate){
		var userProfileView = Backbone.View.extend({
		el: $("#dashboard"),
		video: [],
		initialize: function(){
			this.$el.html(_.template(userProfileTemplate));
			this.play();
		},
		render: function(){

		},
		play: function() {
			var that = this;
			var socket = io();
			var canvas = document.getElementById('videoCanvas');
			var ctx = canvas.getContext('2d');

			socket.on('stream', function(data) {
				console.log(data);
				var image = new Image();
				image.src = data.data;
				ctx.drawImage(image, 0, 0, 155, 115);
			});
		},
		displayUsersStreams:function(data){
			var that = this;
	},

	});

	return userProfileView;
});
