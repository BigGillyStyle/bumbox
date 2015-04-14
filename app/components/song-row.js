import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  isPlaying: false,

  actions: {
    play: function() {
      this.set('isPlaying', true);
    },
    pause: function() {
      this.set('isPlaying', false);
    }
  }
});
