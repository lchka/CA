// import { StackedBarchart } from './stackedBarchart.js';
let barCharts = [];
let data;
let cleanData = [];
let numRows;
let font;
let boldText;
function preload() {
  data = loadTable("data/FatalCrashes.csv", "csv", "header");
  font = loadFont("Fonts/Inter-Regular.ttf");
  boldText = loadFont("Fonts/Inter-SemiBold.ttf");
  // italics=loadFont("fonts/");
}

function setup() {
  createCanvas(1600, 900);
  angleMode(DEGREES);
  noLoop();

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
    xBarPos: 60,
    yBarPos: 685,
    barWidth: 25,
    genFont: font,
    fontBold: boldText,

    //colours
    barFill: ["#EF6291", "#F493B4", "#F8BFD2"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",

    //text for X AXIS
    textColour: "#0f0000",
    textRotate: 45,
    textSizeText: 13,
    indiLineRotate: -85,
    indiLineWeight: 1,
    indiLineHeight: 35,

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
let stacked100 = {
    data: cleanData,
    chartHeight: 200,
    chartWidth: 350,
    xStacked100Pos: 550,
    yStacked100Pos: 350,
    barWidth: 25,
    genFont: font,
    fontBold: boldText,

    //colours
    barFill: ["#EF6291", "#F493B4"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",

    //text for X AXIS
    textColour: "#0f0000",
    textRotate: 45,
    textSizeText: 13,
    indiLineRotate: -85,
    indiLineWeight: 1,
    indiLineHeight: 35,

    //text for col y axis name

    colYAxisColour: "#C72A2A",
    colYAxisSize: 16,
    colYAxisRotation: -90,
    colYAxisStyle: BOLD,
    colYAxisTextValue: "no. of deaths in %",
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
    yValues: ["other-distraction", "cell-usage"], //other-distraction
    xValue: "Year",
    yValueTotal: "total",
  };
  let lineChart = {
    //line Chart
    data: cleanData,
    chartHeight: 250,
    chartWidth: 400,
    xLinePos: 0,
    yLinePos: -350,
    genFont: font,
    fontBold: boldText,


    //colours
    axisLineColour: "#000000",
    ticksValueColour: "#000000",
    pointsColour: "#000000",
    chartLineColour: ["#1976D2","#7B1FA2"],
    chartLineIndiLineColour: ["#000000","#000000"],
    textTitleColour: "#0C0C0C",
    textColour: ["#1976D2", "#7B1FA2"],
    subTextColour: "#000000",
    textXLabelColour: "#000000",

    

    //subtext in the middle
    textSizeSub: 14,
    subLabel: "no of deaths per year",
    textSubY: -475,
    textSubX: 205,
    subVertAlign: CENTER,
    subHorzAlign: CENTER,

    //text for title
    textSizeTitle: 20,
    titleText: "Line Chart for Fatal Accidents",
    textTitleX: 0,
    textTitleY: 640,
    titlePaddingX: 400,
    titleHorzAlign: CENTER,
    titleVertAlign: CENTER,

    //tick and tick text
    numTicks: 10,
    fontBold: boldText,
    ticksTextSize: 13,
    tickStyle: BOLD,
    tickTextXPos: -10,
    ticksLength: -5,

    //text for xLabel
    textYPosXLabel: 7,
    textSizeXLabel: 12,
    textXLabelRotate: 45,
    horzAlignXLabel: LEFT,
    vertAlignXLabel: CENTER,

    //text and line for xLabel
    xLabelLineWeight: 1,
    pointEllipseSize: 6,
    chartXYLineWeight: 1.5,
    axisLineStrokeWeight:2,
    indiLineOneHeight:20,
    indiLineTwoHeight:20,
    textRotate: -25,
    textSizeText: 13,
    xAxisTextYTwoPos:25,
    xAxisTextYOnePos: 25,
    //values
    yValue: "other-distraction",
    xValue: "Year",
    yValues:["other-distraction", "cell-usage"]
  };
  let horzChart = {
    data: cleanData,
    chartHeight: 200,
    chartWidth: 350,
    xHorzPos: 650,
    yHorzPos: 340,
    barHeight: 35,
    genFont: font,
    fontBold: boldText,

    //colours
    barFill: ["#1976D2","#7B1FA2","#7E57C2"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",
    subTextColour: "C72A2A",

    //text for X AXIS
    textColour: "#0f0000",
    textRotate: 0,
    textSizeText: 13,
    indiLineRotate: -85,
    indiLineWeight: 1,
    indiLineHeight: 35,

    //text for col y axis name

    colYAxisColour: "#C72A2A",
    colYAxisSize: 16,
    colYAxisRotation: -90,
    colYAxisStyle: BOLD,
    colYAxisTextValue: "accidents per year",
    colYAxisTextX: 50,
    colYAxisTextY: -70,

    //subtext
    textSizeSub: 12,
    subLabel: "no. of deaths",
    textSubY: 60,
    textSubX: 175,
    subVertAlign: CENTER,
    subHorzAlign: CENTER,

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
    xValue: "cell-usage",
    yValue: "Year",
  };
  let stackedBarChart = {
    data: cleanData,
    chartHeight: 200,
    chartWidth: 350,
    xStackedPos: -550,
    yStackedPos: 0,
    barWidth: 25,
    genFont: font,
    fontBold: boldText,

    //colours
    barFill: ["#EF6291", "#F493B4"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",

    //text for X AXIS
    textColour: "#0f0000",
    textRotate: 45,
    textSizeText: 13,
    indiLineRotate: -85,
    indiLineWeight: 1,
    indiLineHeight: 35,

    //text for col y axis name

    colYAxisColour: "#C72A2A",
    colYAxisSize: 16,
    colYAxisRotation: -90,
    colYAxisStyle: BOLD,
    colYAxisTextValue: "no. of deaths ",
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
    yValues: ["other-distraction", "cell-usage"], //other-distraction
    xValue: "Year",
  };
  
  barCharts.push(
    new BarChart(barChart),
    new LineGraphChart(lineChart),
    new HorzBarChart(horzChart),
    new StackedChart100(stacked100),
    new StackedBarChart(stackedBarChart)
  );
  // barCharts.push(new LineGraphChart(lineChart))
}

function draw() {
  background(171, 171, 188);
  barCharts.forEach((bar) => bar.render());
}
