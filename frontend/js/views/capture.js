define(['jquery','underscore','backbone','bootstrap','text!templates/capture.html'],
  function($,_,Backbone,bootstrap,captureTemplate){
    var captureView = Backbone.View.extend({
    el: $("#dashboard"),
    // Socket
    socket:null,
    // Elements
    videoElm: $('#live'),
    // Boolean Values
    canStream:false,
    // Variables
    roomID:null,
    roomAccessCode:null,
    userID:null,
    userCount:0,
    selfVideo:null,
    selfStream:null,
    // Arrays
    videoStreams:[],
    events: {
      'click button#capture' : 'capture'
    },
    initialize: function(){
      var socket = io();
      this.$el.html(_.template(captureTemplate));
    },
    render: function(){
    },
    capture: function() {
      var self = this;
      var errorCallback = function(e) {
        console.log('Reeeejected!', e);
      };
      if (navigator.getUserMedia) {
        self.navigator.getUserMedia();
      } else {
        video.src = 'somevideo.webm'; // fallback.
      }
    },
    getUserMedia:function(){
    var _ = this;
    navigator.webkitGetUserMedia({'video':true},function(stream){
      this.canStream = true;
      _.selfStream = stream;
      if (navigator.webkitGetUserMedia) {
        var video =  document.getElementById('self');
        var blobUrl = window.webkitURL.createObjectURL(stream);
            video.src = blobUrl;
            video.controls = false;

            //webkitRequestAnimationFrame(draw);
            setInterval(function(){
              draw();
            },100);

            function draw(){
              var canvas = document.getElementById('selfCanvas');
          var ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, 155, 115);
          var stringData= canvas.toDataURL();
          _.selfVideo = stringData;
          _.socketBroadcastStream(stringData);
          //webkitRequestAnimationFrame(draw);
            }

            // _.selfVideo = blobUrl;
            // _.socketBroadcastStream(blobUrl);
        } else {
          var video = $('#self');
          video.src = stream; // Opera
          video.controls = false;
        }
    },function(err) {
            console.log("Unable to get video stream!");
            this.canStream = false;
        });
        
  },
    
    socketBroadcastStream: function(imageData){
      var self = this;
      self.socket.emit('stream',{data:imageData, room:_.roomID});
    }
    return captureView;
})
};
