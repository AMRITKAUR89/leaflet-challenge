 // Load tectonic plates GeoJSON data
const tectonicPlatesUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';

d3.json(tectonicPlatesUrl).then(tectonicData => {
    L.geoJSON(tectonicData, {
        style: {
          color: 'yellow',
          weight: 3.5
        }
      }).addTo(basicMap);
    });

    