var ALBUM_FIXTURES = [{
  id: "1",
  artwork: "images/the-morning-after.jpg",
  name: "The Morning After",
  artist: "GOLDHOUSE",
  isExplicit: false,
  songs: [ "11", "12", "13", "14" ]
}, {
  id: "2",
  artwork: "images/dusk-to-dawn.jpg",
  name: "Dusk to Dawn",
  artist: "Emancipator",
  isExplicit: false,
  songs: [ "21", "22", "23", "24" ]
}, {
  id: "3",
  artwork: "images/the-heist.jpg",
  name: "The Heist",
  artist: "Macklemore & Ryan Lewis",
  isExplicit: true,
  songs: [ "31", "32", "33", "34" ]
}, {
  id: "4",
  artwork: "images/some-nights.jpg",
  name: "Some Nights",
  artist: "fun.",
  isExplicit: true,
  songs: [ "41", "42", "43", "44" ]
}];

var SONG_FIXTURES = [{
  id: "11",
  track: 1,
  name: "A Walk",
  duration: 310,
  url: 'audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3',
  album: "1"
}, {
  id: "12",
  track: 2,
  name: "Hours",
  duration: 444,
  url: 'audio/Southern_Nights_-_06_-_Um.mp3',
  album: "1"
}, {
  id: "13",
  track: 3,
  name: "Daydream",
  duration: 334,
  url: 'audio/Southern_Nights_-_08_-_Go_Way.mp3',
  album: "1"
}, {
  id: "14",
  track: 4,
  name: "Dive",
  duration: 499,
  url: 'audio/Southern_Nights_-_09_-_Grass_or_Gasoline.mp3',
  album: "1"
}, {
  id: "21",
  track: 1,
  name: "Minor Cause",
  duration: 298,
  url: 'audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3',
  album: "2"
}, {
  id: "22",
  track: 2,
  name: "Valhalla",
  duration: 422,
  url: 'audio/Southern_Nights_-_06_-_Um.mp3',
  album: "2"
}, {
  id: "23",
  track: 3,
  name: "Merlion",
  duration: 387,
  url: 'audio/Southern_Nights_-_08_-_Go_Way.mp3',
  album: "2"
}, {
  id: "24",
  track: 4,
  name: "Outlaw",
  duration: 364,
  url: 'audio/Southern_Nights_-_09_-_Grass_or_Gasoline.mp3',
  album: "2"
}, {
  id: "31",
  track: 1,
  name: "Ten Thousand Hours",
  duration: 437,
  url: 'audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3',
  album: "3"
}, {
  id: "32",
  track: 2,
  name: "Can't Hold Us",
  duration: 387,
  url: 'audio/Southern_Nights_-_06_-_Um.mp3',
  album: "3"
}, {
  id: "33",
  track: 3,
  name: "Thrift Shop",
  duration: 352,
  url: 'audio/Southern_Nights_-_08_-_Go_Way.mp3',
  album: "3"
}, {
  id: "34",
  track: 4,
  name: "Thin Line",
  duration: 301,
  url: 'audio/Southern_Nights_-_09_-_Grass_or_Gasoline.mp3',
  album: "3"
}, {
  id: "41",
  track: 1,
  name: "Some Nights",
  duration: 419,
  url: 'audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3',
  album: "4"
}, {
  id: "42",
  track: 2,
  name: "We Are Young",
  duration: 306,
  url: 'audio/Southern_Nights_-_06_-_Um.mp3',
  album: "4"
}, {
  id: "43",
  track: 3,
  name: "Carry On",
  duration: 344,
  url: 'audio/Southern_Nights_-_08_-_Go_Way.mp3',
  album: "4"
}, {
  id: "44",
  track: 4,
  name: "It Gets Better",
  duration: 476,
  url: 'audio/Southern_Nights_-_09_-_Grass_or_Gasoline.mp3',
  album: "4"
}];

module.exports = function(app) {
  var express = require('express');
  var albumsRouter = express.Router();

  albumsRouter.get('/', function(req, res) {
    res.send({albums: ALBUM_FIXTURES, songs: SONG_FIXTURES});
  });

  albumsRouter.get('/:id', function(req, res) {
    var requestedAlbum = ALBUM_FIXTURES.filter(function(album) {
      if (album.id === req.params.id) {
        return album;
      }
    })[0];
    var associatedSongs = SONG_FIXTURES.filter(function(song) {
      if (song.album === req.params.id) {
        return song;
      }
    });
    res.send({album: requestedAlbum, songs: associatedSongs});
  });

  app.use('/api/albums', albumsRouter);
};

