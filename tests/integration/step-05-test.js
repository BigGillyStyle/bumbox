/*
 In this step, we'll replace our fixture data with data from our server and Ember
 Data objects

 First, define the models for `Album` and `Song` by extending DS.Model.

 Next, update our routes to use the `store` rather than the fixture data.

 When you're finished, you should be able to delete the fixture data file and
 still have all of your tests up to this step passing.
*/

import { test } from 'ember-qunit';
import step from '../helpers/step';
import lookup from '../helpers/lookup';
import Ember from 'ember';
import resolver from '../helpers/resolver';

var App;
step(5, "Ember Data", {
  setup: function(app) {
    App = app;
  }
});

test("App.Song and App.Album have been defined", function() {
  var Album = resolver.resolve('model:album');
  ok(DS.Model.detect(Album), "Album is a DS.Model subclass");

  var Song = resolver.resolve('model:song');
  ok(DS.Model.detect(Song), "Song is a DS.Model subclass");
});

test("A payload of albums and songs become associated data models", function() {
  expect(12);
  var store = lookup(App, 'store:main');

  var payload = {
    album: {
      id: 1,
      artwork: 'album-artwork',
      name: 'album-name',
      artist: 'album-artist',
      isExplicit: true,
      songs: [1]
    },

    songs: [
      {
        id: 1,
        track: '5',
        name: 'song-name',
        duration: '123',
        url: 'song-url',
        album: 1
      }
    ]
  };

  Ember.run(function() {
    store.pushPayload(payload);
  });

  store.find('album', 1).then(function(album) {
    equal(album.get('id'), 1, "Album ID is set");
    equal(album.get('artwork'), 'album-artwork', "Album artwork is set");
    equal(album.get('name'), 'album-name', "Album name is set");
    equal(album.get('artist'), 'album-artist', "Album artist is set");
    equal(album.get('isExplicit'), true, "Explicit flag is set");

    var song = album.get('songs.firstObject');
    ok(song, "Album has the song inside of its songs collection");

    equal(song.get('id'), 1, "Song ID is set");
    strictEqual(song.get('track'), 5, "Song track is set");
    equal(song.get('name'), 'song-name', "Song name is set");
    strictEqual(song.get('duration'), 123, "Song duration is set");
    equal(song.get('url'), 'song-url', "Song url is set");

    ok(song.get('album'), "Song has a reference to the album");
  });
});

test("The album route returns an album model", function() {
  visit('/album/1');

  andThen(function() {
    var album = lookup(App, 'route:album').get('currentModel');

    ok(album instanceof DS.Model, "model is an Ember Data model");
    equal(album.get('id'), 1, "route found album 1");
  });
});

test("The index route returns all the album models", function() {
  visit('/');

  andThen(function() {
    var albums = lookup(App, 'route:index').get('currentModel');
    var firstAlbum = albums.get('firstObject');

    ok(firstAlbum instanceof DS.Model, "the model is an array of Ember Data models");
    equal(albums.get('length'), 4, "there are four album models");
  });
});
