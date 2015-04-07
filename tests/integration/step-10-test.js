/*
  In this step you'll create a player service to play songs in the browser.

  For this step and others it may be helpful to learn about
  the HTML audio element API:

  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio

*/

import Ember from 'ember';
import { test } from 'ember-qunit';
import { propertyShouldBecome } from '../helpers/assertions';
import lookup from '../helpers/lookup';
import step from '../helpers/step';

var player;

step("10", "Create player service", {
  setup: function(app) {
    player = lookup(app, 'service:player');
  }
});

test("Should have a player service", function() {
  ok(player instanceof Ember.Service, "Player service is defined");
});

test("Eventually isPlaying changes when the song is played", function() {
  expect(1);
  var song = Ember.Object.create({url: 'audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3'});

  propertyShouldBecome(player, 'isPlaying', true);
  player.play(song);
});

test("The song stops playing when the service is destroyed", function() {
  var song = Ember.Object.create({url: 'audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3'});

  player.play(song);
  Ember.run(player, player.destroy);

  ok(player.get('audioElement').paused, 'The audio element is paused');
  equal(player.get('audioElement').src, document.baseURI, 'The audio element src has been wiped');
});

test("Clicking a song-row play button plays a song", function() {
  visit('album/1');
  click('.song-track span:contains(▶)');

  return propertyShouldBecome(player, 'isPlaying', true);
});

test("Eventually isPlaying becomes false when the song is paused", function() {
  var song = Ember.Object.create({url: 'audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3'});

  player.play(song);
  propertyShouldBecome(player, 'isPlaying', true);

  player.pause();
  return propertyShouldBecome(player, 'isPlaying', false);
});

test("Clicking the song-row pause button pauses the player", function() {
  visit('album/1');
  click('.song-track span:contains(▶)');
  propertyShouldBecome(player, 'isPlaying', true);

  click('.song-track span:contains(❙❙)');
  return propertyShouldBecome(player, 'isPlaying', false);
});

