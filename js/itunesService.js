angular.module('itunes')
.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.getSongData = function(search) {
      if (search){
      var dfd = $q.defer();
        $http.jsonp('https://itunes.apple.com/search?term=' + search + '&callback=JSON_CALLBACK')
        .then(function(response){
            console.log(response);
          var songInfo = response.data.results;
          var array = [];
          for (var i=0; i < songInfo.length; i++ ) {
            var obj = {
              Play: songInfo[i].previewUrl,
              Artist: songInfo[i].artistName,
              Collection: songInfo[i].collectionName,
              AlbumArt: songInfo[i].artworkUrl100,
              Type: songInfo[i].kind,
              CollectionPrice: songInfo[i].collectionPrice,
              SinglePrice: songInfo[i].trackPrice
            }
            array.push(obj);
          }
          dfd.resolve(array);
        })
        return dfd.promise;
      }

    };






});
