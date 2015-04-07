/*
  In this step, we're going to change the way that our `{{song-row}}` component
  works so that only one song shows as playing at a time. We'll also highlight
  the currently playing song.
*/

import Ember from 'ember';
import DS from 'ember-data';
import { test } from 'ember-qunit';
import step from '../helpers/step';
import startApp from '../helpers/start-app';
import lookup from '../helpers/lookup';
import { exists } from '../helpers/assertions';

var player;
var store;

step(11, "Enhacing song-row", {
  setup: function(app) {
    player = lookup(app, 'service:player');
    store = lookup(app, 'store:main');
  }
});

test("Clicking play on a song sets the song on the player service", function() {
  expect(2);
  visit('/album/1');
  click('td.song-track:first span:contains(▶)');

  andThen(function() {
    ok(player.get('song') instanceof DS.Model, "the player's song is an Ember Data model");
    equal(player.get('song.id'), 11);
  });
});

test("After clicking on a play button, the song gets the 'is-current-song' class", function() {
  expect(1);
  visit('/album/1');
  click('td.song-track:first span:contains(▶)');

  andThen(function() {
    ok(exists('.album-listing tr:first.is-current-song'), "The first song is current");
  });
});

test("After playing 2 songs in succession", function() {
  expect(4);
  visit('/album/1');
  click('.album-listing tr:nth-child(1) span:contains(▶)');
  click('.album-listing tr:nth-child(2) span:contains(▶)');

  andThen(function() {
    ok(!exists('.album-listing tr:nth-child(1).is-current-song'), "The first song is not current");
    ok(exists('.album-listing tr:nth-child(2).is-current-song'), "The second song is current");

    ok(exists('.album-listing tr:nth-child(1) span:contains(▶)'), "The first song does have a play button");
    ok(!exists('.album-listing tr:nth-child(2) span:contains(▶)'), "The second song doesn't have a play button");
  });
});

test("After playing and then pausing a song", function() {
  expect(2);
  visit('/album/1');
  click('.album-listing tr:first span:contains(▶)');

  andThen(function() {
    ok(exists('.album-listing tr:first.is-current-song'), "The song is current");
    ok(!exists('.album-listing tr:first span:contains(▶)'), "The song doesn't have a play button");
  });
});

