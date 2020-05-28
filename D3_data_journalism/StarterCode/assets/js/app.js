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
   var healthcareValues = demographicData.map(healthData => +healthData.healthcare);
   console.log("healthcare", healthcareValues);

// // looping through the data to get the poverty values
   var povertyValues = demographicData.map(povertyData => +povertyData.poverty);
    console.log("poverty", povertyValues);

    var states = demographicData.map(statesData => statesData.state);
    console.log("state", states);


/// Making of the scales
// scale y to chart height
    var yScale = d3.scaleLinear()
        .domain([0,d3.max(healthcareValues)])
        .range([chartHeight,0])
        

// scale x to chart width
    var xScale = d3.scaleLinear()
        .domain([0,d3.max(povertyValues)])
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


// / Step 5: Create Circles
    // ==============================
//     var circlesGroup = chartGroup.selectAll("circle")
//     .data(demographicData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d.povertyValues))
//     .attr("cy", d => yLinearScale(d.healthcareValues))
//     .attr("r", "15")
//     .attr("fill", "blue")
//     .attr("opacity", ".5");

console.log(demographicData)
//     svg.append('g')
  chartGroup.selectAll("circle")
  .data(demographicData)
  .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d.povertyValues); } )
    .attr("cy", function (d) { return yScale(d.healthcareValues); } )
    .attr("r", 5) 
      // .style("fill", function (d) { return (d.povertyValues) } )
    

    // Step 6: Initialize tool tip
    // ==============================
//     var toolTip = d3.tip()
//       .attr("class", "tooltip")
//       .offset([80, -60])
//       .html(function(d) {
//         return (`${d.healthcareValues}: ${d.povertyValues}`);
//       });

//     // Step 7: Create tooltip in the chart
//     // ==============================
//     chartGroup.call(toolTip);

//     // Step 8: Create event listeners to display and hide the tooltip
//     // ==============================
//     circlesGroup.on("click", function(data) {
//       toolTip.show(data, this);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Healthcare ");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Poverty Level");
}).catch(function(error) {
  console.log(error);
});   

}
      
// When the browser loads, makeResponsive() is called.
makeResponsive();
      
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
      

// // create axes
// var yAxis = d3.axisLeft(yScale);
// var xAxis = d3.axisBottom(xScale); // this gives the labels


// // set x to the bottom of the chart
// chartGroup.append("g")
//   .attr("transform", `translate(0, ${chartHeight})`) // go to 0,0 and place everything there
//   .call(xAxis);

// // set y to the y axis
// // This syntax allows us to call the axis function
// // and pass in the selector without breaking the chaining
// chartGroup.append("g")
//   .call(yAxis);


// You need to create a scatter plot between two of the data variables 
// such as Healthcare vs. Poverty or Smokers vs. Age.

// Using the D3 techniques we taught you in class, create a scatter 
// plot that represents each state with circle elements. You'll code 
// this graphic in the app.js file of your homework discatterory—make sure 
// you pull in the data from data.csv by using the d3.csv function. 
// Your scatter plot should ultimately appear like the image at the top
//  of this section.



//   // Step 4: Parse the data
//   // Format the data and convert to numerical and date values
//   // =================================
//   // Create a function to parse date and time
//   var parseTime = d3.timeParse("%d-%b");

//   // Format the data
//   donutData.forEach(function(data) {
//     data.date = parseTime(data.date);
//     data.morning = +data.morning;
//     data.evening = +data.evening;
//   });

//   // Step 5: Create Scales
//   //= ============================================
//   var xTimeScale = d3.scaleTime()
//     .domain(d3.extent(donutData, d => d.date)) // using entire extent of the data
//     .range([0, width]); // 0 to the end

//   var yLinearScale1 = d3.scaleLinear()
//     .domain([0, d3.max(donutData, d => d.morning)])
//     .range([height, 0]);

//   var yLinearScale2 = d3.scaleLinear()
//     .domain([0, d3.max(donutData, d => d.evening)])
//     .range([height, 0]);

//   // Step 6: Create Axes (bottom axes)
//   // =============================================
//   var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%d-%b"));// d is for the day and b for..
//   var leftAxis = d3.axisLeft(yLinearScale1);
//   var rightAxis = d3.axisRight(yLinearScale2);


//   // Step 7: Append the axes to the chartGroup
//   // ==============================================
//   // Add bottomAxis
//   chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

//   // Add leftAxis to the left side of the display
//   chartGroup.append("g").call(leftAxis);

//   // Add rightAxis to the right side of the display
//   chartGroup.append("g").attr("transform", `translate(${width}, 0)`).call(rightAxis);


//   // Step 8: Set up two line generators and append two SVG paths
//   // ==============================================
//   // Line generators for each line
//   var line1 = d3
//     .line()
//     .x(d => xTimeScale(d.date))
//     .y(d => yLinearScale1(d.morning));

//   var line2 = d3
//     .line()
//     .x(d => xTimeScale(d.date))
//     .y(d => yLinearScale2(d.evening));


//   // Append a path for line1
//   chartGroup.append("path")
//     .data([donutData])
//     .attr("d", line1)
//     .classed("line green", true);

//   // Append a path for line2
//   chartGroup.append("path")
//     .data([donutData])
//     .attr("d", line2)
//     .classed("line orange", true);




