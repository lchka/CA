//fix scaling, first loop is already the max, how to set the max from the array of cleanData, with the lowest value as first tick

class HorzBarChart {
  constructor(obj) {
    //CHART
    this.data = obj.data;
    this.chartWidth = obj.chartWidth;
    this.chartHeight = obj.chartHeight;
    this.xHorzPos = obj.xHorzPos;
    this.yHorzPos = obj.yHorzPos;
    this.barHeight = obj.barHeight;
    this.yValue = obj.yValue;
    this.xValue = obj.xValue;
    this.genFont = obj.genFont;
    this.fontBold = obj.fontBold;
    this.lineGraphWeight = obj.lineGraphWeight;

    //bar Value text
    this.barValueHorz = obj.barValueHorz;
    this.barValueVert = obj.barValueVert;
    this.barValueTextSize = obj.barValueTextSize;
    this.barValueXPos=obj.barValueXPos;

    //ticks
    this.numTicks = obj.numTicks;
    this.ticksTextSize = obj.ticksTextSize;
    this.tickVert = obj.tickVert;
    this.tickHorz = obj.tickHorz;
    this.tickLength=obj.tickLength;
    this.tickTextYPos=obj.tickTextYPos;
    this.tickTextXPos=obj.tickTextXPos;

    //text yLabel
    this.textSizeText = obj.textSizeText;
    this.textRotate = obj.textRotate;
    this.xAxisHorz = obj.xAxisHorz;
    this.xAxisVert = obj.xAxisVert;
    this.yLabelYPos=obj.yLabelYPos;

    //subtext x axis
    this.subLabel = obj.subLabel; //to pull the section name from the csv file
    this.textSubX = obj.textSubX;
    this.textSubY = obj.textSubY;
    this.subVertAlign = obj.subVertAlign;
    this.subHorzAlign = obj.subHorzAlign;
    this.textSizeSub = obj.textSizeSub;

    // subtext y axis
    this.colYAxisSize = obj.colYAxisSize;
    this.colYAxisRotation = obj.colYAxisRotation;
    this.colYAxisStyle = obj.colYAxisStyle;
    this.colYAxisTextValue = obj.colYAxisTextValue;
    this.colYAxisTextX = obj.colYAxisTextX;
    this.colYAXisTextY = obj.colYAxisTextY;
    this.colYHorzAlign=obj.colYHorzAlign;
    this.colYVertAlign=obj.colYVertAlign;


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
    this.axisLineColour = obj.axisLineColour;
    this.textColour = obj.textColour;
    this.ticksColour = obj.ticksColour;
    this.subTextColour = obj.subTextColour;
    this.barValueColour = obj.barValueColour;
    this.colYAxisColour = obj.colYAxisColour;


    // Calculate maxValue and scale
    this.maxValue = max(this.data.map((d) => d[this.xValue])); // Get the max height of the chart
    this.scale = this.maxValue / this.chartHeight; // Calculate the scale for the chart
  }

  render() {
    push();
    translate(this.xHorzPos, this.yHorzPos);
    strokeWeight(this.lineGraphWeight);
    stroke(this.axisLineColour);
    line(0, 0, this.chartWidth, 0);

    // Map for labels x is just a name
    let yLabel = this.data.map((x) => x[this.yValue]); //gets all the values from yValue
    let xLabel = this.data.map((s) => s[this.xValue]); //gets all the values from xValue

    // Draw ticks on X-axis
    for (let i = 0; i <= this.numTicks; i++) {//dived the number of ticks equally to the length of the chart/height
      push();
      push();
      translate(i * (this.chartWidth / this.numTicks), 0);
      line(0, 0, 0, this.tickLength);
      pop();
    }

    //  tick text
    let tickValue = this.maxValue / this.numTicks;
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate((i * this.chartWidth) / this.numTicks, this.tickTextYPos);//translates each tick to move upwards and diving it by the amount of tick to spread them evenly
      noStroke();
      textSize(this.ticksTextSize);
      rotate(this.textRotate);
      fill(this.textColour);
      text(Math.ceil(i * tickValue), this.tickTextXPos, 0);
      //math ceil rounds to the highest whole number.
      //round() can also be used and a decimal can be placed
      //everytime 'i' loops it adds from the previous loop to the current one
      pop();
    }

    // Calculate gap
    let gap =
      (this.chartHeight - this.data.length * this.barHeight) /
      (this.data.length + 1);

    // Draw bars
    push();
    translate(0, -this.chartHeight);
    for (let i = 0; i < this.data.length; i++) {
      let barWidth = map(
        this.data[i][this.xValue],
        0,
        this.maxValue,
        0,
        this.chartWidth
      ); //gets all the data from the xValue and pulls out each individual values and displays them.
      fill(this.barFill[i % this.barFill.length]);////modulus used as there is an uneven number of bars to amount of colours
      noStroke();
      rect(0, 0, barWidth, gap); // Adjust width based on xValue

      // Draw bar value
      push();
      fill(this.barValueColour);
      textFont(this.fontBold);
      textAlign(this.xAxisHorz, this.xAxisVert); // Set text alignment
      textSize(this.barValueTextSize);
      text(xLabel[i], barWidth + this.barValueXPos, -this.chartHeight / this.data.length / 2); // Draw text
      // Translate for the next bar and pulling the individual text
      translate(0, gap + this.barHeight);

      // text yLabel
      push();
      textFont(this.genFont);

      textSize(this.textSizeText);
      rotate(this.textRotate);
      fill(this.textColour);
      text(yLabel[i], this.yLabelYPos, -this.chartHeight / this.data.length - 10); //hardcoded so that it will always have an amount of padding
      translate(0, -this.barHeight / 2);
      pop();
    }
    pop();

    //subtext x axis

    push();
    noStroke();
    fill(this.subTextColour);
    textFont(this.fontBold);
    textAlign(this.subHorzAlign, this.subVertAlign);
    textSize(this.textSizeSub);
    text(this.subLabel, this.textSubX, this.textSubY);
    pop();

    //text for title

    push();
    noStroke();
    fill(this.textColour);
    textFont(this.fontBold);
    textSize(this.textSizeTitle);
    textStyle(this.titleWeight);
    textAlign(this.titleHorzAlign, this.titleVertAlign);
    text(this.titleText, this.textTitleX, -this.textTitleY, this.titlePaddingX);
    pop();

    // subtext y axis
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
