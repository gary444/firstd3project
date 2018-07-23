


// let svgContainer = d3.select("body").append("svg")
//   .attr("width", 200)
//   .attr("height", 200);
//
// let rect1 = svgContainer.append("rect")
//   .attr("x", 0)
//   .attr("y", 0)
//   .attr("width", 100)
//   .attr("height", 200)
//   .style("fill", "red");
//
// let rect2 = svgContainer.append("rect")
//   .attr("x", 100)
//   .attr("y", 0)
//   .attr("width", 100)
//   .attr("height", 100)
//   .style("fill", "blue");


d3.json("data/events_7298.json")
.then(function(data) {

  console.log(data.length);

  let num_events = 0;
  let num_passes = 0;

  // for (var i = 0; i < 2; i++) {
  for (var i = 0; i < data.length; i++) {
  // for (d in data) {
    if (data[i].type.name === "Pass"){
      num_passes++;
    }
    num_events++;
  }

  let svgContainer = d3.select("body").append("svg")
    .attr("width", 200)
    .attr("height", 200);

  let rect1 = svgContainer.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 100)
    .attr("height", 200)
    .style("fill", "red");

  let rect2 = svgContainer.append("rect")
    .attr("x", 100)
    .attr("y", 0)
    .attr("width", 100)
    .attr("height", 200 * (num_passes/num_events))
    .style("fill", "blue");


    console.log(num_events);
    console.log(num_passes);


});
