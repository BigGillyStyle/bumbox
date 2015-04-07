/*
  In this step, you'll create a link from the album list to an individual
  album.

  Go to the index template and wrap the image with the album artwork inside a
  {{#link-to}} helper. Make sure to pass a parameter to the helper; this tells
  the helper which model should go into the URL.
*/

import { test } from 'ember-qunit';
import { exists } from '../helpers/assertions';
import step from '../helpers/step';

step(4, "Add a Link");

test("Each album on the index page should have a link to the album page", function() {
  visit('/');

  andThen(function() {
    [1, 2, 3, 4].forEach(function(id) {
      ok(exists('.album a[href="/album/'+id+'"]'), "There is a link for album "+id);
    });
  });
});

test("Clicking on an album shows the album template", function() {
  visit('/');
  click('.album:first a');

  andThen(function() {
    ok(exists('.album-info'), "Navigated to the album template");
  });
});

