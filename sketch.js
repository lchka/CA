let barCharts = [];
let data;
let cleanData = [];
let numRows;

function preload() {
  data = loadTable("data/FatalCrashes.csv", "csv", "header");
}

function setup() {
  background(50);
  createCanvas(1000, 650);
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
    chartWidth: 350,
    xPos: 40,
    yPos: 570,
    barWidth: 25,

    //colours
    barFill: ["#F7BDD1", "#F59EBB", "#F17CA3"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",

    //text for X AXIS
    textColour: "#0f0000",
    textRotate: 45,
    textSizeText: 13 ,


    //text for col
    textSizeColText: 16,
    colLabel: "accidents per year",
    textColY: 60,
    textColX: 200,
    textColWeight: BOLD,
    colVertAlign:CENTER,
    colHorzAlign:CENTER,

    //text for title
    textSizeTitle: 24,
    titleText: "Fatal driving accidents resulting from the use of mobile devices",
    textTitleX: -25,
    textTitleY: 270,
    titlePaddingX: 400,
    titleWeight: BOLD,
    titleHorzAlign:CENTER,
    titleVertAlign:CENTER,

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
