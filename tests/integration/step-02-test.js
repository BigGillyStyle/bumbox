/*
  For Step 3, use the `{{#if}}` helper to only show an "EXPLICIT" warning
  about the album if the model's `isExplicit` property is true.

  Your template should generate HTML that looks like this:

    <div class="album">
      <a href="/album/1">
        <img src="images/1.jpg">
      </a>

      <p class="album-name">The Morning After</p>
      <p class="artist-name">GOLDHOUSE</p>
      <p class="song-count">
        8 songs
        <span class='explicit'>EXPLICIT</span>
      </p>
    </div>

  The span with the class name `explicit` should only appear for albums
  whose `isExplicit` property is true.
*/

import { test } from 'ember-qunit';
import { not } from '../helpers/assertions';
import step from '../helpers/step';

function albumIsExplicit(name) {
  var el = findWithAssert('.album:has(.album-name:contains('+name+'))');
  return el.find('.explicit:contains(EXPLICIT)').length === 1;
}

step(2, "Add Explicit Warning");

test("Explicit albums should have a warning about their contents", function() {
  visit('/');

  andThen(function() {
    not(albumIsExplicit('The Morning After'), "First album should not be explicit");
    not(albumIsExplicit('Dusk to Dawn'), "Second album should not be explicit");
    ok(albumIsExplicit('The Heist'), "Third album should be explicit");
    ok(albumIsExplicit('Some Nights'), "Fourth album should be explicit");
  });
});

