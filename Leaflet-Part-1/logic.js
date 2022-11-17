  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

   // Create the map, giving it the streetmap and earthquakes layers to display on load.

  let myMap = L.map("map", {
    center: [
      10.0, 25.00
    ],
    zoom: 2.5,
    layers: [street, topo]
  });

  // Create a baseMaps object.

  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create the layer menu

  var tectonicplates = new L.LayerGroup();
  var earthquakes = new L.LayerGroup();

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Tectonic: tectonicplates,
    Earthquakes: earthquakes
  };
 
  // Create a layer control.
  // Pass it to the baseMaps and overlayMaps.
  // Add the layer control to the map.

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Store API endpoint as queryUrl.

  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Create the functions.

      function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }
  
    function getColor(depth) {
      switch (true) {
        case depth > 90:
          return "#ea2c2c";
        case depth > 70:
          return "#ea822c";
        case depth > 50:
          return "#ee9c00";
        case depth > 30:
          return "#eecc00";
        case depth > 10:
          return "#d4ee00";
        default:
          return "#98ee00";
      }
    }

    function getRadius(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
  
      return magnitude * 4;
    }
  
    // Add style layer

    L.geoJson(data, {
    
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
      },
          style: styleInfo,
 
    // Give each feature a popup that shows the magnitude, depth and place of the earthquake.

      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "Magnitude: "
          + feature.properties.mag
          + "<br>Depth: "
          + feature.geometry.coordinates[2]
          + "<br>Location: "
          + feature.properties.place
        );
      }
           
    }).addTo(myMap);

  //  Create legend

    var legend = L.control({
      position: "bottomright"
    });
  
    legend.onAdd = function () {
      var div = L.DomUtil.create("div", "info legend");
  
      var grades = [-10, 10, 30, 50, 70, 90];
      var colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"];
  
      // Loop through the intervals and generate a label with a coloured mark for each interval.

      for (var i = 0; i < grades.length; i++) {
        div.innerHTML += "<i style='background: "
          + colors[i]
          + "'></i> "
          + grades[i]
          + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
      return div;
    };
  
   // Add legend to map

    legend.addTo(myMap);

    // Add geoJSON data, along with style information, to the tectonicplates layer.
  
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (platedata) {

    L.geoJson(platedata, {
      color: "orange",
      weight: 2
    })
      .addTo(tectonicplates);

     tectonicplates.addTo(myMap);
  });

  })
