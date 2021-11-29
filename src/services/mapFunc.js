function mapFunc(window) {
    const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -1.9433,
            lng: 30.0587
        },
        zoom: 9
    });

    return map;
}

//create map

export default mapFunc;