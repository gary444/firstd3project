
//create svg container
let svgContainer = d3.select("body").append("svg")
  .attr("width", 500)
  .attr("height", 500);

//create groups
let circleGroup = svgContainer.append("g");
let linkGroup = svgContainer.append("g");

const center_point = [250,250];
const radius = 200;
const num_nodes = 14;
const angleStep = 2.0 * Math.PI / num_nodes;
let beta = 0.60;


//single radial line example
// let radialLineGenerator = d3.radialLine()
//   .curve(d3.curveBundle.beta(0.85));
// let points = [
//   [0, 80],
//   [Math.PI * 0.25, 80],
//   [Math.PI * 0.5, 30],
//   [Math.PI * 0.75, 80],
//   [Math.PI, 80],
//   [Math.PI * 1.25, 80],
//   [Math.PI * 1.5, 80],
//   [Math.PI * 1.75, 80],
//   [Math.PI * 2, 80]
// ];
// let pathData = radialLineGenerator(points);
// linkGroup.append("path")
//   .attr("d", pathData)
//   .attr("stroke", "black")
//   .attr("stroke-opacity", 0.4)
//   .style("fill", "none");
// linkGroup.attr("transform", "translate(" + center_point[0] + "," + center_point[1] + ")");




//load json data
d3.json("data/test.json")
.then(function (data) {

  //pass data to layout function to add coordinates
  let nodeData = radialLayout(data, center_point, radius);
  let linkData = getLinkData(nodeData);

  console.log(linkData);

  circleGroup.selectAll("circle")
    .data(nodeData)
    .enter().append("circle")
    .attr("cx", (d) => {return d.cx;})
    .attr("cy", (d) => {return d.cy;})
    .attr("r", 20)
    .style("fill", "blue");

    //// TODO: get lines working from Array
    // Explore using the link class:
    // https://bl.ocks.org/mbostock/7607999
    // https://github.com/d3/d3/blob/master/API.md#paths-d3-path

  let linkGen = d3.line()
    // .x((d) => {
    //   return d[0];
    // })
    // .y((d) => {
    //   return d[1];
    // })
    .curve(d3.curveBundle.beta(beta));
  let pathData = linkGen(linkData);

  console.log(pathData);

  linkGroup.selectAll("path")
    .data(linkData)
    .enter().append("path")
      .attr("stroke", "black")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 10)
      .attr("d", pathData)
      .style("fill", "none");




  // linkGroup.selectAll("path")
  //   .data(linkData)
  //   .enter().append("path")
  //   .each(function (d) {d.sourceNode = d[0], d.targetNode = d[1]; })
  //   .attr("stroke", "black")
  //   .attr("stroke-opacity", 0.4)
  //   .attr("d", pathData);

  // console.log(data);

  // let lineGen = d3.line()
  //   .x((d,i) => {
  //     if (i === 1) {
  //       return center_point[0];
  //     }
  //     return nodeData[d].cx;
  //   })
  //   .y((d,i) => {
  //     if (i === 1) {
  //       return center_point[1];
  //     }
  //     return nodeData[d].cy;
  //   })
  //   .curve(d3.curveBundle.beta(beta));

  // linkData = [3,0,7];
  // let pathData = lineGen(linkData);

  // linkGroup.append("path")
  //   .attr("d", pathData)
  //   .attr("stroke", "black")
  //   .attr("stroke-opacity", 0.4)
  //   .attr("stroke-width", 10)
  //   .style("fill", "none");
  // linkGroup.attr("transform", "translate(" + center_point[0] + "," + center_point[1] + ")");



});

//for each data point calculate position
//take center point and angle derived from number of nodes
function radialLayout (data, center_point, radius){
  let angleStep = 2.0 * Math.PI / data.length;
  //calc dx and dy from angle and radius
  for (var i = 0; i < data.length; i++) {
    const angle = angleStep * i;
    const dx = radius * Math.sin(angle);
    const dy = radius * Math.cos(angle);
    //add coords to data
    data[i].cx = center_point[0] + dx;
    data[i].cy = center_point[1] + dy;
  }
  return data;
}

//provides an array of links
//each link has a pair of coords for start, middle, and end
function getLinkData (nodeData){
  let linkData = new Array(nodeData.length - 1);
  for (let i = 0; i < nodeData.length-1; i++) {
    let linkCoords = [
      [nodeData[0].cx, nodeData[0].cy],
      center_point,
      [nodeData[i+1].cx, nodeData[i+1].cy],
    ]
    linkData[i] = linkCoords;
  }
  return linkData;
}
