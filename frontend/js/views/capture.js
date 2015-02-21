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
    stream:null,
    // Arrays
    videoStreams:[],
    events: {
      'click button#capture' : 'capture',
      'click button#stop' : 'stop',
    },
    initialize: function(){
      this.socket = io();
      this.$el.html(_.template(captureTemplate));
    },
    render: function(){
    },
    capture: function() {
      var self = this;
      var errorCallback = function(e) {
        console.log('Reeeejected!', e);
      };
      if (self.getUserMedia) {
        self.getUserMedia();
      } else {
        video.src = 'somevideo.webm'; // fallback.
      }
    },
    getUserMedia:function(){
    var that = this;
    navigator.webkitGetUserMedia({'video':true},function(stream){
      this.canStream = true;
      that.selfStream = stream;
      this.stream = stream;
      if (navigator.webkitGetUserMedia) {
        var video =  document.getElementById('basic-stream');
        var blobUrl = window.URL.createObjectURL(stream);
            video.src = blobUrl;
            video.controls = false;

            //webkitRequestAnimationFrame(draw);
            setInterval(function(){
              draw();
            },1);

            function draw(){
              var canvas = document.getElementById('selfCanvas');
          var ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0);
          var stringData= canvas.toDataURL();
          that.selfVideo = stringData;
          that.socketBroadcastStream(stringData);
          //webkitRequestAnimationFrame(draw);
            }

            // that.selfVideo = blobUrl;
            // that.socketBroadcastStream(blobUrl);
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
      displayUsersStreams:function(){
    var that = this;
    $.each(that.videoStreams,function(index, videoStream){
      //console.log('stream:', videoStream.stream);
      var friendVideo = $('#friend');
      friendVideo.attr('src',videoStream.stream);
      //console.log(friendVideo);
      setInterval(function(){
      //  console.log(friendVideo);
      },100);
    });
  },

  drawToCanvas:function(){
    console.log('variable_or_string');

    var that = this;
    var video = document.getElementById('self');
    var canvas = document.getElementById('selfCanvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 155, 115);
    webkitRequestAnimationFrame(that.drawToCanvas);

  },

  requestingStreams:function(userID){
    var that = this;
    console.log(userID+' requested stream');
    that.socket.emit('sendingVideoStream', { video:that.selfVideo, requestedUser:userID, room:that.roomID });
  },

  // Socket Methods
  socketBroadcastStream:function(imageData){
    var that = this;
    that.socket.emit('stream',{data:imageData});
  },
  socketStoreStreams:function(data){
    var that = this;
    that.videoStreams.push(data);
    // console.log(that.videoStreams);
  },
  stop: function(){
    this.selfStream.stop();
  }
});
  return captureView;
});
