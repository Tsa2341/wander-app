import '../styles/mapFunc.css'

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