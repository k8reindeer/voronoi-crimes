Crimes = new Meteor.Collection("crimes")
if (Meteor.isClient) {
  // Template.hello.greeting = function () {
  //   return "Welcome to finalproject.";
  // };

  // Template.hello.events({
  //   'click input': function () {
  //     // template data, if any, is available in 'this'
  //     if (typeof console !== 'undefined')
  //       console.log("You pressed the button");
  //   }
  // });
  Template.map.rendered=function(){
        var mapOptions = {
        center: new google.maps.LatLng(37.759, -122.442),
        zoom: 12
      };
      var map = new google.maps.Map(document.getElementById("map-canvas"),
          mapOptions);

      crimes = Crimes.find({}).fetch()
      console.log(crimes)
      for(var i=0;i<crimes.length;i++){
        console.log(crimes[i])
         var marker = new google.maps.Marker({
          position: new google.maps.LatLng(crimes[i].lat, crimes[i].lng),
          title:'Meine Position',
          icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
        marker.setMap(map); 
      }

  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {


    var data = {};
    data = JSON.parse(Assets.getText("data.json"));
    //console.log(data["data"][0])
    numpoints=100//data["data"].length

    for(var i=0;i<numpoints;i++){
      row=data["data"][i]

      //console.log(row[9],row[18],row[17])
      exists = Crimes.find({num:row[0]}).fetch()
      if(exists.length){
        // do nothing
      }else{
        crimeId= Crimes.insert({
          'num':row[0],
          'type': row[9],
          'lat': row[18],
          'lng': row[17],
        })
      }

      //console.log(crimeId)
    }

    // code to run on server at startup
  });

}
