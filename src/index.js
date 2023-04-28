import * as d3 from "d3";

var svg = d3.select("#map");
var projection = d3.geoEqualEarth();
d3.json("graph.json").then(function (data) {
  d3.json("world.json").then(function (data_world) {
    projection.fitExtent(
      [
        [0, 0],
        [400, 250]
      ],
      data_world
    );
    var geoGenerator = d3.geoPath().projection(projection);
    var arr = data.nodes;
    var x = 0;
    var y = 0;
    svg
      .append("g")
      .selectAll("path")
      .data(data_world.features)
      .enter()
      .append("path")
      .attr("d", geoGenerator)
      .attr("fill", "#cbcbcb")
      .attr("stroke", "green")
      .attr("stroke-width", 0.2);
    svg
      .append("g")
      .selectAll("path")
      .data(arr)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return projection([d.lon, d.lat])[0];
      })
      .attr("cy", function (d) {
        return projection([d.lon, d.lat])[1];
      })
      .attr("r", 2);

    svg
      .append("g")
      .selectAll("path")
      .data(data.links)
      .enter()
      .append("line")
      .style("stroke", "red")
      .style("stroke-width", 2.25)
      .attr("x1", function (d) {
        return projection([d.lon1, d.lat1])[0];
      })
      .attr("y1", function (d) {
        return projection([d.lon1, d.lat1])[1];
      })
      .attr("x2", function (d) {
        return projection([d.lon2, d.lat2])[0];
      })
      .attr("y2", function (d) {
        return projection([d.lon2, d.lat2])[1];
      });
  });
});
