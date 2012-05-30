(function($){
	var ABmenu = {}
		ABmenu.View = {},
		ABmenu.Model = {},
		ABmenu.Collection = {};

	ABmenu.mainRoute = Backbone.Router.extend({
		  routes: {
		    "login": "login",
		    "logout" : "logout",
		    "venues": "venues"    
		  },

		  login: function() {
		  	new ABmenu.View.login();
		  },
		  logout: function() {
		  	new ABmenu.View.logout();
		  },
		  venues: function() {

			this.venues = new ABmenu.Collection.venues();
			this.venues_view = new ABmenu.View.venues({model: this.venues});
		  	this.venues.fetch();
		  	$('.main').html(this.venues_view.render().el);
			

		  	
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
		tagName: 'ul',
		template: _.template($('#tmpl-venues').html()),
		initialize: function(){
			this.model.bind("reset", this.render, this);
		},
		render: function() {
			_.each(this.model.models,function(venue){
				$(this.el).append(new ABmenu.View.venue({model: venue}).render().el)
			},this);
    		return this;
		}
	});
	ABmenu.View.venue = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#tmpl-venue').html()),
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
	})


	/* MODEL */

	ABmenu.Model.venue = Backbone.Model.extend({
		defaults: {
			'name': 'emptyName',
			'geoLocationLat' :0 ,
			'geoLocationLon' :0
		}
	})
	ABmenu.Collection.venues = Backbone.Collection.extend({
		model: ABmenu.Model.venue,
		url: 'api/venues.json'
	})



	$(document).ready(function(){
	 	new ABmenu.mainRoute();
	 	Backbone.history.start();

	})		

})(jQuery)


