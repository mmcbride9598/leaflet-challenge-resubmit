var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
     // layers: [grayscale, cities]
  });

 var streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);



var dataset = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(dataset, function(response) {

    console.log(response);
    var location = response.features;
    // var details = response.features.properties;
    // var siteMarker = L.marker([location.coordinates[1], location.coordinates[0]])

    for (var i = 0; i < location.length; i++) {
      var feature = location[i]
    //   console.log(feature)
    
    var color;
    var radius;
    var opacity;
    var magnitude = feature.properties.mag; 
    
    if(magnitude <= 1){
        color = "green"
        radius = 5
        opacity = 1
    }

    else if (magnitude <=2){
        color = "light green"
        radius = 10
        opacity = 1
    }

    else if (magnitude <=3){
        color = "yellow"
        radius = 15
        opacity = 1
    }

    else if (magnitude <=4){
        color = "orange"
        radius = 20
        opacity = 1
    }

    else if (magnitude <=5){
        color = "light red"
        radius = 25
        opacity = 1
    }

    else if (magnitude >5){
        color = "red"
        radius = 30
        opacity = 1
    }

      if (feature) {
        L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            fillColor: color,
            radius: radius,
        }).addTo(myMap)
        .bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + feature.properties.mag + "</p>")
        
      };

    //   if (details.mag <= 1.0){
    //     L.marker([location.coordinates[1], location.coordinates[0]],{icon: greenIcon})
    //   }
    //   else {
    //     L.marker([location.coordinates[1], location.coordinates[0]],{icon: greenIcon})
    //   }
    }
  
  });