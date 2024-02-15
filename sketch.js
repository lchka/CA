let barCharts = [];
let data;
let cleanData = [];
let numRows;

function preload() {
  data = loadTable("data/FatalCrashes.csv", "csv", "header");
}

function setup() {
  background(50);
  createCanvas(500, 500);
  angleMode (DEGREES);

//cleans data
// console.log(data);
  numRows = data.rows.length;
  for (let i = 0; i < numRows; i++) {
    cleanData.push(data.rows[i].obj);
  }
  console.log(cleanData);

//giving the properties values

  let barChart01 = {
    data: cleanData,
    chartHeight: 200,
    chartWidth: 400,
    xPos: 50,
    yPos: 350,
    axisLineColour: "#d9d9d9",
    barWidth: 25,
    yValue:"cell-usage",
    barFill:"#fee0ff",
    textColour:"#540069",
    textRotate:45,
    textSizeText:10,
    xValue:"Age_Group",
    numTicks:5
  };

//   let barChart02 = {
//     data: cleanData,
//     chartHeight: 200,
//     chartWidth:200,
//     xPos: 50,
//     yPos: 450,
//     axisLineColour: "#d9d9d9",
//     barWidth: 5,
//     yValue:"Female"
//   };

//push new barchart
  barCharts.push(new BarChart(barChart01));
//   barCharts.push(new BarChart(barChart02));

}

function draw() {
  background(237, 249, 255);
  barCharts.forEach((bar) => bar.render());
}
