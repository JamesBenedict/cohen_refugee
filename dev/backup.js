var Chart = (function(window,d3) {

var svg, data, x, y, xAxis, yAxis, dim, chartWrapper, line, path, margin = {}, width, height;
var breakPoint = 768;

  d3.csv('js/data.csv', init); //load data, then initialize chart

  //called once the data is loaded
  function init(csv) {
    data = csv;

    //initialize scales
    xExtent = d3.extent(data, function(d,i) { return new Date(d.date) });
    yExtent = d3.extent(data, function(d,i) { return d.value });
    x = d3.time.scale().domain(xExtent);
    y = d3.scale.linear().domain(yExtent);

    //initialize axis
    xAxis = d3.svg.axis().orient('bottom');
    yAxis = d3.svg.axis().orient('left');

    //the path generator for the line chart
    line = d3.svg.line()
      .x(function(d) { return x(new Date(d.date)) })
      .y(function(d) { return y(d.value) });

    //initialize svg
    svg = d3.select('#chart').append('svg');
    chartWrapper = svg.append('g');
    path = chartWrapper.append('path').datum(data).classed('line', true);
    chartWrapper.append('g').classed('x axis', true);
    chartWrapper.append('g').classed('y axis', true);

    //render the chart
    render();
  }

  function render() {

    //get dimensions based on window size
    updateDimensions(window.innerWidth);

    //update x and y scales to new dimensions
    x.range([0, width]);
    y.range([height, 0]);

    //update svg elements to new dimensions
    svg
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom);
    chartWrapper.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //update the axis and line
    xAxis.scale(x);
    yAxis.scale(y);

    svg.select('.x.axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.select('.y.axis')
      .call(yAxis);

    path.attr('d', line);

    yAxis.scale(y).orient(window.innerWidth < breakPoint ? 'right' : 'left');

  }

  function updateDimensions(winWidth) {
    margin.top = 20;
    // margin.right = 50;
    // margin.left = 50;
    margin.right = winWidth < breakPoint ? 0 : 50;
    margin.left = winWidth < breakPoint ? 0 : 50;
    margin.bottom = 50;

    width = winWidth - margin.left - margin.right;
    // height = 500 - margin.top - margin.bottom;
    height = .7 * width; //aspect ratio is 0.7

  }

  return {
    render : render
  }

})(window,d3);

window.addEventListener('resize', Chart.render);


var annotations = [
  {
    "cx": 691,
    "cy": 337,
    "r": 72,
    "text": "Combined from 2014 and 2015 data from Senate inquiries",
    "textWidth": 200,
    "textOffset": [
      -85,
      85
    ]
  },
  {
    "cx": 440,
    "cy": 582,
    "r": 29,
    "text": "Quick note on Nauru",
    "textWidth": 200,
    "textOffset": [
      119,
      116
    ]
  },
  {
    "cx": 442,
    "cy": 288,
    "r": 32,
    "text": "Quick note on Manus",
    "textOffset": [
      58,
      -61
    ],
    "hideCircle": true
  }
]
var units = "People";

var w = document.getElementById('id');

var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 1200 - margin.left - margin.right,
    height = 640 - margin.top - margin.bottom;
 
var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; };
    // color = d3.scale.category20();

 // append the svg canvas to the page
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// Make ring notes draggable (good for testing, probably not useful for final version)
var ringNote = d3.ringNote()
  .draggable(false);

 
// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(10)
    .size([width, height])
    .nodePadding(12);

 
var path = sankey.link();
 
// load the data
d3.json("js/data.json", function(error, graph) {
 
    var nodeMap = {};
    graph.nodes.forEach(function(x) { nodeMap[x.name] = x; });
    graph.links = graph.links.map(function(x) {
      return {
        source: nodeMap[x.source],
        target: nodeMap[x.target],
        value: x.value
      };
    });
 
  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
 
// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });
 
// add the link titles
  link.append("title")
        .text(function(d) {
        return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });
 
// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
      return "translate(" + d.x + "," + d.y + ")"; })
    // .call(d3.behavior.drag()
    //   .origin(function(d) { return d; })
    //   .on("dragstart", function() { 
    //   this.parentNode.appendChild(this); })
    //   .on("drag", dragmove));
 
// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      // .style("fill", 

      //  function(d) { 
      // return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { 
      return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { 
      return d.name + "\n" + format(d.value); });
 
// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");
 

  // add in the annotations

  var gAnnotations = svg.append("g")
    .attr("class", "annotations")
    .call(ringNote, annotations);
  
  gAnnotations.selectAll(".annotation circle")
    .classed("hidden", function(d) { return d.hideCircle; });

// the function for moving the nodes
  // function dragmove(d) {
  //   d3.select(this).attr("transform", 
  //       "translate(" + (
  //            d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
  //         ) + "," + (
  //                  d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
  //           ) + ")");
  //   sankey.relayout();
  //   link.attr("d", path);


  // }



});




function resize() {
  var w = document.getElementById("container").offsetWidth;
  var h = document.getElementById("container").offsetHeight;
 
  return w, h 
}


resize();

// console.log(w);
window.addEventListener('resize', function(event){
  // w = resize()[0];
  // h = resize()[1];
  
});