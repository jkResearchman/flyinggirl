jQuery(document).ready(function() {
    jQuery(".fn-cutsom-select").select2({
        minimumResultsForSearch: -1,
    });

    jQuery('.fn-cutsom-select').change(function(){
        let stra = jQuery(this).val().split('|'); 
        if(stra[0]!='SELECT LOCATION'){
            initMap(stra[0], stra[1], stra[2], stra[3], stra[4]);      
        }        
    });
});
jQuery('.fn-contact-page__form__input').focus(function(){
    jQuery(this).closest('.fn-contact-page__form__input__wrapper').addClass('focused active');
});

jQuery('.fn-contact-page__form__input').blur(function(){
    if(jQuery(this).val()==''){
        jQuery(this).closest('.fn-contact-page__form__input__wrapper').removeClass('focused active');
    }
    else{
        jQuery(this).closest('.fn-contact-page__form__input__wrapper').removeClass('focused');
    }
});

//js for google map
// function initMap(lat=28.6287817, lng=77.0803543, name='Frankfinn Management Consultants', address='Suneja Tower-ii, 710, Janakpuri District Center, Janakpuri, Janakpuri District Center, Janakpuri, New Delhi, Delhi 110058', linkToLocation='https://goo.gl/maps/ZM8jwSJmSKu'){
function initMap(lat, lng, name, address, linkToLocation){
    if(lat === undefined){
        lat=28.6287817;
        lng=77.0803543;
        name='Frankfinn Institute of Air Hostess Training';
        address='201 Suneja Tower-2 District Center Janakpuri New Delhi 110058';
        linkToLocation='https://goo.gl/maps/ZM8jwSJmSKu';
    }
    
    var latlng = new google.maps.LatLng(lat,lng);
    var myOptions = {
        zoom: 14,
        center: latlng,
        styles: [
            {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{visibility: 'off'}]
            },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    };
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    function initialize(){
        var marker = new google.maps.Marker({
            position: latlng,
            icon: '../wp-content/themes/frankfinn/images/map-marker.png',
            map: map,
        });

        var infoWindow = new google.maps.InfoWindow({
            position: latlng,
             content: '<h3 style="font-family:Fira Sans; font-size:14px; font-weight: 500; line-height: 1.29; max-width:250px;">'+name+'</h3><p> '+address+'</p> <a href='+linkToLocation+' target="__blank" '+' style="color:#4a90e2; font-weight: 400;">View larger map</a>'
        });
        infoWindow.open(map,marker);
        
        //openining infowindow on click on marker
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map,marker);
        });

        //customizing infowindow
        google.maps.event.addListener(infoWindow, 'domready', function(){
            console.log(jQuery('#map button'));
            let infowWindow = jQuery('.gm-style-iw');
            infowWindow.parent().css('background','#FFF');
            infowWindow.parent().css('position','relative');
            infowWindow.parent().css('border-radius','4px');
            infowWindow.parent().css('box-shadow','0px 5px 20px 3px rgba(0, 0, 0, 0.15)');
            infowWindow.parent().children(':nth-child(1)').css('display', 'none');
            
            infowWindow.parent().append('<div style="position:absolute; bottom:-6px;left:50%; transform: translateX(-50%) rotate(45deg); height: 15px; width: 15px;  background-color:#FFF; border-radius: 2px;"></div>');                    
        });
    }
    initialize();
}

// jQuery(document).ready(function() {  //remove this before putting project on production mode
//     alert('developer alert!!! Before put it on server, change website name in GOOGLE API CONSOLE > Application Restriction to for security purpose');
// });