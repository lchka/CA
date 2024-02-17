// import { StackedBarchart } from './stackedBarchart.js';
let barCharts = [];
let data;
let cleanData = [];
let numRows;
let font;
let boldText;
function preload() {
  data = loadTable("data/FatalCrashes.csv", "csv", "header");
  font = loadFont("fonts/Inter-Regular.ttf");
  boldText = loadFont("fonts/Inter-SemiBold.ttf");
  // italics=loadFont("fonts/");
}

function setup() {
  background(50);
  createCanvas(1600, 800);
  angleMode(DEGREES);

  //cleans data
  console.log(data);
  numRows = data.rows.length;
  for (let i = 0; i < numRows; i++) {
    cleanData.push(data.rows[i].obj);
  }
  console.log(cleanData);

  //giving the properties values

  let barChart = {
    data: cleanData,
    chartHeight: 200,
    chartWidth: 350,
    xPos: 60,
    yPos: 650,
    barWidth: 25,
    genFont: font,
    fontBold: boldText,

    //colours
    barFill: ["#F7BDD1", "#F59EBB", "#F17CA3"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",

    //text for X AXIS
    textColour: "#0f0000",
    textRotate: 45,
    textSizeText: 13,
    indiLineRotate:-85,
    indiLineWeight:1,
    indiLineHeight:35,

    //text for col y axis name

    colYAxisColour: "#C72A2A",
    colYAxisSize: 16,
    colYAxisRotation: -90,
    colYAxisStyle: BOLD,
    colYAxisTextValue: "no. of deaths",
    colYAxisTextX: 50,
    colYAxisTextY: -40,

    //text for col
    textSizeColText: 16,
    colLabel: "accidents per year",
    textColY: 60,
    textColX: 180,
    textColWeight: BOLD,
    colVertAlign: CENTER,
    colHorzAlign: CENTER,

    //text for title
    textSizeTitle: 24,
    titleText:
      "Fatal driving accidents resulting from the use of mobile devices",
    textTitleX: -25,
    textTitleY: 270,
    titlePaddingX: 400,
    titleWeight: BOLD,
    titleHorzAlign: CENTER,
    titleVertAlign: CENTER,

    //tick and tick text
    numTicks: 10,
    ticksTextSize: 13,
    tickStyle: BOLD,

    //values
    yValue: "cell-usage",
    xValue: "Year",
  };

  let lineChart = {
    //line Chart
    data: cleanData,
    chartHeight: 200,
    chartWidth: 350,
    xPos: -5,
    yPos: -350,
    genFont: font,
    fontBold: boldText,
    pointEllipseSize: 6,
    chartXYLineWeight:1.5,

    //colours
    axisLineColour: "#F5F5F5",
    ticksColour: "#C72A2A",
    pointsColour:"#B51C1C",
    chartLineColour:"#050505",
    chartLineIndiLineColour:["#8D25A8", "#993BB1", "#B26BC5"],


    //text for X AXIS
    textColour: ["#8D25A8", "#993BB1", "#B26BC5"],
    textRotate: 45,
    textSizeText: 13,
    xAxisTextYPos:45,

    //text for col y axis name

    colYAxisColour:"#C72A2A",
    colYAxisSize:16,
    colYAxisRotation:-90,
    colYAxisStyle:BOLD,
    colYAxisTextValue:"no. of deaths",
    colYAxisTextX:50,
    colYAxisTextY:-40,

    //text for col
    textSizeColText: 16,
    colLabel: "accidents per year",
    textColY: -420,
    textColX: 175,
    textColWeight: BOLD,
    colVertAlign:CENTER,
    colHorzAlign:CENTER,

    //text for title
    textSizeTitle: 20,
    titleText: "Fatal driving accidents resulting from other uneccasary distraction on the road",
    textTitleX: -25,
    textTitleY: 600,
    titlePaddingX: 400,
    titleWeight: BOLD,
    titleHorzAlign:CENTER,
    titleVertAlign:CENTER,

    //tick and tick text
    numTicks: 10,
    ticksTextSize: 13,
    tickStyle: BOLD,
    tickTextXPos:-10,
    ticksLength:-5,

    //values
    yValue: "other-distraction",
    xValue: "Year",
  };
  barCharts.push(new BarChart(barChart));

  barCharts.push(new LineGraphChart(lineChart));
}

function draw() {
  background(171, 171, 188);
  barCharts.forEach((bar) => bar.render());
}
