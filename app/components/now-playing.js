import Ember from 'ember';
var inject = Ember.inject,
  computed = Ember.computed;

export default Ember.Component.extend({
  tagName: 'footer',
  classNames: ['now-playing'],

  player: inject.service(),

  song: computed.readOnly('player.song'),

  actions: {
    pause: function() {
      this.get('player').pause();
    },

    resume: function() {
      this.get('player').resume();
    }
  }
});
