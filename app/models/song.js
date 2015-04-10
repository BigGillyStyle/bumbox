import DS from 'ember-data';
var attr = DS.attr,
  belongsTo = DS.belongsTo;

export default DS.Model.extend({
  name: attr('string'),
  url: attr('string'),
  track: attr('number'),
  duration: attr('number'),
  album: belongsTo('album')
});
