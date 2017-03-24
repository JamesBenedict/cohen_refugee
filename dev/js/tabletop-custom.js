var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/150dDKz8FAgSm_yv7LB7kMV1N37XTWXOASZn1gd63M00/pubhtml';

      $(document).ready( function() {
        Tabletop.init( { key: public_spreadsheet_url,
                         callback: showInfo,
                         parseNumbers: true } );
      });
        
      function showInfo(data, tabletop) {
        var source   = $("#intro-template").html();
        var template = Handlebars.compile(source);

        $.each( tabletop.sheets("Intro").all(), function(i, work) {
          var html = template(work);
          $("#intro-content").append(html);
        });

        map();
      }
    

function map(){
  var map = L.map('map', {scrollWheelZoom:false}).setView([-16.033631, 140.279410], 4);
  new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  var createLabelIcon = function(labelClass,labelText){
    return L.divIcon({ 
      className: labelClass,
      html: labelText
    })
  }
  
  L.marker(new L.LatLng(-1.833631, 146.9), {icon:createLabelIcon("textLabelclass","Manus")}).addTo(map);
  L.marker(new L.LatLng(-0.421969, 166.8930322), {icon:createLabelIcon("textLabelclass","Nauru")}).addTo(map);
  


  
  
}
 

     




// $(function() { init() });

// 			var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1WuhbvcNVx_Rx1_ze50WheK1n2j9djFhyXqABE19NNVc/pubhtml';

// 			// once tabletop is ready, call the function showInfo
// 			function init() {
// 				Tabletop.init( { 
// 					key: public_spreadsheet_url,
// 				    callback: showInfo,
// 				    simpleSheet: true } )
// 			}
			

// 			// showInfo understands that data comes from the key we set up in Tabletop.init
// 			function showInfo(data, tabletop) {
// 				var source   = $("#table-template").html();
// 				var template = Handlebars.compile(source);

// 				// these are for the individual lines
// 				// document.getElementById("simple-table").innerHTML = "<strong>Months:</strong> " + [ data[0].Name, data[1].Name, data[2].Name ].join(", ") 
// 		  //       + "<br> <strong>Weather: </strong>" + [ data[0].Weather, data[1].Weather, data[2].Weather ].join(", ")
// 		  //       + "<br> <strong>Average: </strong>" + [ data[0].Average, data[1].Average, data[2].Average ].join(", ");
// 		  //       console.log(data);
				
// 				$("#live-table").append("<tr class='hidden-header'><th><b>Month</b></th><b>" + "<th>Weather</th>" + "<th>Average</th> <th>Sunlight</th></tr>");

// 				$.each(tabletop.sheets("tabletopTest").all(), function(i, element) {
// 					var html = template(element);
// 					$("#live-table").append(html);
// 				});


		        

				
// 			}



// // document.write("The published spreadsheet is located at <a target='_new' href='" + public_spreadsheet_url + "'>" + public_spreadsheet_url + "</a>");  


// // Full table tabletop w/handlebars
// // When the document is ready, initialize tabletop.js
