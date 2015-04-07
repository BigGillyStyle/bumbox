/*
  In this step, you will add a total duration and song count for an album.

  If you look at the listing for an album, you'll see that each song
  has a duration in seconds. We'd like to automatically compute the
  duration of an album by summing the duration of each of its songs.

  You'll do this using a computed property on the Album subclass you defined in
  Step 8.

  To make sure that the computed property updates appropriately,
  you'll need to define its dependent key. Make sure you understand the
  @each dependent key.
*/

import { test } from 'ember-qunit';
import { exists, contentOf } from '../helpers/assertions';
import lookup from '../helpers/lookup';
import step from '../helpers/step';
import Ember from 'ember';
import resolver from '../helpers/resolver';

var App;
step(8, "Total duration and song count", {
  setup: function(app) {
    App = app;
  }
});

test("An Album correctly calculates totalDuration", function() {
  var store = lookup(App, 'store:main'),
      album;

  Ember.run(function() {
    album = store.createRecord('album');

    album.get('songs').pushObjects([
      store.createRecord('song', { duration: 10 }),
      store.createRecord('song', { duration: 120 }),
      store.createRecord('song', { duration: 234 })
    ]);
  });

  equal(album.get('totalDuration'), 364, "total duration is the sum of the song durations");

  Ember.run(function() {
    album.get('songs').createRecord({duration: 25});
  });

  equal(album.get('totalDuration'), 389, "total duration is updated when a new song is added");

  Ember.run(function() {
    album.get('songs').get('firstObject').set('duration', 20);
  });

  equal(album.get('totalDuration'), 399, "total duration is updated when a song's duration is changed");

  Ember.run(function() {
    album.get('songs').popObject();
  });

  equal(album.get('totalDuration'), 374, "total duration is updated when a song is removed");
});

test("The total duration is displayed", function() {
  visit('/album/1');

  andThen(function() {
    equal(contentOf('.total-duration'), 'Total Time: 26:27');
  });
});

test("An Album correctly calculates songCount", function() {
  var store = lookup(App, 'store:main'),
      album;

  Ember.run(function() {
    album = store.createRecord('album');

    album.get('songs').pushObjects([
      store.createRecord('song'),
      store.createRecord('song'),
    ]);
  });

  equal(album.get('songCount'), 2, "adding songs increases the songCount");

  Ember.run(function() {
    album.get('songs').popObject();
  });

  equal(album.get('songCount'), 1, "removing a song decreases the songCount");
});

test("The correct song count for albums is displayed", function() {
  visit('/');

  andThen(function() {
    equal(contentOf('.song-count:first'), '4 songs', "The first album's song count is correct");
  });
});
