import "https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.js";

const mapbox_token =
    "YOUR_KEY";

mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
    container: "mapid",
    style: "mapbox://styles/mapbox/streets-v11",
    zoom: 8.4,
    center: [137, 35.1]  // Left/Right, Up/Down
});

const getColorFromCount = count => {
    if (count >= 100) {
        return "red";
    }
    if (count >= 10) {
        return "blue";
    }
    return "gray";
};

fetch("/aichi-stats.json")
    .then(response => response.json())
    .then(results => {
        console.log(results);

        results.forEach(result => {
            const { totalConfirmed, id } = result;
            // const currentPlace = results.find(result => result.id);
            console.log(totalConfirmed, id);
            new mapboxgl.Marker({
                color: getColorFromCount(totalConfirmed)
            })
                .setLngLat([result.long, result.lat])
                .addTo(map);
        })
    })