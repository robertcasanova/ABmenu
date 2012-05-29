(function($){
	var ABmenu = {}
		ABmenu.View = {},
		ABmenu.Model = {},
		ABmenu.Collection = {};

	ABmenu.mainRoute = Backbone.Router.extend({
		  routes: {
		    "login": "login",
		    "logout" : "logout",
		    "venues": "venues"    // #/login
		  },

		  login: function() {
		  	new ABmenu.View.login();
		  },
		  logout: function() {
		  	new ABmenu.View.logout();
		  },
		  venues: function() {
		  	var venues = new ABmenu.Collection.venues();

		  	var view = new ABmenu.View.venues({'collection': venues });

		  	venues.fetch({success: function(collection,response) {
		  		view.render(response);
		  	}, error: function(){alert('error')}});
		  	
			

		  	
		  },

		  search: function(query, page) {

		  }

	});

	/* VIEWS */
	ABmenu.View.login = Backbone.View.extend({
		el: $('.main'),
		initialize: function(){
			this.template = _.template($('#tmpl-login').html());
			this.render();
		},
		render: function() {
			var data = {};
			data.title="Login";
			$(this.el).html(this.template(data));
    		return this;
		}

	})
	ABmenu.View.logout = Backbone.View.extend({
		el: $('.main'),
		initialize: function(){
			this.render();
		},
		render: function() {
			$(this.el).html("<h1>Logout</h1>");
    		return this;
		}

	})
	ABmenu.View.venues = Backbone.View.extend({
		el:$('.main'),
		initialize: function(){
			this.template = _.template($('#tmpl-venues').html());
		},
		render: function(response) {
			$(this.el).html(this.template(response));
			//$(this.el).html(this.template(this.collection.toJSON()));
    		return this;
		}
	});


	/* MODEL */

	ABmenu.Model.venue = Backbone.Model.extend({
		defaults: {
			'name': 'emptyName'
		}
	})
	ABmenu.Collection.venues = Backbone.Collection.extend({
		model: ABmenu.venue,
		url: '/api/venues.json',
		parse: function(response){
		}
	})



	$(document).ready(function(){
	 	new ABmenu.mainRoute();
	 	Backbone.history.start();

	})		

})(jQuery)


