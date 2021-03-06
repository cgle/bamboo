require.config({
  baseUrl: "js",
  paths: {
    "jquery": "libs/jquery",
    "underscore": "libs/underscore",
    "backbone": "libs/backbone",
    "d3": "libs/d3",
    "rickshaw": "libs/rickshaw",
    "c3": "libs/c3",
    "bootstrap": "libs/bootstrap",
    "templates": "../templates",
    "dateformat": "libs/dateformat"
    },
    shim: {
      "underscore": {
        deps: [],
        exports: "_"
      },
      "backbone": {
        deps: ["jquery", "underscore"],
        exports: "Backbone"
      },
      "d3": {exports: "d3"},
      "bootstrap": {exports: "bootstrap",deps:["jquery"]},
      "c3": {exports: "c3", deps:["d3"]},
      "dateformat": {exports:"dateformat"},
      "rickshaw": {exports: "Rickshaw",deps:["d3"]},
      }
});

require(['app'],function(App){
  App.initialize();
});

