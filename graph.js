const jsonRectangles = [
  { "x_axis": 10, "y_axis": 10, "height": 20, "width":20, "color" : "green" },
  { "x_axis": 160, "y_axis": 40, "height": 20, "width":20, "color" : "purple" },
  { "x_axis": 70, "y_axis": 70, "height": 20, "width":20, "color" : "blue" }];

let max_x = 0;
let max_y = 0;

for (let i = 0; i < jsonRectangles.length; i++){
  let temp_x, temp_y;
  temp_x = jsonRectangles[i].x_axis + jsonRectangles[i].width;
  temp_y = jsonRectangles[i].y_axis + jsonRectangles[i].height;
  if (temp_x > max_x){max_x = temp_x;}
  if (temp_y > max_y){max_y = temp_y;}
}

let svgContainer = d3.select("body").append("svg")
  .attr("width", max_x + 20)
  .attr("height", max_y + 20);

let rectangles = svgContainer.selectAll("rect")
  .data(jsonRectangles)
  .enter()
  .append("rect");

let rectangleAttributes = rectangles
  .attr("x", function (d) {return d.x_axis;})
  .attr("y", function (d) {return d.y_axis;})
  .attr("height", function (d) {return d.height;})
  .attr("width", function (d) {return d.width;})
  .style("fill", function(d) {return d.color;});
