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
  createCanvas(1600, 950);
  angleMode(DEGREES);
  noLoop();

  //cleans data
  console.log(data);
  numRows = data.rows.length;
  for (let i = 0; i < numRows; i++) {
    cleanData.push(data.rows[i].obj);
  }
  console.log(cleanData);

  let barChart = {
    //gen chart
    data: cleanData,
    chartHeight: 200,
    chartWidth: 350,
    xBarPos: 60,
    yBarPos: 840,
    barWidth: 25,
    genFont: font,
    fontBold: boldText,

    //colours
    barFill: ["#EF6291", "#F493B4", "#F8BFD2"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",
    textColour: "#0f0000",
    colYAxisColour: "#C72A2A",
    barValueColour: "#00000",

    //text for X labels
    textRotate: 45,
    textSizeText: 13,
    xLabelHeight: 30,
    xLabelHorz: LEFT,
    xLabelVert: CENTER,

    //text for y axis name
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
    textSizeTitle: 16,
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
    tickHorz: RIGHT,
    tickVert: CENTER,

    //values
    yValue: "cell-usage",
    xValue: "Year",
  };
  let stacked100 = {
    data: cleanData,
    chartHeight: 200,
    chartWidth: 350,
    xStacked100Pos: 550,
    yStacked100Pos: 500,
    barWidth: 25,
    genFont: font,
    fontBold: boldText,

    //colours
    barFill: ["#EF6291", "#F493B4"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",
    textColour: "#0f0000",
    colYAxisColour: "#C72A2A",

    //text for X LEBELS
    textRotate: 45,
    textSizeText: 13,
    indiLineRotate: -85,
    indiLineWeight: 1,
    indiLineHeight: 35,

    //text for y axis name
    colYAxisSize: 16,
    colYAxisRotation: -90,
    colYAxisStyle: BOLD,
    colYAxisTextValue: "no. of deaths in %",
    colYAxisTextX: 50,
    colYAxisTextY: -40,

    //text for x axis
    textSizeColText: 16,
    colLabel: "accidents per year",
    textColY: 60,
    textColX: 180,
    textColWeight: BOLD,
    colVertAlign: CENTER,
    colHorzAlign: CENTER,

    //text for title
    textSizeTitle: 16,
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

    //values
    yValues: ["cell-usage", "other-distraction"], //other-distraction
    xValue: "Year",
    yValueTotal: "total",
  };
  let lineChart = {
    //line Chart
    data: cleanData,
    chartHeight: 250,
    chartWidth: 350,
    xLinePos: 0,
    yLinePos: -500,
    genFont: font,
    fontBold: boldText,
    

    //colours
    axisLineColour: "#f5f5f5",
    ticksValueColour: "#000000",
    pointsColour: "#000000",
    chartLineColour: ["#1976D2", "#7B1FA2"],
    chartLineIndiLineColour: ["#000000", "#000000"],
    textTitleColour: "#0C0C0C",
    textColour: ["#1976D2", "#7B1FA2"],
    subTextColour: "#000000",
    textXLabelColour: "#000000",

    //subtext in the middle
    textSizeSub: 14,
    subLabel: "no of deaths per year",
    textSubY: -435,
    textSubX: 205,
    subVertAlign: CENTER,
    subHorzAlign: CENTER,

    //text for title
    textSizeTitle: 16,
    titleText: "Line Chart for Fatal Accidents",
    textTitleX: 0,
    textTitleY: 780,
    titlePaddingX: 350,
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
    chartXYLineWeight: 1,
    axisLineStrokeWeight: 2,
    indiLineOneHeight: 20,
    indiLineTwoHeight: 20,
    textRotate: -25,
    textSizeText: 13,
    xAxisTextYTwoPos: 25,
    xAxisTextYOnePos: 25,
    //values
    yValue: "other-distraction",
    xValue: "Year",
    yValues: ["other-distraction", "cell-usage"],
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
    lineGraphWeight:2,

    //colours
    barFill: ["#1976D2", "#7B1FA2", "#7E57C2"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",
    colYAxisColour: "#C72A2A",
    textColour: "#0f0000",
    barValueColour: "#000000",
    fontBold: boldText,
    subTextColour: "C72A2A",

    //text for y AXIS
    textRotate: 0,
    textSizeText: 13,
 

    //bar value
    barValueHorz: LEFT,
    barValueVert: LEFT,
    barValueTextSize: 14,

    //x axis subtext
    colYAxisSize: 16,
    colYAxisRotation: -90,
    colYAxisStyle: BOLD,
    colYAxisTextValue: "accidents per year",
    colYAxisTextX: 100,
    colYAxisTextY: -70,

    //subtext y axis
    textSizeSub: 12,
    subLabel: "no. of deaths",
    textSubY: 60,
    textSubX: 175,
    subVertAlign: CENTER,
    subHorzAlign: CENTER,

    //text for title
    textSizeTitle: 16,
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
    tickHorz: RIGHT,
    tickVert: CENTER,

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
    lineGraphWeight:1,


    //colours
    barFill: ["#EF6291", "#F493B4"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",
    textColour: "#0f0000",
    colYAxisColour: "#C72A2A",


    //text for X AXIS
    textRotate: 45,
    textSizeText: 13,
    xLabelHeight:30,


    //text for col y axis name
    colYAxisSize: 16,
    colYAxisRotation: -90,
    colYAxisStyle: BOLD,
    colYAxisTextValue: "no. of deaths in total ",
    colYAxisTextX: 10,
    colYAxisTextY: -50,

    //text for col
    textSizeColText: 16,
    colLabel: "accidents per year",
    textColY: 60,
    textColX: 180,
    textColWeight: BOLD,
    colVertAlign: CENTER,
    colHorzAlign: CENTER,

    //text for title
    textSizeTitle: 16,
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
    yValues: ["cell-usage", "other-distraction"], //other-distraction
    xValue: "Year",
  };
  let stackedAverage = {
    //gen chart
    data: cleanData,
    chartHeight: 200,
    chartWidth: 350,
    xAvgPos: 550,
    yAvgPos: -500,
    barWidth: 25,
    genFont: font,
    fontBold: boldText,

    //colours
    barFill: ["#7B1FA2", "#1976D2", "#7E57C2"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",
    avgLineColour: "#f5f5f5",
    textColour: "#0f0000",

    //x axis labels
    textRotate: 45,
    textSizeText: 13,

    //avg line
    avgLineWeight: 1.5,

    //text for sub text y axis
    colYAxisColour: "#C72A2A",
    colYAxisSize: 16,
    colYAxisRotation: -90,
    colYAxisStyle: BOLD,
    colYAxisTextValue: "no. of deaths in total ",
    colYAxisTextX: 10,
    colYAxisTextY: -50,

    //text for  x axis subtext
    textSizeColText: 16,
    colLabel: "accidents per year",
    textColY: 60,
    textColX: 180,
    textColWeight: BOLD,
    colVertAlign: CENTER,
    colHorzAlign: CENTER,

    //text for title
    textSizeTitle: 16,
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

    //values
    yValues: ["cell-usage", "other-distraction"], //other-distraction
    xValue: "Year",
  };
  barCharts.push(
    new BarChart(barChart),
    new LineGraphChart(lineChart),
    new HorzBarChart(horzChart),
    new StackedChart100(stacked100),
    new StackedBarChart(stackedBarChart),
    new StackedAverage(stackedAverage)
  );
  // barCharts.push(new StackedAverage (stackedAverage))
}

function draw() {
  background(171, 171, 188);
  barCharts.forEach((bar) => bar.render());
}
