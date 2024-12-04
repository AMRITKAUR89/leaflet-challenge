// create basic map
let basicMap = L.map("map", {
  center: [-28.01, 120.4],
  zoom : 2.5
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(basicMap);

let link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Function to determine marker size based on magnitude
function markerSize(magnitude) {
  return magnitude * 2; // Scale magnitude for better visualization
}

// Function to determine marker color based on depth
function chooseColor(depth) {
  if (depth > 90) return "#800026"; // Dark red
  else if (depth > 70) return "#BD0026";
  else if (depth > 50) return "#E31A1C";
  else if (depth > 30) return "#FC4E2A";
  else if (depth > 10) return "#FD8D3C";
  else return "#FEB24C"; // Light orange
}


// Getting our GeoJSON data
d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      let magnitude = feature.properties.mag;
      let depth = feature.geometry.coordinates[2];
      return L.circleMarker(latlng, {
        radius: markerSize(magnitude),
        fillColor: chooseColor(depth),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
    },
    // This is called on each feature.
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`
        <strong>Location:</strong> ${feature.properties.place}<br>
        <strong>Magnitude:</strong> ${feature.properties.mag}<br>
        <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km
      `);

    }
  }).addTo(basicMap);
});
