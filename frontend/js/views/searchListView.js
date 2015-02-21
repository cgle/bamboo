define(['jquery','underscore','backbone','bootstrap','text!templates/search-list.html','views/userProfileView'],
	function($,_,Backbone,bootstrap,searchListTemplate,userProfileView){
		var searchListView = Backbone.View.extend({
		el: $("#dashboard"),
		initialize: function(){
			this.$el.html(_.template(searchListTemplate));
		},
		render: function(){
		}
		});
		
	return searchListView;
});