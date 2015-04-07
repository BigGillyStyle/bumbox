/*

  In this step we're going to add a play and pause button to the
  now-playing widget.

  The markup for these buttons will be the same as the buttons
  found in song-row, so we're going to extract another component
  from the song-row component to finish this step.

  Create a new component called `audio-control` that renders the
  following HTML when a song is playing:

    <span class="audio-control">
      <span {{action 'pause'}}>❙❙</span>
    </span>

  And this HTML when the song is paused:

    <span class="audio-control">
      <span {{action 'play'}}>▶</span>
    </span>

  Once we have have this component in the {{now-playing}} template, we'll

*/

import { test, moduleForComponent } from 'ember-qunit';
import step from '../helpers/step';
import lookup from '../helpers/lookup';
import { propertyShouldBecome, exists } from '../helpers/assertions';
import resolver from '../helpers/resolver';
import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;
var player;
step(13, "The audio-control component", {
  setup: function(app) {
    App = app;
    player = lookup(app, 'service:player');
  }
});

test("The now-playing component has a pause button when a song is playing", function() {
  visit('/album/1');
  click('td.song-track:first span:contains(▶)');

  andThen(function() {
    ok(exists('.now-playing span:contains(❙❙)'), "The now-playing component is showing the pause button");
  });
});

test("Clicking the pause button", function() {
  visit('/album/1');
  click('td.song-track:first span:contains(▶)');
  click('.now-playing span:contains(❙❙)');

  andThen(function() {
    ok(exists('.now-playing span:contains(▶)'), "The now-playing component is showing the play button");
    equal(player.get('isPlaying'), false, "The player service stopped playing");
  });
});

test("Resuming the current song", function() {
  visit('/album/1');
  click('td.song-track:first span:contains(▶)');
  click('.now-playing span:contains(❙❙)');
  click('.now-playing span:contains(▶)');

  andThen(function() {
    equal(player.get('isPlaying'), true, "The player service is playing");
  });
});

