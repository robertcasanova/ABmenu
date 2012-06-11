(function($){
	var ABmenu = {
		init: function() {

			new ABmenu.Router.mainRoute();
	 		Backbone.history.start();

		},
		View : {},
		Model : {},
		Collection : {},
		Router : {}
	}
	

	ABmenu.Router.mainRoute = Backbone.Router.extend({
		  routes: {
		    "login": "login",
		    "logout" : "logout",
		    "ristoranti": "ristoranti",
		  },

		  initialize: function() {

		  	this.login  = new ABmenu.View.login();
		  	this.logout = new ABmenu.View.logout();
		  	this.ristoranti = new ABmenu.View.ristoranti();
		  	//
		  },

		  login: function() {

		  	$('.main').html(this.login.render().el);

		  },
		  logout: function() {

		  	$('.main').html(this.logout.render().el);

		  },
		  ristoranti: function() {

			$('.main').html(this.ristoranti.render().el);
		  			  	
		  }

	});

	/* VIEWS */
	ABmenu.View.login = Backbone.View.extend({
		tagName: 'div',
		className: 'login',
		template: _.template($('#tmpl-login').html()),
		initialize: function(){

		},
		render: function() {
			var data = {};
			data.title="Login";
			this.$el.html(this.template(data));

    		return this;
		}

	})
	ABmenu.View.logout = Backbone.View.extend({
		tagName: 'div',
		className: 'logout',
		template: _.template($('#tmpl-logout').html()),
		initialize: function(){

		},
		render: function() {
			this.$el.html(this.template());
    		return this;
		}

	})
	ABmenu.View.ristoranti = Backbone.View.extend({
		tagName: 'div',
		className: 'ristoranti',
		events: {
			'click .load-foursquare' : 'loadFoursquare',
			'click .venues li' : 'changeTitle'
		},
		template: _.template($('#tmpl-ristoranti').html()),
		initialize: function(){
		  	this.venues = new ABmenu.Collection.venues();
			this.venues_view = new ABmenu.View.venues({collection: this.venues});
			this.venues.fetch();
		},
		render: function() {
			this.$el.html(this.template());
			this.$el.find('.list').append(this.venues_view.render().el);
    		return this;
		},
		loadFoursquare: function(e) {
			e.preventDefault();
			this.venues.url = e.currentTarget.href;
			this.venues.fetch();

		},
		changeTitle: function(e) {
			var venue = this.venues.find(function(venue) {
					return venue.get('id') == $(e.currentTarget).data('id')
			});
			venue.set({name:'It works'});
			venue.save();
		}

	})
	 

	ABmenu.View.venues = Backbone.View.extend({ //view collegate al model
		tagName: 'ul',
		className: 'venues',
		initialize: function(){
			_.bindAll(this, 'render');
			this.collection.on('reset',this.render);
		},
		render: function() {
			this.$el.empty();
			_.each(this.collection.models,function(venue){
				this.$el.append(new ABmenu.View.venue({model: venue}).render().$el);
			},this);
    		return this;
		}
	});
	ABmenu.View.venue = Backbone.View.extend({ //view collegate al model
		tagName: 'li',
		template: _.template($('#tmpl-venue').html()),
		initialize: function(){
			_.bindAll(this, 'render');
      		this.model.on('change', this.render);
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
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
		url: 'api/venues.json',
		initialize: function() {
		},
	})



	$(document).ready(function(){
	 	ABmenu.init();

	})		

})(Zepto)


