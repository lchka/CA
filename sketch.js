let barCharts = [];
let data;
let cleanData = [];
let numRows;

function preload() {
  data = loadTable("data/FatalCrashes.csv", "csv", "header");
}

function setup() {
  background(50);
  createCanvas(1200, 650);
  angleMode(DEGREES);

  //cleans data
  console.log(data);
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
    yPos: 550,
    barWidth: 25,

    //colours
    barFill: ["#F7BDD1", "#F59EBB", "#F17CA3"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",

    //text for bars
    textColour: "#0f0000",
    textRotate: 45,
    textSizeText: 13 ,

    //text for col
    textSizeColText: 24,
    colLabel: "Years",
    textColY: 75,
    textColX: 200,
    textColWeight: NORMAL,

    //text for title
    textSizeTitle: 24,
    titleText: "Fatal accidents resulting from the use of mobile devices",
    textTitleX: 0,
    textTitleY: 270,
    titlePaddingX: 400,
    titleWeight: BOLD,

    //tick and tick text
    numTicks: 5,
    ticksTextSize: 13,
    tickStyle: BOLD,

    //values
    yValue: "cell-usage",
    xValue: "Year",
  };

  //push new barchart
  barCharts.push(new BarChart(barChart01));
}

function draw() {
  background(171, 171, 188);
  barCharts.forEach((bar) => bar.render());
}
