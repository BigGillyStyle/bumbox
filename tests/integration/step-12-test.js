/*
  In this step we're going to build the now-playing widget that stays at the
  bottom of the screen as users move through the application.

  Once a user starts playing a song, they should see information about that
  song and associated album in this bottom bar.

  If there is no song playing, the panel's HTML should look like this:

      <footer class="now-playing">
        <span class="now-playing-empty">Select a song to start playing.</span>
      </footer>

  If a song is playing, it should look like this:

      <footer class="now-playing">
        <img class="now-playing-artwork" src="<artwork-url>">
        <div class="now-playing-body">
          <p class="now-playing-details">
            <span class="now-playing-name">Rude Boy</span> -
            <span class="now-playing-artist">Rihanna</span>
          </p>
          <div class="now-playing-player">
            <p class="duration">
              song duration
            </p>
          </div>
        </div>
      </footer>

  In order to show the current play time, you'll need to add a new property to
  your player service using your audio element's `timeupdate` event and
  `currentTime` property,

  This `currentTime` property should return seconds as integers from your
  service (no decimals) and you should use your format-durration helper in your
  component's template to get your time in the right format.

  Here are steps you can follow to implement this feature:

  1. Extract the current footer markup from the application.hbs template
     and replace it with a component called `{{now-playing}}` that renders
     the same markup

  2. Inject the player service into your `now-playing` component.

  3. Use the property player.song and the `{{#if}}` template helper to show the
     "Select a song" message when there is no song and the now-playing markup
     shown above when there is a song.

  4. Fill in the dummy values of the `now-playing` template with real values
     from the `player.song` model. For now you may have to use paths that include
     the album like this: 'player.song.album.artist' but we'll show you how to
     clean that up in the solution.

  5. Add a currentTime property to the player service that defaults to zero.

  6. Use the `audioElement`'s "timeupdate" event to make a callback that updates
     the `currentTime` of the player service. You can use `Math.floor` to make
     sure that the currentTime is always an integer.

  7. Replace the dummy "song duration" value in the template with the
     currentTime property formatted with the `format-duration` helper.

*/

import Ember from 'ember';
import { test } from 'ember-qunit';
import step from '../helpers/step';
import { exists, waitFor, contentOf } from '../helpers/assertions';
import lookup from '../helpers/lookup';

var player;
step(12, "The now-playing component", {
  setup: function(app) {
    player = lookup(app, 'service:player');
  }
});

test("The now-playing component is empty when no song is playing", function() {
  visit('/album/1');

  andThen(function() {
    ok(exists('.now-playing .now-playing-empty'), "The now-playing component is empty when no song is playing");
  });
});

test("Playing a song should update the now-playing template", function() {
  visit('/album/1');
  click('td.song-track:first span:contains(▶)');

  andThen(function() {
    ok(exists('.now-playing img.now-playing-artwork[src="images/the-morning-after.jpg"]'), "The current song's artwork is showing");
    ok(exists('.now-playing div.now-playing-body span.now-playing-name:contains(A Walk)'), "The current song's name is showing");
    ok(exists('.now-playing div.now-playing-body span.now-playing-artist:contains(GOLDHOUSE)'), "The current song's artist is showing");
  });
});

test("The player's currentTime starts at 0", function() {
  equal(player.get('currentTime'), 0, "The player's currentTime starts at 0");
});

test("The player's currentTime updates as a song plays showing seconds as integers", function() {
  expect(2);

  var song = Ember.Object.create({
    url: "audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3"
  });

  player.play(song);

  waitFor(player, 'currentTime', function(time) {
    ok(player.get('currentTime') > 0, "currentTime is increasing");
    ok(player.get('currentTime') % 1 === 0, "currentTime is an Integer");
  });
});

test("As a song plays the current time in the now-playing template is updated", function() {
  visit('/album/1');
  click('td.song-track:first span:contains(▶)');

  andThen(function() {
    ok(contentOf('.now-playing .duration').match(/\d\:\d\d/), "The current time is shown");
  });
});
