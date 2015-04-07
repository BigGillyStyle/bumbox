/*
  In Step 1, you are going to load some models from fixture data in the
  router.

  Then, you'll use the {{#each}} helper that you learned about to print
  each of the albums using a template.

  Create a route handler for the application template, and make sure you set
  its model to the list of albums. You're application route will look like this:

  import Ember from 'ember';
  import Albums from 'bumbox/models/album-fixtures';

  export default Ember.Route.extend({
    model: function() {
      return Albums;
    }
  });

  Delete all but one of the static albums in the application template.

  Finally, use the {{#each}} helper to display the remaining HTML once per album
  in the application. Use Handlebars expressions to print the album's name
  and artist. Also render the correct source attribute for the artwork images.
  (Don't worry about the song count for now.)
*/

import { test } from 'ember-qunit';
import { exists, count, extractContents, extractAttributes } from '../helpers/assertions';
import step from '../helpers/step';

step(1, 'Rendering Albums');

test("The album list is enclosed in a <div> with the class 'album-list'", function() {
  visit('/');

  andThen(function() {
    ok(exists('div.album-list'), "The album list is a <div class='album-list'>");
  });
});

test("Each of the four albums should appear on the screen", function() {
  visit('/');

  andThen(function() {
    equal(count('.album-list .album'), 4, "There should be four albums in the list");

    var albumNames = extractContents('.album .album-name');
    deepEqual(albumNames, ['The Morning After', 'Dusk to Dawn', 'The Heist', 'Some Nights'], "Each album title should be rendered");

    var artistNames = extractContents('.album .album-artist');
    deepEqual(artistNames, ['GOLDHOUSE', 'Emancipator', 'Macklemore & Ryan Lewis', 'fun.'], "Each album artist should be rendered");

    var artworkUrls = extractAttributes('.album img', 'src');
    deepEqual(artworkUrls, ["images/the-morning-after.jpg", "images/dusk-to-dawn.jpg", "images/the-heist.jpg", "images/some-nights.jpg"], "Each album artwork should be rendered");
  });
});

