angular.module('earthApp').service('earthService', function($http, $q){




var self = this
var map
this.eq

this.initEarthQuakes = $q(function(res, rej){
  require(["esri/graphic" ,"esri/geometry/Point", "dojo/_base/array", "esri/layers/FeatureLayer", "esri/dijit/BasemapToggle", "esri/symbols/SimpleMarkerSymbol", "esri/request", "esri/map", "dojo/domReady!"], function(Graphic, Point, array, FeatureLayer, BasemapToggle, SimpleMarkerSymbol, esriRequest, Map) {
    esriConfig.defaults.io.corsEnabledServers.push("earthquake.usgs.gov");

    var featureLayer;

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



        var featureCollection = {
          "layerDefinition": null,
          "featureSet": {
            "features": [],
            "geometryType": "esriGeometryPoint"
          }
        };
        featureCollection.layerDefinition = {
          "geometryType": "esriGeometryPoint",
          // "objectIdField": "ObjectID",
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "symbol": {
                "type": "esriPMS",
                "url": "img/EqMap.png",
                "contentType": "image/png",
                "width": 15,
                "height": 15
              }
            }
          },
          "fields": [{
            "name": "ObjectID",
            "alias": "ObjectID",
            "type": "esriFieldTypeOID"
          }, {
            "name": "description",
            "alias": "Description",
            "type": "esriFieldTypeString"
          }, {
            "name": "title",
            "alias": "Title",
            "type": "esriFieldTypeString"
          }]
        };
      
        


        var earthquakes = esriRequest({
          url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson",
          handleAs: "json"
        });
        // earthquakes.then(function(response){
        //   console.log(response);
        // })
        function requestSucceeded(data) {
          console.log(data)
          res(data.features)
          return eq = data.features; // print the data to browser's console
          

          // var feats = [];
          // array.forEach(data.features, function(item) {
          


          // var geometry = new Point(item);
          // var graphic = new Graphic(geometry);
          // feats.push(graphic);
          
         
          
          // })
          // featureLayer.applyEdits(feats, null, null);
        }
        
        function requestFailed(error) {
          console.log("Error: ", error.message);
        }
        
        earthquakes.then(requestSucceeded, requestFailed);

        
    });


    



})



});

