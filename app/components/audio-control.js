import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['play'],

  actions: {
    pause: function() {
      this.sendAction('pause');
    },

    play: function() {
      this.sendAction('play');
    }
  }
});
