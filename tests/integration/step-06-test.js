/**
  In this step, you will apply the knowledge that you have learned
  so far to build the list of songs.

  To make the tests pass, you will need to create a template that
  produces the following HTML for the song list.

    <div class="album-info">
      <img src="artwork.png">
      <h1>Album Name</h1>
      <h2>Artist Name</h2>
    </div>

    <table class="album-listing">
      <!-- this should repeat once for each song -->
      <tr>
        <td class="song-track">
          <span class="track-number"><!-- track number --></span>
        </td>
        <td class="song-name"><!-- song name --></td>
        <td class="song-duration"><!-- song duration --></td>
      </tr>
      <!-- end repeat -->
      <tr>
        <td class="total-duration" colspan="3">Total Time: 40:03</td>
      </tr>
    </table>

  You can hardcode the total duration for now. We will update
  it with a calculated value in a later step.
*/

import { test } from 'ember-qunit';
import { exists, count, extractContents} from '../helpers/assertions';
import step from '../helpers/step';

step(6, "Songs List");

test("Information about the album is displayed", function() {
  visit('/');
  click('.album:first a');

  andThen(function() {
    ok(exists('.album-info img[src="images/the-morning-after.jpg"]'), "Has artwork");
    ok(exists('.album-info h1:contains(The Morning After)'), "Has album name");
    ok(exists('.album-info h2:contains(GOLDHOUSE)'), "Has artist name");
  });
});

test("It should have a list of songs", function() {
  visit('/');
  click('.album:first a');

  andThen(function() {
    var trackNumbers = extractContents('.album-listing .song-track .track-number');
    deepEqual(trackNumbers, ["1", "2", "3", "4"], "Each track number should be shown");

    var songNames = extractContents('.album-listing .song-name');
    deepEqual(songNames, ["A Walk", "Hours", "Daydream", "Dive"], "Each song name should be shown");

    equal(count('.album-listing .song-duration:not(:empty)'), 4, "The duration information for four tracks should be displayed");
  });
});

