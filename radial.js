
//create svg container
let svgContainer = d3.select("body").append("svg")
  .attr("width", 400)
  .attr("height", 400);

//load json data
d3.json("data/test.json")
.then(function (data) {

  data = radialLayout(data, [0,0], 50);

  svgContainer.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("cx", function(d) {return d.id * 30;})
    .attr("cy", function(d) {return d.id * 30;})
    .attr("r", 20)
    .style("fill", "red");
});

//for each data point calculate position
//take center point and angle derived from number of nodes
function radialLayout (data, center_point, radius){

  let angleStep = 360.0 / data.length;

  //calc dx and dy from angle and radius
  for (var i = 0; i < data.length; i++) {


    //TODO - implement layout calculation
    
    // let dx
    //
    // data[i]
  }

  return data;
}
