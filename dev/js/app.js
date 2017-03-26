// function sankey(){

//     var annotations = [
//       { "cx":17.40363484621048,
//         "cy":50,
//         "r":0,
//         "text":"Refugees/asylum seekers by country. Statistics provided by DIBP Senate inquiries and monthly reports.",
//         "textWidth":200,

//         // "textOffset":[103.03830909729004, -85.63334274291992]
//         "textOffset": [50,-50]
//       }, {
//           "cx":374.68655440211296,
//           "cy":137.34067665738985,
//           "r":0,
//           "text":"Two main offshore processing centres: Nauru, and Manus,located in Papua New Guinea.",
//            "textWidth":200,
//           "textOffset":[0.07658672332764, -110.24468231201172]
//         }, {
//           "cx":1084.6315537379123,
//           "cy":70.2822499871254,
//           "r":0,
//           "text":"Desintation",
//           "textWidth":200,
//           "textOffset":[-10, -100.39649963378906]
//         }, {
//           "cx":728.0258964002132,
//           "cy":92.05903187394142,
//           "r":0,
//           "text":"Approx. 1825 people in offshore proeccessing centres in Jan. 2015.",
//           "textWidth":200,
//           "textOffset":[1.26544368267059,
//           -108.67424702644348]}];

//     var units = "People";
     
//     var margin = {top: 100, right: 50, bottom: 10, left: 50},
//         width = 1200 - margin.left - margin.right,
//         height = 740 - margin.top - margin.bottom;
     
//     var formatNumber = d3.format(",.0f"),    // zero decimal places
//         format = function(d) { return formatNumber(d) + " " + units; };
//         // color = d3.scale.category20();

//      // append the svg canvas to the page
//     var svg = d3.select("#chart")
//         .classed("svg-container", true)
//         .append("svg")
//        .attr("preserveAspectRatio", "xMinYMin meet")
//        .attr("viewBox", "0 0 1200 740")
//           .classed("svg-content-responsive", true)

//       .append("g")
//         .attr("transform", 
//               "translate(" + margin.left + "," + margin.top + ")");



//     // Make ring notes draggable (good for testing, probably not useful for final version)
//     var ringNote = d3.ringNote()
//       .draggable(false);

     
//     // Set the sankey diagram properties
//     var sankey = d3.sankey()
//         .nodeWidth(36)
//         .nodePadding(10)
//         .size([width, height])
//         .nodePadding(12);

     
//     var path = sankey.link();
     
//     // load the data
//     d3.json("js/data.json", function(error, graph) {
     
//         var nodeMap = {};
//         graph.nodes.forEach(function(x) { nodeMap[x.name] = x; });
//         graph.links = graph.links.map(function(x) {
//           return {
//             source: nodeMap[x.source],
//             target: nodeMap[x.target],
//             value: x.value
//           };
//         });
     
//       sankey
//           .nodes(graph.nodes)
//           .links(graph.links)
//           .layout(32);
     
//     // add in the links
//       var link = svg.append("g").selectAll(".link")
//           .data(graph.links)
//         .enter().append("path")
//           .attr("class", "link")
//           .attr("d", path)
//           .style("stroke-width", function(d) { return Math.max(1, d.dy); })
//           .sort(function(a, b) { return b.dy - a.dy; });
     
//     // add the link titles
//       link.append("title")
//             .text(function(d) {
//             return d.source.name + " → " + 
//                     d.target.name + "\n" + format(d.value); });
     
//     // add in the nodes
//       var node = svg.append("g").selectAll(".node")
//           .data(graph.nodes)
//         .enter().append("g")
//           .attr("class", "node")
//           .attr("transform", function(d) { 
//           return "translate(" + d.x + "," + d.y + ")"; })
//         // .call(d3.behavior.drag()
//         //   .origin(function(d) { return d; })
//         //   .on("dragstart", function() { 
//         //   this.parentNode.appendChild(this); })
//         //   .on("drag", dragmove));
     
//     // add the rectangles for the nodes
//       node.append("rect")
//           .attr("height", function(d) { return d.dy; })
//           .attr("width", sankey.nodeWidth())
//           // .style("fill", 

//           //  function(d) { 
//           // return d.color = color(d.name.replace(/ .*/, "")); })
//           .style("stroke", function(d) { 
//           return d3.rgb(d.color).darker(2); })
//         .append("title")
//           .text(function(d) { 
//           return d.name + "\n" + format(d.value); });
     
//     // add in the title for the nodes
//       node.append("text")
//           .attr("x", -6)
//           .attr("y", function(d) { return d.dy / 2; })
//           .attr("dy", ".35em")
//           .attr("text-anchor", "end")
//           .attr("transform", null)
//           .text(function(d) { return d.name; })
//         .filter(function(d) { return d.x < width / 2; })
//           .attr("x", 6 + sankey.nodeWidth())
//           .attr("text-anchor", "start");
     

//       // add in the annotations

//       var gAnnotations = svg.append("g")
//         .attr("class", "annotations")
//         .call(ringNote, annotations);
//         // selectAll(".annotation circle")
//         // .style("text-align", "left");
      
//       gAnnotations.selectAll(".annotation circle")
//         .classed("hidden", function(d) { return d.hideCircle; });


//     });



//     }

// James's code
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/150dDKz8FAgSm_yv7LB7kMV1N37XTWXOASZn1gd63M00/pubhtml';
           
function showInfo(data, tabletop) {
  var source   = $("#intro-template").html();
  var template = Handlebars.compile(source);
  $.each( tabletop.sheets("Intro").all(), function(i, work) {
    var html = template(work);
    $("#intro").append(html);
  });

  var source   = $("#countries-template").html();
  var template = Handlebars.compile(source);
  $.each( tabletop.sheets("country").all(), function(i, work) {
    var html = template(work);
    $("#countries").append(html);
  });

  var source   = $("#people-template").html();
  var template = Handlebars.compile(source);
  $.each( tabletop.sheets("people").all(), function(i, work) {
    var html = template(work);
    $("#people").append(html);
  });

  var source   = $("#donut-template").html();
  var template = Handlebars.compile(source);
  $.each( tabletop.sheets("pie").all(), function(i, work) {
    var html = template(work);
    $("#donut").append(html);
  });

  loadData();
}



    // http://leaflet-extras.github.io/leaflet-providers/preview/index.html
function map(){
  var map = L.map('map', {scrollWheelZoom:false}).setView([-15.033631, 140.279410], 3);
  new L.TileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(map);
  var createLabelIcon = function(labelClass,labelText){
    return L.divIcon({ 
      className: labelClass,
      html: labelText
    })
  }

  L.marker(new L.LatLng(-1.833631, 146.9), {icon:createLabelIcon("textLabelclass","Manus")}).addTo(map);
  L.marker(new L.LatLng(-0.421969, 166.8930322), {icon:createLabelIcon("textLabelclass","Nauru")}).addTo(map);    
}
  
// function refugeeMap(){
//   var map2 = L.map('refugeeMap', {scrollWheelZoom:false}).setView([16.381008, 67.080770], 4);
//   new L.TileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(map2);
//   var createLabelIcon = function(labelClass,labelText){
//     return L.divIcon({ 
//       className: labelClass,
//       html: labelText
//     })
//   }

//   L.marker(new L.LatLng(-1.833631, 146.9), {icon:createLabelIcon("textLabelclass","Manus")}).addTo(map2);
//   L.marker(new L.LatLng(-0.421969, 166.8930322), {icon:createLabelIcon("textLabelclass","Nauru")}).addTo(map2);    
// }


function loadData(){
  map();
  // circle();
}

$(document).ready( function() {
  Tabletop.init( { key: public_spreadsheet_url,
    callback: showInfo,
    parseNumbers: true } );
  // refugeeMap();


});






 