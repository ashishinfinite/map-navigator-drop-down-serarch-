 var locations = [

          {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393},id:1,index:0},
          {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465},id:1,index:1},
          {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759},id:1,index:2},
          {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377},id:1,index:3},
          {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934},id:1,index:4},
          {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237},id:1,index:5}
        ];
      var map;
      var self;
      // Create a new blank array for all the listing markers.
      var markers = [];
      var bounds;
      var largeInfowindow;

      function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.7413549, lng: -73.9980244},
          zoom: 13,
          mapTypeControl: false
        });

        // These are the real estate listings that will be shown to the user.
        // Normally we'd have these in a database instead.
     largeInfowindow = new google.maps.InfoWindow();
         bounds= new google.maps.LatLngBounds();
         model();
         ashish();
      

}

var model = function() {

         self = this;
         self.selectedOptionValue=ko.observable("");
        self.top_nav_heading = "GUJARAT LOCATIONS";
        self.arra=[];
        self.placeArray = ko.observableArray([]);  // this will bw the array of objects of places withtheir data contained in info array at the top
         // var i=-1;
        locations.forEach(function(infos) {
            self.placeArray().push(new maps(infos));
            self.arra.push(infos.title);
  
        });
     // self.placeArray()[0].id(0);
  
     self.selectedOptionValue.subscribe(function(newValue) {
      console.log("nevlue:"+newValue);
      console.log( self.placeArray().length);
    for (var i=0;i< self.placeArray().length;i++){
      self.placeArray()[i].id(1);
    }  
    for (var i=0;i< self.placeArray().length;i++){
      self.placeArray()[i].id(0);

    if (self.placeArray()[i].title()==newValue ){
      self.placeArray()[i].id(1);
       console.log('value of newvalue matched withh array value');
      populateInfoWindow(markers[i],markers,largeInfowindow);
      
    }
    
 }

     });
     






      }



 
  function ashish(){
       
        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i <self.placeArray().length; i++) {
          // Get the position from the location array.
          var j=self.placeArray();
          //console.log(self.placeArray()[0].title());
          var position = j[i].location();
          var title = j[i].title();
          // Create a marker per location, and put into markers array.
           var marker = new google.maps.Marker({
            
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            index: j[i].index(),
            id:j[i].id()


          });
            console.log(marker.id,i);
          // Push the marker to our array of markers.
          markers.push(marker);
          showListings();
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this,markers,largeInfowindow);
          });
           
        }
        // document.querySelector('.filter').addEventListener('click', showListings);
        // document.getElementById('hide-listings').addEventListener('click', hideListings);
      }

      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker,markers,infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
         var a=marker.index;
         console.log('inside populateInfoWindow');
       for(var i=0;i<markers.length;i++){
        if(a!==i){
           markers[i].setAnimation(null);
        }
       }

        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
           if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }

      // This function will loop through the markers array and display them all.
      function showListings() {

        for (var i = 0; i < markers.length; i++) {
          if (self.placeArray()[i].id()){
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        else{
           markers[i].setMap(null);
        }
        
      }
    map.fitBounds(bounds);
  }
        
       
      

      // This function will loop through the listings and hide them all.
      function hideListings() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }


function maps(data) {
    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);
    this.id = ko.observable(data.id);
    this.index = ko.observable(data.index);
}

ko.applyBindings(new model());
//ko.applyBindings(ashish());
