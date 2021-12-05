export default function setMarker(location, name, map) {
    return new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: name,
    })
}
