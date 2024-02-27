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
  semiText = loadFont("Fonts/Inter-SemiBold.ttf");
  // italics=loadFont("fonts/");
}

function setup() {
  createCanvas(1600, 1050);
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
    chartHeight: 250,
    chartWidth: 350,
    xBarPos: 100,
    yBarPos: 480,
    barWidth: 25,
    genFont: font,
    fontBold: boldText,
    axisLineWeight: 2,

    //colours
    barFill: ["#EF6291", "#F493B4", "#F8BFD2"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#000000",
    textColour: "#B71C1C",
    colYAxisColour: "#B71C1C",
    titleColour: "#000000",
    xLabelColour: "#000000",

    //text for X labels
    textRotate: 50,
    textSizeText: 13,
    xLabelHeight: 20,
    xLabelHorz: LEFT,
    xLabelVert: CENTER,

    //subtext y axis
    colYAxisSize: 14,
    colYAxisRotation: -90,
    colYAxisStyle: BOLD,
    colYAxisTextValue: "no. of deaths",
    colYAxisTextX: 120,
    colYAxisTextY: -50,
    colYHorzAlign: CENTER,
    colYVertAlign: CENTER,

    //subtext x axis
    textSizeColText: 14,
    colLabel: "accidents per year",
    textColY: 50,
    textColX: 180,
    textColWeight: BOLD,
    colVertAlign: CENTER,
    colHorzAlign: CENTER,

    //text chart title
    textSizeTitle: 16,
    titleText: "Bar Chart Depicting Fatal Accidents Caused by Phone Usage",
    textTitleX: -25,
    textTitleY: 310,
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
  let horzChart = {
    data: cleanData,
    chartHeight: 250,
    chartWidth: 350,
    xHorzPos: 550,
    yHorzPos: 0,
    genFont: font,
    fontBold: boldText,
    lineGraphWeight: 2,

    //colours
    barFill: ["#EF6291", "#F493B4", "#F8BFD2"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#C72A2A",
    colYAxisColour: "#B71C1C",
    textColour: "#0f0000",
    barValueColour: "#000000",
    subTextColour: "#B71C1C",

    //text for y AXIS
    textRotate: 0,
    textSizeText: 13,

    //bar properties
    barValueHorz: CENTER,
    barValueVert: CENTER,
    xAxisHorz: CENTER,
    xAxisVert: CENTER,
    barValueTextSize: 14,
    barHeight: 40,
    barValueXPos: 25,

    // subtext y axis
    colYAxisSize: 14,
    colYAxisRotation: -90,
    colYAxisStyle: BOLD,
    colYAxisTextValue: "accidents per year",
    colYAxisTextX: 120,
    colYAxisTextY: -60,
    colYHorzAlign: CENTER,
    colYVertAlign: CENTER,

    //subtext x axis
    textSizeSub: 14,
    subLabel: "no. of deaths",
    textSubY: 60,
    textSubX: 175,
    subVertAlign: CENTER,
    subHorzAlign: CENTER,

    //text for title
    textSizeTitle: 16,
    titleText:
      "Horizontal Bar Chart Displaying Fatal Accidents Caused By Other Forms of Distraction",
    textTitleX: -25,
    textTitleY: 300,
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
    xValue: "other-distraction",
    yValue: "Year",
  };
  let lineChart = {
    //line Chart
    data: cleanData,
    chartHeight: 250,
    chartWidth: 350,
    xLinePos: 1100,
    yLinePos: -10,
    genFont: font,
    fontBold: boldText,

    //colours
    axisLineColour: "#f5f5f5",
    ticksValueColour: "#000000",
    pointsColour: "#000000",
    chartLineColour: ["#EF6291", "#F493B4", "#F8BFD2"],
    chartLineIndiLineColour: ["#000000", "#000000"],
    textTitleColour: "#0C0C0C",
    textColour: "#000000",
    subTextColour: "#B71C1C",
    textXLabelColour: "#000000",
    strokeColourForBox: "#000000",
    colYAxisColour: "#B71C1C",
    keyTextColour: "#000000",

    //subtext x axis
    textSizeSub: 14,
    subLabel: "deaths per year",
    textSubY: 45,
    textSubX: 1300,
    subVertAlign: CENTER,
    subHorzAlign: CENTER,

    //subtext y axis
    colYAxisSize: 14,
    colYAxisRotation: -90,
    colYAxisTextValue: "no. of deaths",
    colYAxisTextX: 90,
    colYAxisTextY: 1050,
    colYHorzAlign: CENTER,
    colYVertAlign: CENTER,

    //text for title
    textSizeTitle: 16,
    titleText: "Line Chart Depicting Fatal Accidents",
    textTitleX: 1100,
    textTitleY: 300,
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

    //text for yLabel
    textYPosXLabel: 7,
    textSizeXLabel: 12,
    textXLabelRotate: 45,
    horzAlignXLabel: LEFT,
    vertAlignXLabel: CENTER,

    //text and line for xLabel
    xLabelLineWeight: 1,
    pointEllipseSize: 6,
    chartXYLineWeight: 2,
    axisLineStrokeWeight: 2,
    indiLineOneHeight: -20,
    indiLineTwoHeight: 20,
    textRotate: -25,
    textSizeText: 13,
    xAxisTextYTwoPos: 25,
    xAxisTextYOnePos: -25,

    // key for yValues
    strokeWeightForBox: 0.7,
    keyXPos: 70,
    keyYPos: 140,
    boxSize: 12,
    textXPos: 20,
    textYPos: 10,
    keyPaddingY: 20,
    keyTextSize: 14,

    //values
    xValue: "Year",
    yValues: ["cell-usage", "other-distraction"],
  };
  let stackedBarChart = {
    data: cleanData,
    chartHeight: 250,
    chartWidth: 350,
    xStackedPos: -1100,
    yStackedPos: 0,
    barWidth: 25,
    genFont: font,
    fontBold: boldText,
    lineGraphWeight: 2,

    //colours
    barFill: ["#EF6291", "#F493B4", "#F8BFD2"],
    axisLineColour: "#ffffff",
    ticksColour: "#000000",
    textColour: "#B71C1C",
    colYAxisColour: "#B71C1C",
    xLabelColour: "#000000",
    titleColour: "#000000",
    xLabelColour: "#000000",
    chartLineColour: ["#EF6291", "#F493B4", "#F8BFD2"],
    strokeColourForBox: "#000000",
    keyTextColour: "#000000",
    keyTitleColour: "#000000",

    //text xLabels
    textRotate: 45,
    textSizeText: 13,
    xLabelHeight: 30,
    xLabelHorzAlign:LEFT,
    xLabelVertAlign:CENTER,

    //subtext y axis
    colYAxisSize: 14,
    colYAxisRotation: -90,
    colYAxisTextValue: "no. of deaths",
    colYAxisTextX: 130,
    colYAxisTextY: -60,

    //subtext x axis
    textSizeColText: 14,
    colLabel: "accidents per year",
    textColY: 60,
    textColX: 170,
    colVertAlign: CENTER,
    colHorzAlign: CENTER,

    //text for title
    textSizeTitle: 16,
    titleText:
      "Comparing Fatal Accidents from Mobile Phone Usage with Other Distractions",
    textTitleX: -25,
    textTitleY: 300,
    titlePaddingX: 400,
    titleHorzAlign: CENTER,
    titleVertAlign: CENTER,

    // key for yValues
    strokeWeightForBox: 0.7,
    keyXPos: -20,
    keyYPos: 110,
    boxSize: 15,
    textXPos: 20,
    textYPos: 5,
    keyPaddingY: 20,
    keyYTitle: -20,
    keyXTitle: 0,
    keyTitle: "Key for Distractions:",
    keyTitleHorzAlign: LEFT,
    keyTitleVertAlign: CENTER,
    keyTextHorzAlign: LEFT,
    keyTextVertAlign: CENTER,
    keyTitleSize: 14,

    //tick and tick text
    numTicks: 10,
    ticksTextSize: 13,
    

    //values
    yValues: ["cell-usage", "other-distraction"], //other-distraction
    xValue: "Year",
  };
  let stackedAvg = {
    //gen chart
    data: cleanData,
    chartType: "LINE",
    chartHeight: 250,
    chartWidth: 350,
    xStacked100Pos: -550,
    yStacked100Pos: 0,
    barWidth: 25,
    genFont: font,
    fontBold: boldText,
    semiFont: semiText,
    lineGraphWeight: 2,

    //avg line and text
    avgLineWeight: 1.5,
    avgLineTextSize: 14,
    avgLineTextVertAlign: CENTER,
    avgLineTextHorzAlign: RIGHT,
    avgLineTextXPos: 10,
    avgLineTextYPos: 150,
    avgLineText:"The average is:",

    //colours
    barFill: ["#EF6291", "#F493B4", "#F8BFD2"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#000000",
    textColour: "#B71C1C",
    colYAxisColour: "#C72A2A",
    avgLineColour: "#ffffff",
    avgLineTextColour: "#ffffff",
    chartLineColour: ["#EF6291", "#F493B4", "#F8BFD2"],
    titleColour:"#000000",
    subXAxisColour:"#B71C1C",
    xLabelColour:"#000000",

    //text for X LABELS
    textRotate: 45,
    textSizeText: 13,
    xLabelHeight: 30,
    xLabelVertAlign:LEFT,
    xLabelHorzAlign:CENTER,


    //text for y axis subtext
    colYAxisSize: 14,
    colYAxisRotation: -90,
    colYAxisTextValue: "no. of deaths",
    colYAxisTextX: 180,
    colYAxisTextY: -60,

    //text for x axis
    textSizeColText: 14,
    colLabel: "accidents per year",
    textColY: 60,
    textColX: 180,
    colVertAlign: CENTER,
    colHorzAlign: CENTER,

    //text for title
    textSizeTitle: 16,
    titleText:
      "Comparing Fatal Accidents from Mobile Phone Usage with Other Distractions with an Average Line",
    textTitleX: 0,
    textTitleY: 300,
    titlePaddingX: 350,
    titleHorzAlign: CENTER,
    titleVertAlign: CENTER,

    //tick and tick text
    numTicks: 10,
    ticksTextSize: 13,

    //values
    yValues: ["cell-usage", "other-distraction"], //other-distraction
    xValue: "Year",
  };
  let stacked100 = {
    //gen chart
    data: cleanData,
    chartType: "FULL",
    chartHeight: 250,
    chartWidth: 350,
    xStacked100Pos: 550,
    yStacked100Pos: 420,
    barWidth: 25,
    genFont: font,
    fontBold: boldText,
    semiFont: semiText,
    lineGraphWeight: 2,

    //avg line and text
    avgLineWeight: 1.5,
    avgLineTextSize: 14,
    avgLineTextVertAlign: CENTER,
    avgLineTextHorzAlign: RIGHT,
    avgLineTextXPos: 10,
    avgLineTextYPos: 150,
    avgLineText:"The average is:",

    //colours
    barFill: ["#EF6291", "#F493B4", "#F8BFD2"],
    axisLineColour: "#d9d9d9",
    ticksColour: "#000000",
    textColour: "#0f0000",
    colYAxisColour: "#B71C1C",
    avgLineTextColour: "#ffffff",
    avgLineColour: "#000000",
    chartLineColour: "#ffffff",
    titleColour:"#000000",
    subXAxisColour:"#B71C1C",
    xLabelColour:"#000000",

    //text for X labels
    textRotate: 45,
    textSizeText: 13,
    xLabelHeight: 30,
    xLabelVertAlign:LEFT,
    xLabelHorzAlign:CENTER,

    //text for y axis subtext
    colYAxisSize: 14,
    colYAxisRotation: -90,
    colYAxisTextValue: "no. of deaths in %",
    colYAxisTextX: 120,
    colYAxisTextY: -40,

    //text for x axis
    textSizeColText: 14,
    colLabel: "accidents per year",
    textColY: 60,
    textColX: 180,
    colVertAlign: CENTER,
    colHorzAlign: CENTER,

    //text for title
    textSizeTitle: 16,
    titleText:
      "Comparing Fatal Accidents from Mobile Phone Usage with Other Distractions in Percentages",
    textTitleX: 0,
    textTitleY: 310,
    titlePaddingX: 350,
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
    new StackedChartFullandAvg(stacked100),
    new StackedBarChart(stackedBarChart),
    new StackedChartFullandAvg(stackedAvg)
  );
}

function draw() {
  background(171, 171, 188);
  barCharts.forEach((bar) => bar.render());
  textSize(56);
  textAlign(CENTER, CENTER);
  text("'Fatal Crashes' Charts and Clases CA", 200, -820);
}
