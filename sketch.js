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
    xBarPos: 60,
    yBarPos: 685,
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

  let lineChart = {
    //line Chart
    data: cleanData,
    chartHeight: 200,
    chartWidth: 350,
    xLinePos: -5,
    yLinePos: -350,
    genFont: font,
    fontBold: boldText,
    pointEllipseSize: 6,
    chartXYLineWeight: 1.5,

    //colours
    axisLineColour: "#F5F5F5",
    ticksValueColour: "#000000",
    pointsColour: "#B51C1C",
    chartLineColour: "#050505",
    chartLineIndiLineColour: ["#8D25A8", "#993BB1", "#B26BC5"],
    textTitleColour: "#0C0C0C",
    textColour: ["#8D25A8", "#993BB1", "#B26BC5"],
    subTextColour: "#020202",

    //text for X AXIS
    textRotate: 45,
    textSizeText: 13,
    xAxisTextYPos: 45,

    //subtext
    textSizeSub: 12,
    subLabel: "Fatal Accidents Per Year",
    textSubY: -380,
    textSubX: 175,
    subVertAlign: CENTER,
    subHorzAlign: CENTER,

    //text for title
    textSizeTitle: 20,
    titleText:
      "Fatal traffic incidents caused by avoidable distractions while driving",
    textTitleX: 15,
    textTitleY: 620,
    titlePaddingX: 300,
    titleHorzAlign: CENTER,
    titleVertAlign: CENTER,

    //tick and tick text
    numTicks: 10,
    fontBold: boldText,
    ticksTextSize: 13,
    tickStyle: BOLD,
    tickTextXPos: -10,
    ticksLength: -5,

    //values
    yValue: "other-distraction",
    xValue: "Year",
  };
  let horzChart = {
    data: cleanData,
    chartHeight: 200,
    chartWidth: 350,
    xPos: 560,
    yPos: 680,
    barHeight: 35,
    genFont: font,
    fontBold: boldText,

    //colours
    barFill: ["#0E48A0", "#3565B0", "#5F85C0"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",
    subTextColour:"C72A2A",

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
    xStackedPos: 0,
    yStackedPos: -350,
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
  barCharts.push(new BarChart(barChart), new LineGraphChart (lineChart),new HorzBarChart(horzChart));
  barCharts.push(new StackedBarchart(stackedBarChart));
}

function draw() {
  background(171, 171, 188);
  barCharts.forEach((bar) => bar.render());
}
