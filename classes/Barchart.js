class BarChart {
  constructor(obj) {
    //CHART
    this.data = obj.data;
    this.chartWidth = obj.chartWidth;
    this.chartHeight = obj.chartHeight;
    this.xBarPos = obj.xBarPos;
    this.yBarPos = obj.yBarPos;
    this.barWidth = obj.barWidth;
    this.yValue = obj.yValue;
    this.xValue = obj.xValue;
    this.genFont = obj.genFont;
    this.fontBold = obj.fontBold;
    this.axisLineWeight = obj.axisLineWeight;

    //ticks and tick text
    this.numTicks = obj.numTicks;
    this.ticksTextSize = obj.ticksTextSize;
    this.tickStyle = obj.tickStyle;
    this.tickVert = obj.tickVert;
    this.tickHorz = obj.tickHorz;

    //x Labels
    this.textSizeText = obj.textSizeText;
    this.textRotate = obj.textRotate;
    this.xLabelHeight = obj.xLabelHeight;
    this.xLabelHorz = obj.xLabelHorz;
    this.xLabelVert = obj.xLabelVert;

    //subtext x axis
    this.colLabel = obj.colLabel; //to pull the section name from the csv file
    this.textColX = obj.textColX;
    this.textColY = obj.textColY;
    this.textColWeight = obj.textColWeight;
    this.colVertAlign = obj.colVertAlign;
    this.colHorzAlign = obj.colHorzAlign;
    this.textSizeColText = obj.textSizeColText;

    //subtext y axis

    this.colYAxisSize = obj.colYAxisSize;
    this.colYAxisRotation = obj.colYAxisRotation;
    this.colYAxisStyle = obj.colYAxisStyle;
    this.colYAxisTextValue = obj.colYAxisTextValue;
    this.colYAxisTextX = obj.colYAxisTextX;
    this.colYAXisTextY = obj.colYAxisTextY;
    this.colYHorzAlign=obj.colYHorzAlign;
    this.colYVertAlign=obj.colYVertAlign;


    //text chart title

    this.textSizeTitle = obj.textSizeTitle;
    this.titleText = obj.titleText;
    this.textTitleX = obj.textTitleX;
    this.textTitleY = obj.textTitleY;
    this.titlePaddingX = obj.titlePaddingX;
    this.titleWeight = obj.titleWeight;
    this.titleVertAlign = obj.titleVertAlign;
    this.titleHorzAlign = obj.titleHorzAlign;

    //colors
    this.axisLineColour = obj.axisLineColour;
    this.barFill = obj.barFill;
    this.textColour = obj.textColour;
    this.ticksColour = obj.ticksColour;
    this.titleColour=obj.titleColour;
    this.colYAxisColour = obj.colYAxisColour;
    this.xLabelColour=obj.xLabelColour;

    // Calculate maxValue and scale
    this.maxValue = max(this.data.map((d) => d[this.yValue])); // Get the max height of the chart
    this.scale = this.chartHeight / this.maxValue; // Calculate the scale for the chart
  }

  render() {
    //draws charts x and y lines
    push();
    translate(this.xBarPos, this.yBarPos);
    strokeWeight(this.axisLineWeight);
    stroke(this.axisLineColour);
    line(0, 0, 0, -this.chartHeight);
    line(0, 0, this.chartWidth, 0);

    // Map for labels x is just a name
    let XLabels = this.data.map((x) => x[this.xValue]);

    // Draw ticks on y-axis
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(0, i * (-this.chartHeight / this.numTicks));
      line(0, 0, -5, 0);
      pop();
    }

    //  tick text
    let tickValue = this.maxValue / this.numTicks; //prevents it from going over the max of preset value in the column/rows. On first loop it did display the max value (453) but kept going over it, which is why we needed another variable that handles the 'gap difference' between each value label.
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(0, (i * -this.chartHeight) / this.numTicks);
      noStroke();
      textSize(this.ticksTextSize);
      textStyle(this.tickStyle);
      fill(this.ticksColour);
      textAlign(this.tickHorz, this.tickVert);
      textFont(this.genFont);

      text(Math.ceil(i * tickValue), -10, 0); //math ceil rounds to the highest whole number.
      //round() can also be used and a decimal amount can be placed
      //everytime 'i' loops it adds from the previous loop to the current one
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
      //loops to draw each by the length of the data
      fill(this.barFill[i % this.barFill.length]);
      noStroke();
      rect(0, 0, this.barWidth, -this.data[i][this.yValue] * this.scale); //draws each bar by using the iteration i to calculate each heigh and then jumps to the next bar
      translate(gap + this.barWidth, 0);
      //calculates the co-ordinate it should draw the next bar at

      // text xValue Label
      push();
      textSize(this.textSizeText);
      if (this.textRotate === 0) {
        textAlign(RIGHT, CENTER);
      } else {
        textAlign(this.xLabelHorz, this.xLabelVert);
      }
      rotate(this.textRotate);
      fill(this.xLabelColour);
      text(XLabels[i], 0, this.xLabelHeight); //fills the text with the each corresponding year
      translate(this.barWidth / 2, 0);
      pop();
    }
    pop();

    //subtext x axis
    push();
    noStroke();
    fill(this.textColour);
    textFont(this.fontBold);
    textAlign(this.colHorzAlign, this.colVertAlign);
    textSize(this.textSizeColText);
    text(this.colLabel, this.textColX, this.textColY);
    pop();

    //text chart title
    push();
    noStroke();
    fill(this.titleColour);
    textFont(this.fontBold);
    textSize(this.textSizeTitle);
    textStyle(this.titleWeight);
    textAlign(this.titleHorzAlign, this.titleVertAlign);
    text(this.titleText, this.textTitleX, -this.textTitleY, this.titlePaddingX);
    pop();

    //subtext y axis

    push();
    noStroke();
    fill(this.colYAxisColour);
    textSize(this.colYAxisSize);
    textAlign(this.colYHorzAlign,this.colYVertAlign);
    rotate(this.colYAxisRotation);
    textStyle(this.colYAxisStyle);
    text(this.colYAxisTextValue, this.colYAxisTextX, this.colYAXisTextY);

    pop();
  }
}
