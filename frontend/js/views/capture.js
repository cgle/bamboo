define(['jquery','underscore','backbone','bootstrap','text!templates/capture.html'],
  function($,_,Backbone,bootstrap,captureTemplate){
    var captureView = Backbone.View.extend({
    el: $("#dashboard"),
    initialize: function(){
      this.$el.html(_.template(captureTemplate));
    },
    render: function(){
    }
    });

  return captureView;
});
