
$( document ).ready(function() {

  var map = L.map('map', {scrollWheelZoom:false}).setView([-16.033631, 140.279410], 4);
  new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
  L.marker(new L.LatLng(-1.833631, 146.9), {icon:createLabelIcon("textLabelclass","Manus")}).addTo(map);
  L.marker(new L.LatLng(-0.421969, 166.8930322), {icon:createLabelIcon("textLabelclass","Nauru")}).addTo(map);
  
})

var createLabelIcon = function(labelClass,labelText){
  return L.divIcon({ 
    className: labelClass,
    html: labelText
  })
}
  

