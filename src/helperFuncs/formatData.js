export default function formatData(data) {

    var photo = data.photos ? data.photos[0].getUrl(): "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
    var name = data.name ? data.name : null;
    var date = new Date(new Date().getUTCMinutes() + data.utc_offset_minutes);
    var phoneNumber = data.formatted_phone_number ? data.formatted_phone_number : null;
    var address = data.formatted_address ? data.formatted_address : null;

    var lat = data.geometry.location.lat() ? data.geometry.location.lat() : null;
    var lng = data.geometry.location.lng() ? data.geometry.location.lng() : null;
    
    
    return {
        photo: photo,
        name: name,
        date: date,
        url: data.url,
        phoneNumber: phoneNumber,
        address: address,
        location: { lat, lng },
    }
}