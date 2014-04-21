// Wrapper which loads https://developers.google.com/api-client-library/javascript/

define('gapi', ['async!https://apis.google.com/js/client.js!onload'],
    function() {
        console.log('gapi loaded');
        return gapi;
    }
);
