define(function(require, exports, module) {

  // External dependencies.
  var Backbone = require("backbone");

  // Defining the application router.
  var Router = Backbone.Router.extend({
    routes: {
      "/": "index.html"
    },

    index: function() {
      console.log("Welcome to your / route.");
    }
  });

  module.exports = Router;
});
