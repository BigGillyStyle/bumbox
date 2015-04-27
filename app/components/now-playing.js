import Ember from 'ember';
var inject = Ember.inject,
  computed = Ember.computed;

export default Ember.Component.extend({
  tagName: 'footer',
  classNames: ['now-playing'],
  showCurrentTime: true,

  player: inject.service(),

  song: computed.readOnly('player.song'),
  remainingTime: function() {
    "use strict";
    return this.get('song.duration') - this.get('player.currentTime');
  }.property('song.duration', 'player.currentTime'),

  actions: {
    pause: function() {
      this.get('player').pause();
    },

    resume: function() {
      this.get('player').resume();
    },
    toggleTimeDisplay: function() {
      "use strict";
      this.toggleProperty('showCurrentTime');
    }
  }
});
