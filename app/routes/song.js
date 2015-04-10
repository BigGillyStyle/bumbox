import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('song', params.song_id);
  }
});
