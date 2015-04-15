import Ember from 'ember';
var run = Ember.run;

export default Ember.Service.extend({
  isPlaying: false,
  currentTime: 0,

  audioElement: null,
  song: null,

  setupAudioElement: function() {
    "use strict";

    var el = document.createElement('audio');
    el.addEventListener('play', run.bind(this, 'didPlay'));
    el.addEventListener('pause', run.bind(this, 'didPause'));
    el.addEventListener('timeupdate', run.bind(this, 'timeDidUpdate'));
    this.set('audioElement', el);
  }.on('init'),

  play: function(song) {
    "use strict";

    this.set('song', song);
    this.set('audioElement.src', song.get('url'));
    this.get('audioElement').play();
  },

  didPlay: function() {
    "use strict";

    this.set('isPlaying', true);
  },

  pause: function() {
    "use strict";

    this.get('audioElement').pause();
  },

  didPause: function() {
    "use strict";

    this.set('isPlaying', false);
  },

  timeDidUpdate: function() {
    "use strict";

    this.set('currentTime', Math.floor(this.get('audioElement.currentTime')));
  },

  willDestroy: function() {
    "use strict";

    this.get('audioElement').pause();
    this.set('audioElement.src', '');
  }
});
