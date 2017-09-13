angular.module('earthApp').service('earthService', function($http, $q){




var self = this
var map
this.eq

this.initEarthQuakes = $q(function(res, rej){
  require(["esri/dijit/BasemapToggle","esri/symbols/SimpleMarkerSymbol","esri/request","esri/map", "dojo/domReady!"], function(BasemapToggle, SimpleMarkerSymbol, esriRequest, Map) {
    esriConfig.defaults.io.corsEnabledServers.push("earthquake.usgs.gov");
     var map = new Map("map", {
          basemap: "gray",
          center: [-96.79, 32.77],
          zoom: 7
        });

        var basemapToggle = new BasemapToggle({
          map: map,
          basemap: "dark-gray"
        },"basemapToggleDiv" );
        basemapToggle.startup();


        var earthquakes = esriRequest({
          url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
          handleAs: "json"
        });
        // earthquakes.then(function(response){
        //   console.log(response);
        // })
        function requestSucceeded(data) {
          console.log(data)
          res(data.features)
          return eq = data.features; // print the data to browser's console
          
        }
        
        function requestFailed(error) {
          console.log("Error: ", error.message);
        }
        
        earthquakes.then(requestSucceeded, requestFailed);
    });
})



});

