import DS from 'ember-data';
import Ember from 'ember';
var attr = DS.attr,
  hasMany = DS.hasMany,
  computed = Ember.computed;

export default DS.Model.extend({
  name: attr('string'),
  artist: attr('string'),
  artwork: attr('string'),
  isExplicit: attr('boolean'),
  songs: hasMany('song'),

  songCount: computed.alias('songs.length'),
  songDurations: computed.mapBy('songs', 'duration'),
  totalDuration: computed.sum('songDurations')
});
