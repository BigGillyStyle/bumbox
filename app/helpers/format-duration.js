import Ember from 'ember';

/*
 function formatDuration(seconds) {
 if (!seconds) { return ''; }

 var minutesPart = Math.floor(seconds / 60);
 var secondsPart = seconds - (minutesPart * 60);

 var output = minutesPart.toString() + ':';
 if (secondsPart < 10) {
 output += '0';
 }
 output += secondsPart;

 return output;
 }
 */

export default Ember.Handlebars.makeBoundHelper(function (duration) {
  var minutes = Math.floor(duration / 60),
    seconds = duration % 60,
    formattedSeconds = (seconds < 10) ? "0" + seconds : seconds;

  return minutes + ":" + formattedSeconds;
});
