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
    axisLineColour: "#d9d9d9",
    barWidth: 25,
    barFill:["#F7BDD1","#F59EBB","#F17CA3"],

        //text for bars
    textColour: "#0f0000",
    textRotate: 45,
    textSizeText:14,

        //text for col
    textSizeColText: 24,
    colLabel: "Years",
    textColY: 75,
    textColX: 200,
    textColWeight:BOLD,
       //text for title
    textSizeTitle: 24,
    titleText: "Fatal accidents resulting from the use of mobile devices",
    textTitleX:0,
    textTitleY:270,
    titlePaddingX:400,


    numTicks: 7,
    //values
    yValue: "cell-usage",
    xValue: "Year",
  };

  //push new barchart
  barCharts.push(new BarChart(barChart01));
}

function draw() {
  background(171, 71, 188);
  barCharts.forEach((bar) => bar.render());
}
