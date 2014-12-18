Persons = new Mongo.Collection('persons');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.registerHelper('personsCount', function() {
    return Persons.find().count();
  });

  Template.home.rendered = function() {
    console.log('home persons: ', Persons.find().count())
  }

  Template.persons.rendered = function() {
    console.log('persons persons: ', Persons.find().count())
  }

  Template.search.rendered = function() {
    console.log('search persons: ', Persons.find({ age: { $lt: 200 } }, { sort: { age: 1 }}).count())
  }

  Template.search.helpers({
    personsCount: function() {
      return Persons.find().count();
    },
    personsClientFilterCount: function() {
      return Persons.find({ age: { $lt: 200 } }, { sort: { age: 1 }}).count();
    },
    persons: function() {
      return Persons.find({ age: { $lt: 200 } }, { sort: { age: 1 }});
    }
  });

  Template.personsList.helpers({
    persons: function() {
      //if there are persons from parent template, use it
      if (this.persons) {
        return this.persons;
      }
      return Persons.find({}, { sort: { age: 1 }});
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('persons', function(limit) {
    options = {
      sort: { age: 1 }
    };
    if (limit) {
      options.limit = limit;
    }
    var persons = Persons.find({}, options);
    console.log('publishing persons: options: ', options);
    console.log('publishing persons: ', persons.count());
    return persons;
  });

  Meteor.startup(function () {
    if (Persons.find().count() === 0) {
      for (var i = 0; i <= 3000; i++) {
        Persons.insert({
          firstName: 'firstname ' + i,
          lastName: 'lastname ' + i,
          age: i,
          address: {
            street: 'street ' + i,
            city: 'city ' + i,
            zip: 'zip ' + i
          }
        });
      }
    }
    //Persons.remove({});
  });
}
