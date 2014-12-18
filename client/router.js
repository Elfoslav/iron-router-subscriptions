Router.route('/', {
  name: 'home',
  // this template will be rendered until the subscriptions are ready
  loadingTemplate: 'loading',

  waitOn: function () {
    // return one handle, a function, or an array
    return Meteor.subscribe('persons', 5);
  },

  action: function () {
    this.render('home');
  }
});

Router.route('/persons', {
  // this template will be rendered until the subscriptions are ready
  loadingTemplate: 'loading',

  waitOn: function () {
    // return one handle, a function, or an array
    return Meteor.subscribe('persons', 2000);
  },

  action: function () {
    this.render('persons');
  }
});

Router.route('/search', {
  // this template will be rendered until the subscriptions are ready
  loadingTemplate: 'loading',

  waitOn: function () {
    // return one handle, a function, or an array
    return Meteor.subscribe('persons', 7);
  },

  action: function () {
    this.render('search');
  }
});

Router.configure({
  layoutTemplate: 'layout'
});