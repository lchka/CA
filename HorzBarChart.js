//fix scaling, first loop is already the max, how to set the max from the array of cleanData, with the lowest value as first tick

class HorzBarChart {
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
    this.genFont = obj.genFont;
    this.fontBold = obj.fontBold;
    //subtext

    this.subLabel = obj.subLabel; //to pull the section name from the csv file
    this.textSubX = obj.textSubX;
    this.textSubY = obj.textSubY;
    this.subVertAlign = obj.subVertAlign;
    this.subHorzAlign = obj.subHorzAlign;
    this.textSizeSub = obj.textSizeSub;
    //text col y axis name

    this.colYAxisColour = obj.colYAxisColour;
    this.colYAxisSize = obj.colYAxisSize;
    this.colYAxisRotation = obj.colYAxisRotation;
    this.colYAxisStyle = obj.colYAxisStyle;
    this.colYAxisTextValue = obj.colYAxisTextValue;
    this.colYAxisTextX = obj.colYAxisTextX;
    this.colYAXisTextY = obj.colYAxisTextY;

    //text  for title
    this.textSizeTitle = obj.textSizeTitle;
    this.titleText = obj.titleText;
    this.textTitleX = obj.textTitleX;
    this.textTitleY = obj.textTitleY;
    this.titlePaddingX = obj.titlePaddingX;
    this.titleWeight = obj.titleWeight;
    this.titleVertAlign = obj.titleVertAlign;
    this.titleHorzAlign = obj.titleHorzAlign;

    //colors
    this.barFill = obj.barFill;
    this.textColour = obj.textColour;
    this.bColour = obj.bColour;
    this.ticksColour = obj.ticksColour;
    this.subTextColour=obj.subTextColour


    // Calculate maxValue and scale
    this.maxValue = max(this.data.map((d) => d[this.yValue])); // Get the max height of the chart
    this.scale = this.chartHeight / this.maxValue; // Calculate the scale for the chart
  }

  render() {


    push();
    translate(this.xPos, this.yPos);
    stroke(this.axisLineColour);
    line(0, 0, 0, -this.chartHeight);
    line(0, 0, this.chartWidth, 0);

    // Map for labels x is just a name
    let yLabel = this.data.map((x) => x[this.yValue]);

    // Draw ticks on y-axis
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(i * (this.chartWidth / this.numTicks), 0);
      line(0, 0, 0, 5);
      pop();
    }

    //  tick text
    let tickValue = this.maxValue / this.numTicks; //prevents it from going over the max of preset value in the column/rows. On first loop it did display the max value (453) but kept going over it, which is why we needed another variable that handles the 'gap difference' between each value label.
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate( i*( this.chartWidth) / this.numTicks,20);
      noStroke();
      textSize(this.textSizeText);
      if (this.textRotate === 0) {
        textAlign(CENTER, CENTER);
      } else {
        textAlign(LEFT, CENTER);
      }
      rotate(this.textRotate);
      fill(this.textColour);
      text(yLabel[i], 0, 0); //everytime i loop it adds from the previous loop to the current one
      pop();
    }

    // Calculate gap
    let gap =
      (this.chartWidth - this.data.length * this.barWidth) /
      (this.data.length + 1);

    // Draw bars
    push();
    translate(gap, 0);
    for (let i = 0; i < this.data.length; i++) {
      fill(this.barFill[i % this.barFill.length]);
      noStroke();
      rect(0, 0, this.barWidth, -this.data[i][this.yValue] * this.scale);
      translate(gap + this.barWidth, 0);

      // // Text x AXIS
      // push();
      // textSize(this.textSizeText);
      // if (this.textRotate === 0) {
      //   textAlign(CENTER, CENTER);
      // } else {
      //   textAlign(LEFT, CENTER);
      // }
      // rotate(this.textRotate);
      // fill(this.textColour);
      // text(yLabels[i], 0, 30);
      // translate(this.barWidth / 2, 20);
      // pop();
    }
    pop();

    //text xvalue col name
    //subtext
    push();
    noStroke();
    fill(this.subTextColour);
    textFont(this.fontBold);
    textAlign(this.subHorzAlign, this.subVertAlign);
    textSize(this.textSizeSub);
    text(this.subLabel, this.textSubX, this.textSubY);
    pop();

    //text xvalue title name
    push();
    noStroke();
    fill(this.textColour);
    textFont(this.fontBold);
    textSize(this.textSizeTitle);
    textStyle(this.titleWeight);
    textAlign(this.titleHorzAlign, this.titleVertAlign);
    text(this.titleText, this.textTitleX, -this.textTitleY, this.titlePaddingX);
    pop();

    //text for col2

    push();
    noStroke();
    fill(this.colYAxisColour);
    textSize(this.colYAxisSize);
    rotate(this.colYAxisRotation);
    textStyle(this.colYAxisStyle);
    text(this.colYAxisTextValue, this.colYAxisTextX, this.colYAXisTextY);

    pop();
  }
}
