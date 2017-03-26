//alert("Warning: This website is not mobile-friendly at all. It is best, and really only, experienced on a computer.");

var PET_DATA = null;

$(function() {
    $.getJSON('resources/pets-data/index.json', function(json) {
        PET_DATA = json.data;
    });

});