import startApp from './start-app';
import { test } from 'ember-qunit';
import Ember from 'ember';

export default function step(number, description, config) {
  var App;

  if (!config) {
    config = {};
  }

  module("Step " + pad(number, 2) + ": " + description, {
    setup: function() {
      App = startApp();
      if (config.setup) {
        config.setup(App);
      }
    },

    teardown: function() {
      Ember.run(App, App.destroy);
      if (config.teardown) {
        config.teardown(App);
      }
    }
  });
}

function pad(number, length) {
  return new Array(Math.max(length - String(number).length + 1, 0)).join(0) + number;
}

