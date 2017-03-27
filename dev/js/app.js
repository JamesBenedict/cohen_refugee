function sankey(){
  var annotations = [ {
  "cx": 17.40363484621048,
  "cy": 50,
  "r": 0,
  "text": "Refugees/asylum seekers by country.",
  "textWidth": 200,
  "textOffset": [90.03830909729004, -75.63334274291992 ]
}, {
  "cx": 374.68655440211296,
  "cy": 137.34067665738985,
  "r": 0,
  "text": "Two main offshore processing centres: Nauru, and Manus, located in Papua New Guinea.",
  "textWidth": 200,
  "textOffset": [ 100.07658672332764, -124.24468231201172 ]
}, {
  "cx": 1084.6315537379123,
  "cy": 70.2822499871254,
  "r": 0,
  "text": "Desintation",
  "textWidth": 200,
  "textOffset": [ 0.16810643672943, -110.39649963378906 ]
}, {
  "cx": 728.0258964002132,
  "cy": 92.05903187394142,
  "r": 0,
  "text": "Approx. 1825 people in offshore proeccessing centres in Jan. 2015.",
  "textWidth": 200,
  "textOffset": [ 61.26544368267059, -90.67424702644348 ]
} ];
var units = "People";
var margin = {
    top: 100,
    right: 50,
    bottom: 10,
    left: 50
  },
  width = 1200 - margin.left - margin.right,
  h = $(window).height();
  height = h *.9 - margin.top - margin.bottom;
var formatNumber = d3.format( ",.0f" ), // zero decimal places
  format = function( d ) {
    return formatNumber( d ) + " " + units;
  };
// color = d3.scale.category20();
// append the svg canvas to the page
var svg = d3.select( "#chart" ).classed( "svg-container", true ).append( "svg" )
  .attr( "preserveAspectRatio", "xMinYMin meet" ).attr( "viewBox",
    "0 0 1200 740" ).classed( "svg-content-responsive", true ).append( "g" ).attr(
    "transform", "translate(" + margin.left + "," + margin.top + ")" );
// Make ring notes draggable (good for testing, probably not useful for final version)
var ringNote = d3.ringNote().draggable( false );
// Set the sankey diagram properties
var sankey = d3.sankey().nodeWidth( 36 ).nodePadding( 10 ).size( [ width,
  height
] ).nodePadding( 12 );
var path = sankey.link();
// load the data
d3.json( "../js/data.json", function( error, graph ) {
  var nodeMap = {};
  graph.nodes.forEach( function( x ) {
    nodeMap[ x.name ] = x;
  } );
  graph.links = graph.links.map( function( x ) {
    return {
      source: nodeMap[ x.source ],
      target: nodeMap[ x.target ],
      value: x.value
    };
  } );
  sankey.nodes( graph.nodes ).links( graph.links ).layout( 32 );
  // add in the links
  var link = svg.append( "g" ).selectAll( ".link" ).data( graph.links ).enter()
    .append( "path" ).attr( "class", "link" ).attr( "d", path ).style(
      "stroke-width",
      function( d ) {
        return Math.max( 1, d.dy );
      } ).sort( function( a, b ) {
      return b.dy - a.dy;
    } );
  // add the link titles
  link.append( "title" ).text( function( d ) {
    return d.source.name + " → " + d.target.name + "\n" + format( d.value );
  } );
  // add in the nodes
  var node = svg.append( "g" ).selectAll( ".node" ).data( graph.nodes ).enter()
    .append( "g" ).attr( "class", "node" ).attr( "transform", function( d ) {
      return "translate(" + d.x + "," + d.y + ")";
    } )
    // .call(d3.behavior.drag()
    //   .origin(function(d) { return d; })
    //   .on("dragstart", function() { 
    //   this.parentNode.appendChild(this); })
    //   .on("drag", dragmove));
    // add the rectangles for the nodes
  node.append( "rect" ).attr( "height", function( d ) {
      return d.dy;
    } ).attr( "width", sankey.nodeWidth() )
    // .style("fill", 
    //  function(d) { 
    // return d.color = color(d.name.replace(/ .*/, "")); })
    .style( "stroke", function( d ) {
      return d3.rgb( d.color ).darker( 2 );
    } ).append( "title" ).text( function( d ) {
      return d.name + "\n" + format( d.value );
    } );

  // add in the title for the nodes
  node.append( "text" ).attr( "x", -6 ).attr( "y", function( d ) {
    return d.dy / 2;
  } ).attr( "dy", ".35em" ).attr( "text-anchor", "end" ).attr( "transform",
    null ).text( function( d ) {
    return d.name;
  } ).filter( function( d ) {
    return d.x < width / 2;
  } ).attr( "x", 6 + sankey.nodeWidth() ).attr( "text-anchor", "start" );
  // add in the annotations
  var gAnnotations = svg.append( "g" ).attr( "class", "annotations" ).call(
    ringNote, annotations );
  gAnnotations.selectAll( ".annotation circle" ).classed( "hidden", function(
    d ) {
    return d.hideCircle;
  } );
} );

}

function circle(){
            var commas = d3.format( "," );
            $( function() {
            var donutData = [ {
              "type": "Asylum Countries for Iran, Myanmar and Sudan",
              "unit": " persons of concern (2013 - 2015)",
              "data": [ {
                "cat": "Chad",
                "val": 1010485
              }, {
                "cat": "Myanmar",
                "val": 810000
              }, {
                "cat": "Bangladesh",
                "val": 695553
              }, {
                "cat": "South Sudan",
                "val": 674887
              }, {
                "cat": "Malaysia",
                "val": 414407
              }, {
                "cat": "Thailand",
                "val": 374827
              }, {
                "cat": "Other countries",
                "val": 374226
              }, {
                "cat": "Ethiopia",
                "val": 107787
              }, {
                "cat": "Germany",
                "val": 87518
              }, {
                "cat": "Egypt",
                "val": 81777
              }, {
                "cat": "United Kingdom",
                "val": 63038
              }, {
                "cat": "India",
                "val": 50032
              }, {
                "cat": "Turkey",
                "val": 49640
              }, {
                "cat": "Australia",
                "val": 20859
              } ],
              "total": 4773318
            } ];
            var donuts = new DonutCharts();
            donuts.create( donutData );
          } );

          function DonutCharts() {
            var charts = d3.select( '#donut-charts' );
            var chart_m,
              chart_r,
              color = d3.scale.category20();
            var getCatNames = function( dataset ) {
              var catNames = new Array();
              for ( var i = 0; i < dataset[ 0 ].data.length; i++ ) {
                catNames.push( dataset[ 0 ].data[ i ].cat );
              }
              return catNames;
            }
            var createLegend = function( catNames ) {
              var legends = charts.select( '.legend' ).selectAll( 'g' ).data( catNames ).enter()
                .append( 'g' ).attr( 'transform', function( d, i ) {
                  return 'translate(' + ( i * 150 + 50 ) + ', 10)';
                } );
              legends.append( 'circle' ).attr( 'class', 'legend-icon' ).attr( 'r', 6 ).style(
                'fill',
                function( d ) {
                  return 'rgba(31, 119, 180,' + d.data.val / donut_d.total * 100 + ' )'
                } );
              legends.append( 'text' ).attr( 'dx', '1em' ).attr( 'dy', '.3em' ).text(
                function( d ) {
                  return d;
                } );
            }
            var createCenter = function( pie ) {
              var eventObj = {
                'mouseover': function( d, i ) {
                  d3.select( this ).transition().attr( "r", chart_r * 0.65 );
                },
                'mouseout': function( d, i ) {
                  d3.select( this ).transition().duration( 500 ).ease( 'bounce' ).attr(
                    "r", chart_r * 0.6 );
                },
                'click': function( d, i ) {
                  var paths = charts.selectAll( '.clicked' );
                  pathAnim( paths, 0 );
                  paths.classed( 'clicked', false );
                  resetAllCenterText();
                }
              }
              var donuts = d3.selectAll( '.donut' );
              // The circle displaying total data.
              donuts.append( "svg:circle" ).attr( "r", chart_r * 0.6 ).style( "fill",
                "#E7E7E7" ).on( eventObj );
              donuts.append( 'text' ).attr( 'class', 'center-txt type' ).attr( 'y',
                chart_r * -0.16 ).attr( 'text-anchor', 'middle' ).style( 'font-weight',
                'bold' ).text( function( d, i ) {
                return d.type;
              } );
              donuts.append( 'text' ).attr( 'class', 'center-txt value' ).attr(
                'text-anchor', 'middle' );
              donuts.append( 'text' ).attr( 'class', 'center-txt percentage' ).attr( 'y',
                chart_r * 0.16 ).attr( 'text-anchor', 'middle' ).style( 'fill', '#A2A2A2' );
            }
            var setCenterText = function( thisDonut ) {
              var sum = d3.sum( thisDonut.selectAll( '.clicked' ).data(), function( d ) {
                return commas( d.data.val );
              } );
              thisDonut.select( '.value' ).text( function( d ) {
                return ( sum ) ? commas( sum.toFixed() ) + d.unit + "\n" +
                  "worldwide (2013 - 2015)" : commas( d.total.toFixed() ) + d.unit;
              } );
              thisDonut.select( '.percentage' ).text( function( d ) {
                return ( sum ) ? ( sum / d.total * 100 ).toFixed( 2 ) + '%' : '';
              } );
            }
            var resetAllCenterText = function() {
              charts.selectAll( '.value' ).text( function( d ) {
                return commas( d.total.toFixed() ) + d.unit;
              } );
              charts.selectAll( '.percentage' ).text( '' );
            }
            var pathAnim = function( path, dir ) {
              switch ( dir ) {
                case 0:
                  path.transition().duration( 500 ).ease( 'bounce' ).attr( 'd', d3.svg.arc()
                    .innerRadius( chart_r * 0.7 ).outerRadius( chart_r ) );
                  break;
                case 1:
                  path.transition().attr( 'd', d3.svg.arc().innerRadius( chart_r * 0.7 ).outerRadius(
                    chart_r * 1.08 ) );
                  break;
              }
            }
            var updateDonut = function() {
              var eventObj = {
                'mouseover': function( d, i, j ) {
                  pathAnim( d3.select( this ), 1 );
                  var thisDonut = charts.select( '.type' + j );
                  thisDonut.select( '.value' ).text( function( donut_d ) {
                    return commas( d.data.val.toFixed() ) +
                      " persons of concern recieved by " + d.data.cat;
                  } );
                  thisDonut.select( '.percentage' ).text( function( donut_d ) {
                    return ( d.data.val / donut_d.total * 100 ).toFixed( 2 ) + '%';
                  } );
                },
                'mouseout': function( d, i, j ) {
                  var thisPath = d3.select( this );
                  if ( !thisPath.classed( 'clicked' ) ) {
                    pathAnim( thisPath, 0 );
                  }
                  var thisDonut = charts.select( '.type' + j );
                  setCenterText( thisDonut );
                },
              };
              var pie = d3.layout.pie().sort( null ).value( function( d ) {
                return d.val;
              } );
              var arc = d3.svg.arc().innerRadius( chart_r * 0.7 ).outerRadius( function() {
                return ( d3.select( this ).classed( 'clicked' ) ) ? chart_r * 1.08 :
                  chart_r;
              } );
              // Start joining data with paths
              var paths = charts.selectAll( '.donut' ).selectAll( 'path' ).data( function(
                d, i ) {
                return pie( d.data );
              } );
              paths.transition().duration( 1000 ).attr( 'd', arc );
              // var o = d3.scale.ordinal()
              //     .domain(d.val)
              //     .rangePoints([0, 1]);
              paths.enter().append( 'svg:path' ).attr( 'd', arc ).style( 'fill', function(
                  d, i ) {
                  var percents = [ 0.84677786,
                    0.67877313,
                    0.582867515,
                    0.565549582,
                    0.347269551,
                    0.3149809,
                    0.313598214,
                    0.090324592,
                    0.073339342,
                    0.068528432,
                    0.052825309,
                    0.041926392,
                    0.041597899,
                    0.017479665
                  ]
                  return 'rgba(14, 21, 49,' + ( percents[ i ] + .15 ) + ')';
                } )
                // return color(i);})                    
                .style( 'stroke', '#FFFFFF' ).on( eventObj )
              paths.exit().remove();
              resetAllCenterText();
            }
            this.create = function( dataset ) {
              var $charts = $( '#donut-charts' );
              chart_m = 500 * 0.14;
              chart_r = 500 * 0.85;
              var donut = charts.selectAll( '#donut-charts' ).classed( "svg-container",
                  true ).data( dataset ).enter().append( 'svg:svg' ).attr(
                  "preserveAspectRatio", "xMinYMin meet" ).attr( "viewBox", "0 0 1000 1000" )
                .classed( "svg-content-responsive", true ).append( 'svg:g' ).attr( 'class',
                  function( d, i ) {
                    return 'donut type' + i;
                  } ).attr( 'transform', 'translate(' + 500 + ',' + 500 + ')' );
              createCenter();
              updateDonut();
            }
            this.update = function( dataset ) {
              // Assume no new categ of data enter
              var donut = charts.selectAll( ".donut" ).data( dataset );
              updateDonut();
            }
          }
}

// James's code
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/150dDKz8FAgSm_yv7LB7kMV1N37XTWXOASZn1gd63M00/pubhtml';
           
function showInfo(data, tabletop) {
  var source   = $("#intro-template").html();
  var template = Handlebars.compile(source);
  $.each( tabletop.sheets("Intro").all(), function(i, work) {
    var html = template(work);
    $("#intro").append(html);
  });


  var source   = $("#donut-template").html();
  var template = Handlebars.compile(source);
  $.each( tabletop.sheets("pie").all(), function(i, work) {
    var html = template(work);
    $("#donut").append(html);
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

  
  loadData();
}

function footer(){
  h = $(window).width();
  $('.footer').css('width', h).css('height', 'auto').css('position', 'absolute').css('left', '0').css('margin-top', '10em');
}

    // http://leaflet-extras.github.io/leaflet-providers/preview/index.html
function map(){
  var Lat = -5.033631,
  Long = 120.279410,
  zoom= 3
  map = L.map('map', {zoomControl:false, minZoom: zoom, scrollWheelZoom:false}).setView([Lat , Long], zoom);
  new L.TileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(map);
  var createLabelIcon = function(labelClass,labelText){
    return L.divIcon({ 
      className: labelClass,
      html: labelText
    })
  }

// var myIcon = L.icon({
//   iconUrl: 'images/marker-icon.png',
//   iconSize: [20, 20],
//   iconAnchor: [10, 10],
//   labelAnchor: [6, 0] // as I want the label to appear 2px past the icon (10 + 2 - 6)
// });
// L.marker([-1.833631, 146.9], {
//   icon: myIcon
// }).bindLabel('My label', {
//   noHide: true,
//   direction: 'auto'
// });

L.marker([-1.933631, 146.9]).addTo(map);

L.marker([-0.421969, 166.8930322]).addTo(map);


  L.marker(new L.LatLng(-1.833631, 146.9), {icon:createLabelIcon("textLabelclass","Manus")}).addTo(map);
  L.marker(new L.LatLng(-0.421969, 166.8930322), {icon:createLabelIcon("textLabelclass","Nauru")}).addTo(map);   

  $('#reset_zoom').click(function(){
    map.setView(new L.LatLng(Lat , Long), zoom);
  })
  
  // map.setView(new L.LatLng(40.737, -73.923), 8);


}

  
function refugeeMap(){
  var map2 = L.map('refugeeMap', {scrollWheelZoom:false}).setView([16.381008, 67.080770], 4);
  new L.TileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(map2);
  var createLabelIcon = function(labelClass,labelText){
    return L.divIcon({ 
      className: labelClass,
      html: labelText
    })
  }

  L.marker(new L.LatLng(-1.833631, 146.9), {icon:createLabelIcon("textLabelclass","Manus")}).addTo(map2);
  L.marker(new L.LatLng(-0.421969, 166.8930322), {icon:createLabelIcon("textLabelclass","Nauru")}).addTo(map2);    
}


function loadData(){
  map();
  circle();
  sankey();
  footer();
  $('#data').css('visibility', 'visible');
  $('#case').css('visibility', 'visible');
  $('.footer').css('visibility', 'visible');
  // $('#case').css('display', 'inline');

}

$(document).ready( function() {
  Tabletop.init( { key: public_spreadsheet_url,
    callback: showInfo,
    parseNumbers: true } );
  // refugeeMap();

  
});






 