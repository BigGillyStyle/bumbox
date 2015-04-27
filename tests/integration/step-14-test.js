/*
  In this step you're going to write your own tests to add a feature that
  allows users to toggle between the current and remaining time of a song in
  the now-playing footer component.

  * The currentTime is the elapsed time of the song. Your player service
    already exposes currentTime as a property.

  * The remainingTime is the duration of the song minus the currentTime

  Use the first test as an example of how to use moduleForComponent, then
  write your own test and implement this feature.
*/

import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('now-playing', "Step 14: Toggle elapsed/current time", {
  needs: [
    'helper:format-duration',
    'service:player',
    'component:audio-control',
    'template:components/audio-control'
  ],
});

test("when a song is loaded and the player is not playing, the component shows the song name", function() {
  var player = Ember.Object.extend().create();
  var component = this.subject({player: player});

  Ember.run(function() {
    player.set('song', {name: 'Song name'});
    player.set('isPlaying', false);
  });

  equal(this.$().find('.play span:contains(▶)').length, 1, "The component should contain a play button");
  equal(this.$().find('.play span:contains(❙❙)').length, 0, "The component should not contain a pause button");
  equal(this.$().find('.now-playing-name').text().trim(), 'Song name', "The component shows the song name");
});

test("Toggling current and remaining time", function() {
  "use strict";

  var player = Ember.Object.extend().create();
  var component = this.subject({player: player});

  Ember.run(function() {
    player.set('song', {duration: 120});
    player.set('currentTime', 30);
  });

  var durationElement = this.$().find('.duration');

  equal(durationElement.text().trim(), '0:30', "The component should show the current time");
  durationElement.click();
  equal(durationElement.text().trim(), '1:30', "The component should show the remaining time");
});

