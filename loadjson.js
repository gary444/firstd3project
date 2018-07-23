const pitch_width = 800;
const pitch_length = 500;

let svgContainer = d3.select("body").append("svg")
  .attr("width", pitch_width)
  .attr("height", pitch_length);

let pitch = svgContainer.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", pitch_width)
  .attr("height", pitch_length)
  .style("fill", "green");

//abs pitch values: x [0 120] y [0 80]
let pitchXScale = d3.scaleLinear()
  .domain([0,120])
  .range([0, pitch_width]);
let pitchYScale = d3.scaleLinear()
  .domain([0,80])
  .range([0, pitch_length]);

//gives line correct colour
function lineColor(d){
  if (d.team.id === 746) {return "#5de2ce";} //man city
  else if (d.team.id === 745) {return "#1a26ce";} //chelsea
}


d3.json("data/events_7298.json")
.then(function(data) {

  let passes = [];

  for (var i = 0; i < data.length; i++) {
    //create shorter array from only passes
    if (data[i].type.name === "Pass"){
      passes.push(data[i]);
    }
  }

  svgContainer.selectAll("line")
    .data(passes)
    .enter().append("line")
    .attr("x1", function(d) {return pitchXScale(d.location[0]);})
    .attr("y1", function(d) {return pitchYScale(d.location[1]);})
    .attr("x2", function(d) {return pitchXScale(d.pass.end_location[0]);})
    .attr("y2", function(d) {return pitchYScale(d.pass.end_location[1]);})
    .attr("stroke-width", 2)
    .attr("stroke", lineColor);

});
