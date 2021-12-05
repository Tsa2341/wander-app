import '../styles/mapFunc.css'

//Creates and serve the map instance to the app
function mapFunc(google) {

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -1.9433,
            lng: 30.0587
        },
        zoom: 9,
        disableDefaultUI: true,
    });

    return map;
}

export default mapFunc;