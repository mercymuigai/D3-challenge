
/// generating a scatter with axis

// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

 // if the SVG area isn't empty when the browser loads,
// remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
      
    if (!svgArea.empty()) {
          svgArea.remove();
        }
      
        // SVG wrapper dimensions are determined by the current width and
        // height of the browser window.
   var svgWidth = window.innerWidth;
   var svgHeight = window.innerHeight;
      
   var margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
     };
      
   var chartHeight = svgHeight - margin.top - margin.bottom;
   var chartWidth = svgWidth - margin.left - margin.right;
      
        // Append SVG element
    var svg = d3.select("#scatter").append("svg")
          .classed("chart", true)
          .attr("height", svgHeight)
          .attr("width", svgWidth);
      
        // shift everything over by the margin and append group
    var chartGroup = svg.append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

          
// // Import data from the data.csv
d3.csv("./assets/data/data.csv").then(function(demographicData) { 

        console.log("Header",demographicData[0]);
        console.log(demographicData);


// looping through the data to get the healthcare values and convert the data values to numbers using + 
   var lowHealthcare = demographicData.map(healthData => +healthData.healthcareLow);
   console.log("healthcare", lowHealthcare);

// // looping through the data to get the poverty values
   var povertyValues = demographicData.map(povertyData => +povertyData.poverty);
    console.log("poverty", povertyValues);

    var states = demographicData.map(statesData => statesData.state);
    console.log("state", states);


/// Making of the scales
// scale y to chart height
    var yScale = d3.scaleLinear()
        .domain([2,d3.max(lowHealthcare)])
        .range([chartHeight,0])
        

// scale x to chart width
    var xScale = d3.scaleLinear()
        .domain([8,d3.max(povertyValues)])
        .range([0,chartWidth])
        // .padding(0.1); 

// create axes
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

// set x to the bottom of the chart
chartGroup.append("g")
.attr("transform", `translate(0, ${chartHeight})`)
.call(xAxis);

// set y to the y axis
chartGroup.append("g")
.call(yAxis);

// console.log(demographicData)

//     svg.append('g')
var circlesGroup = chartGroup.selectAll("circle")
  .data(demographicData)
  .enter()
    .append("circle")
    .attr("cx", function (d,i) {return xScale(d.poverty); } )
    .attr("cy", function (d) { return yScale(d.healthcareLow); } )
    .attr("r", 15) 
    .attr("fill", "blue")
    .attr("opacity", ".5")

  
chartGroup.append("text")
    .style("font-size", "10px")
    .selectAll("tspan")
    .data(demographicData)
    .enter()
    .append("tspan")
        .attr("x", function(d) {
            return xScale(d.poverty);
        })
        .attr("y", function(d) {
            return yScale(d.healthcareLow);
        })
        .text(function(d) {
            return d.abbr
  
        })
        .attr("fill", "white")
//         .style("left", d3.event.pageX + "px") // getting the circle position
// //       .style("top", d3.event.pageY + "px");


        // Create axes labels

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left )
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare ");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top })`)
      .attr("class", "axisText")
      .text("Poverty Levels (%)");


}).catch(function(error) {
  console.log(error);
});   

}
      
// When the browser loads, makeResponsive() is called.
makeResponsive();
      
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
      



