import Ember from 'ember';
import albums from 'bumbox/models/album-fixtures';

export default Ember.Route.extend({
  model: function(params) {
    return albums.findBy('id', params.album_id);
  }
});
