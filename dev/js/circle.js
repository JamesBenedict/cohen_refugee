var commas = d3.format(",");


    $(function() {

        var donutData = [
{
"type": "Refugees & Asylum Seekers accepted by country since 2013",
"unit": " people of concern",
"unit2": " of total persons of concern",
"data": [
  {
    "cat": "Chad",
    "val": 1010485
  },
  {
    "cat": "Myanmar",
    "val": 810000
  },
  {
    "cat": "Bangladesh",
    "val": 695553
  },
  {
    "cat": "South Sudan",
    "val": 674887
  },
  {
    "cat": "Malaysia",
    "val": 414407
  },
  {
    "cat": "Thailand",
    "val": 374827
  },
  {
    "cat": "Other countries",
    "val": 374226
  },
  {
    "cat": "Ethiopia",
    "val": 107787
  },
  {
    "cat": "Germany",
    "val": 87518
  },
  {
    "cat": "Egypt",
    "val": 81777
  },
  {
    "cat": "United Kingdom",
    "val": 63038
  },
  {
    "cat": "India",
    "val": 50032
  },
  {
    "cat": "Turkey",
    "val": 49640
  }
],
"total": 4794177
}
];


        var donuts = new DonutCharts();
        donuts.create(donutData);


    });
    

    function DonutCharts() {

        var charts = d3.select('#donut-charts');

        var chart_m,
            chart_r,
            color = d3.scale.category20();

        var getCatNames = function(dataset) {
            var catNames = new Array();

            for (var i = 0; i < dataset[0].data.length; i++) {
                catNames.push(dataset[0].data[i].cat);
            }

            return catNames;
        }

        var createLegend = function(catNames) {
            var legends = charts.select('.legend')
                            .selectAll('g')
                                .data(catNames)
                            .enter().append('g')
                                .attr('transform', function(d, i) {
                                    return 'translate(' + (i * 150 + 50) + ', 10)';
                                });
    
            legends.append('circle')
                .attr('class', 'legend-icon')
                .attr('r', 6)
                .style('fill', function(d, i) {
                    return color(i);
                });
    
            legends.append('text')
                .attr('dx', '1em')
                .attr('dy', '.3em')
                .text(function(d) {
                    return d;
                });
        }

        var createCenter = function(pie) {

            var eventObj = {
                'mouseover': function(d, i) {
                    d3.select(this)
                        .transition()
                        .attr("r", chart_r * 0.65);
                },

                'mouseout': function(d, i) {
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .ease('bounce')
                        .attr("r", chart_r * 0.6);
                },

                'click': function(d, i) {
                    var paths = charts.selectAll('.clicked');
                    pathAnim(paths, 0);
                    paths.classed('clicked', false);
                    resetAllCenterText();
                }
            }

            var donuts = d3.selectAll('.donut');

            // The circle displaying total data.
            donuts.append("svg:circle")
                .attr("r", chart_r * 0.6)
                .style("fill", "#E7E7E7")
                .on(eventObj);
    
            donuts.append('text')
                    .attr('class', 'center-txt type')
                    .attr('y', chart_r * -0.16)
                    .attr('text-anchor', 'middle')
                    .style('font-weight', 'bold')
                    .text(function(d, i) {
                        return d.type;
                    });
            donuts.append('text')
                    .attr('class', 'center-txt value')
                    .attr('text-anchor', 'middle');
            donuts.append('text')
                    .attr('class', 'center-txt percentage')
                    .attr('y', chart_r * 0.16)
                    .attr('text-anchor', 'middle')
                    .style('fill', '#A2A2A2');
        }

        var setCenterText = function(thisDonut) {
            var sum = d3.sum(thisDonut.selectAll('.clicked').data(), function(d) {
                return commas(d.data.val);
            });

            thisDonut.select('.value')
                .text(function(d) {
                    return (sum)? commas(sum.toFixed()) + d.unit + "\n" + "worldwide (2013 - 2015)"
                                : commas(d.total.toFixed()) + d.unit;
                });
            thisDonut.select('.percentage')
                .text(function(d) {
                    return (sum)? (sum/d.total*100).toFixed(2) + '%'
                                : '';
                });
        }

        var resetAllCenterText = function() {
            charts.selectAll('.value')
                .text(function(d) {
                    return commas(d.total.toFixed()) + d.unit;
                });
            charts.selectAll('.percentage')
                .text('');
        }

        var pathAnim = function(path, dir) {
            switch(dir) {
                case 0:
                    path.transition()
                        .duration(500)
                        .ease('bounce')
                        .attr('d', d3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(chart_r)
                        );
                    break;

                case 1:
                    path.transition()
                        .attr('d', d3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(chart_r * 1.08)
                        );
                    break;
            }
        }

        var updateDonut = function() {

            var eventObj = {

                'mouseover': function(d, i, j) {
                    pathAnim(d3.select(this), 1);

                    var thisDonut = charts.select('.type' + j);
                    thisDonut.select('.value').text(function(donut_d) {
                        return d.data.cat + ": " + commas(d.data.val.toFixed());
                    });
                    thisDonut.select('.percentage').text(function(donut_d) {
                        return (d.data.val/donut_d.total*100).toFixed(2) + '% of worldwide persons of concern';
                    });
                },
                
                'mouseout': function(d, i, j) {
                    var thisPath = d3.select(this);
                    if (!thisPath.classed('clicked')) {
                        pathAnim(thisPath, 0);
                    }
                    var thisDonut = charts.select('.type' + j);
                    setCenterText(thisDonut);
                },

            };

            var pie = d3.layout.pie()
                            .sort(null)
                            .value(function(d) {
                                return d.val;
                            });

            var arc = d3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(function() {
                                return (d3.select(this).classed('clicked'))? chart_r * 1.08
                                                                           : chart_r;
                            });

            // Start joining data with paths
            var paths = charts.selectAll('.donut')
                            .selectAll('path')
                            .data(function(d, i) {
                                return pie(d.data);
                            });

            paths
                .transition()
                .duration(1000)
                .attr('d', arc);

            paths.enter()
                .append('svg:path')
                    .attr('d', arc)
                    .style('fill', function(d, i) {
                        return color(i);
                    })
                    .style('stroke', '#FFFFFF')
                    .on(eventObj)

            paths.exit().remove();

            resetAllCenterText();
        }

        this.create = function(dataset) {
            var $charts = $('#donut-charts');
            chart_m = 500 * 0.14;
            chart_r = 500 * 0.85;


            var donut = charts.selectAll('#donut-charts')
                            .classed("svg-container", true)
                            .data(dataset)
                        .enter().append('svg:svg')
                           .attr("preserveAspectRatio", "xMinYMin meet")
                             .attr("viewBox", "0 0 1000 1000")  
                             .classed("svg-content-responsive", true)                     
                            .append('svg:g')
                            .attr('class', function(d, i) {
                                return 'donut type' + i;
                            })
                            .attr('transform', 'translate(' + 500 + ',' + 500 + ')');
            createLegend(getCatNames(dataset));
            createCenter();

            updateDonut();
        }
    
        this.update = function(dataset) {
            // Assume no new categ of data enter
            var donut = charts.selectAll(".donut")
                        .data(dataset);

            updateDonut();
        }
    }
