/* global clearTimeout */

import Ember from 'ember';

export function exists(selector) {
  return !!count(selector);
}

export function count(selector) {
  return find(selector).length;
}

export function not(state, message) {
  ok(!state, message);
}

export function extractContents(selector) {
  return find(selector).toArray().map(function(el) {
    return $.trim(el.textContent);
  });
}

export function extractAttributes(selector, attribute) {
  return find(selector).toArray().map(function(el) {
    return $(el).attr(attribute);
  });
}

export function contentOf(selector) {
  var el = find(selector)[0];
  return $.trim(el.textContent);
}

export function propertyShouldBecome(object, property, expectedValue) {
  var actualValue;

  return new Ember.RSVP.Promise(function(resolve, reject) {
    var observer = function() {
      var correctValue, message;

      actualValue = object.get(property);

      if (typeof expectedValue === 'function') {
        if (expectedValue(actualValue)) {
          correctValue = true;
          message = "The " + property + " property on " + object + " fulfills the condition";
        }
      } else if (expectedValue === actualValue) {
        correctValue = true;
        message = "The " + property + " property on " + object + " became " + expectedValue;
      }

      if (correctValue) {
        clearTimeout(timeout);
        Ember.removeObserver(object, property, observer);
        QUnit.push(true, null, null, message);
        resolve();
      }
    };

    var timeout = setTimeout(function() {
      if (typeof expectedValue === 'function') {
        QUnit.push(false, null, null, "The " + property + " property of " + object + " never fulfilled the condition");
      } else {
        QUnit.push(actualValue === expectedValue, actualValue, expectedValue, "The " + property + " property of " + object + " never became " + expectedValue);
      }

      reject();
    }, 3000);

    Ember.addObserver(object, property, observer);
  });
}

export function waitFor(object, property, callback) {
  stop();

  return new Ember.RSVP.Promise(function(resolve, reject) {
    function observer() {
      clearTimeout(timeout);
      Ember.removeObserver(object, property, observer);
      if (callback) {
        Ember.run.next(callback);
      }

      Ember.run.next(function() {
        start();
        resolve();
      });
    }

    Ember.addObserver(object, property, observer);

    var timeout = setTimeout(function() {
      start();
      QUnit.push(false, null, null, "Timed out waiting for " + property + " of " + object + " to become truthy");
      Ember.run(function() {
        reject();
      });
    }, 3000);
  });
}

