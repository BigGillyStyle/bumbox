import Ember from 'ember';
import DS from 'ember-data';
var attr = DS.attr,
  belongsTo = DS.belongsTo,
  computed = Ember.computed;

export default DS.Model.extend({
  name: attr('string'),
  url: attr('string'),
  track: attr('number'),
  duration: attr('number'),
  album: belongsTo('album'),

  artist: computed.alias('album.artist'),
  artwork: computed.alias('album.artwork')
});
