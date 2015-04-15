import Ember from 'ember';
var inject = Ember.inject,
  computed = Ember.computed;

export default Ember.Component.extend({
  tagName: 'footer',
  classNames: ['now-playing'],

  player: inject.service(),

  song: computed.readOnly('player.song')
});
