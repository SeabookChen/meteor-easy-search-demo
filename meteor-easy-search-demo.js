People = new Mongo.Collection('people');
People.initEasySearch('name');

Factory.define('person', People, {
  name: function() { return Fake.word(); },
  age: function() { return _.random(20, 100)},
  sex: function() { return _.random(0,1) === 0 ? 'Male' : 'Female'}
});

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('people')]
  }
});

Router.route('/', {
  name: 'home',
  data: function() {
    return {
      people: People.find()
    }
  }
});

Router.route('/showPerson/:_id', {
  name: 'showPerson',
  data: function() {
    return People.findOne(this.params._id);
  }
});




if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {

    if (People.find().count() === 0) {
      _.times(100, function() {
        Factory.create('person');
      });
    }

  });

  Meteor.publish('people', function() {
    return People.find();
  })
}
