class stackedBarChart {
    constructor(obj) {
      //canvas
      this.canvasWidth = obj.canvasWidth;
      this.canvasHeight = obj.canvasHeight;
  
      //CHART
      this.data = obj.data;
      this.chartWidth = obj.chartWidth;
      this.chartHeight = obj.chartHeight;
      this.xPos = obj.xPos;
      this.yPos = obj.yPos;
      this.axisLineColour = obj.axisLineColour;
      this.barWidth = obj.barWidth;
      this.yValue = obj.yValue;
  
      //ticks
      this.numTicks = obj.numTicks;
      this.ticksTextSize = obj.ticksTextSize;
      this.tickStyle = obj.tickStyle;
  
      //TEXT
      this.textSizeText = obj.textSizeText;
      this.textSizeColText = obj.textSizeColText;
      this.textRotate = obj.textRotate;
      this.xValue = obj.xValue;
  
      //text for col name
  
      this.colLabel = obj.colLabel; //to pull the section name from the csv file
      this.textColX = obj.textColX;
      this.textColY = obj.textColY;
      this.textColWeight = obj.textColWeight;
      this.colVertAlign=obj.colVertAlign;
      this.colHorzAlign=obj.colHorzAlign;
  
      //text  for title
      this.textSizeTitle = obj.textSizeTitle;
      this.titleText = obj.titleText;
      this.textTitleX = obj.textTitleX;
      this.textTitleY = obj.textTitleY;
      this.titlePaddingX = obj.titlePaddingX;
      this.titleWeight = obj.titleWeight;
      this.titleVertAlign=obj.titleVertAlign;
      this.titleHorzAlign=obj.titleHorzAlign;
  
      //colors
      this.barFill = obj.barFill;
      this.textColour = obj.textColour;
      this.bColour = obj.bColour;
      this.ticksColour = obj.ticksColour;
  
      // Calculate maxValue and scale
      this.maxValue = max(this.data.map((d) => d[this.yValue])); // Get the max height of the chart
      this.scale = this.chartHeight / this.maxValue; // Calculate the scale for the chart
    }
};