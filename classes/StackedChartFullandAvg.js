class StackedChartFullandAvg {
  constructor(obj) {
    //CHART
    this.data = obj.data;
    this.chartType = obj.chartType;
    this.chartWidth = obj.chartWidth;
    this.chartHeight = obj.chartHeight;
    this.xStacked100Pos = obj.xStacked100Pos;
    this.yStacked100Pos = obj.yStacked100Pos;
    this.axisLineColour = obj.axisLineColour;
    this.barWidth = obj.barWidth;
    this.yValues = obj.yValues;
    this.xValue = obj.xValue;
    this.calculateTotal();
    this.calculateAverage();
    this.average;
    this.lineGraphWeight = obj.lineGraphWeight;
    this.genFont = obj.genFont;
    this.semiFont = obj.semiFont;
    this.fontBold = obj.fontBold;

    //ticks
    this.numTicks = obj.numTicks;
    this.ticksTextSize = obj.ticksTextSize;

    //text xLabel
    this.textSizeText = obj.textSizeText;
    this.textSizeColText = obj.textSizeColText;
    this.textRotate = obj.textRotate;
    this.xLabelHeight = obj.xLabelHeight;
    this.xLabelHorzAlign=obj.xLabelHorzAlign;
    this.xLabelVertAlign=obj.xLabelVertAlign;

    //subtext x axis
    this.colLabel = obj.colLabel; //to pull the section name from the csv file
    this.textColX = obj.textColX;
    this.textColY = obj.textColY;
    this.colVertAlign = obj.colVertAlign;
    this.colHorzAlign = obj.colHorzAlign;

    //subtext y axis
    this.colYAxisColour = obj.colYAxisColour;
    this.colYAxisSize = obj.colYAxisSize;
    this.colYAxisRotation = obj.colYAxisRotation;
    this.colYAxisTextValue = obj.colYAxisTextValue;
    this.colYAxisTextX = obj.colYAxisTextX;
    this.colYAxisTextY = obj.colYAxisTextY;

    //text  for title
    this.textSizeTitle = obj.textSizeTitle;
    this.titleText = obj.titleText;
    this.textTitleX = obj.textTitleX;
    this.textTitleY = obj.textTitleY;
    this.titlePaddingX = obj.titlePaddingX;
    this.titleVertAlign = obj.titleVertAlign;
    this.titleHorzAlign = obj.titleHorzAlign;

    //avg line and text
    this.avgLineWeight = obj.avgLineWeight;
    this.avgLineTextSize = obj.avgLineTextSize;
    this.avgLineTextHorzAlign = obj.avgLineTextHorzAlign;
    this.avgLineTextVertAlign = obj.avgLineTextVertAlign;
    this.avgLineTextXPos = obj.avgLineTextXPos;
    this.avgLineTextYPos = obj.avgLineTextYPos;
    this.avgLineText=obj.avgLineText;

    //colors
    this.barFill = obj.barFill;
    this.textColour = obj.textColour;
    this.ticksColour = obj.ticksColour;
    this.avgLineColour = obj.avgLineColour;
    this.chartLineColour = obj.chartLineColour;
    this.avgLineTextColour = obj.avgLineTextColour;
    this.subXAxisColour = obj.subXAxisColour;
    this.titleColour = obj.titleColour;
    this.xLabelColour=obj.xLabelColour;

    // Calculate maxValue and scale
    this.scale = this.chartHeight / this.maxValue; // Calculate the scale for the chart
  }
  calculateTotal() {
    this.totalArray = [];

    for (let i = 0; i < this.data.length; i++) {
      let total = 0;
      for (let j = 0; j < this.yValues.length; j++) {
        //iterates through all the values in yValues
        // Sum up all values within each array
        total += int(this.data[i][this.yValues[j]]);
      }
      this.totalArray.push(total);
    }
    console.log(this.totalArray);

    //if statement is for the maxvalue being different depending on the chart type
    if (this.chartType == "LINE") {
      this.maxValue = max(this.totalArray);
    } else if (this.chartType == "FULL") {
      this.maxValue = 100; //because 100 percent chart is graded in percentages max can onlu be 100.
    }
  }
  calculateAverage() {
    let totalSum = 0;

    // Sum up all the values in totalArray
    for (let i = 0; i < this.totalArray.length; i++) {
      totalSum += this.totalArray[i];
    }

    // Calculate the average
    this.average = totalSum / this.totalArray.length / this.yValues.length;
    //dividing by this.yValues.length ensures the loop doesnt sum the loop itself, depending on the amount of values in yValues. This ensures to always get the first average before it gets added to itself.
  }
  render() {
    push();
    translate(this.xStacked100Pos, this.yStacked100Pos);
    strokeWeight(this.lineGraphWeight);
    stroke(this.axisLineColour);
    line(0, 0, 0, -this.chartHeight);
    line(0, 0, this.chartWidth, 0);

    // Map for labels x is just a name
    let XLabels = this.data.map((x) => x[this.xValue]); //pulls the individual value from xValue (YEAR)

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
      textAlign(RIGHT, CENTER);
      textFont(this.genFont);
      text(Math.ceil(i * tickValue), -10, 0); //everytime i loop it adds from the previous loop to the current one
      pop();
    }

    ///DRAWING BARS ANG GAP

    // Calculate gap
    let gap =
      (this.chartWidth - this.data.length * this.barWidth) /
      (this.data.length + 1);

    //drawing bars
    push();
    translate(gap, 0);

    //first loop
    for (let i = 0; i < this.data.length; i++) {
      let barStart = 0; // initialize the starting point of the bar
      push();
      //second loop
      for (let j = 0; j < this.yValues.length; j++) {
        let value = this.data[i][this.yValues[j]];
        fill(this.barFill[j]);
        noStroke();
        //if statement fot either AVG LINE or 100% FULL
        if (this.chartType == "FULL") {
          let percentage = (value / this.totalArray[i]) * 100; // calculate the percentage relative to the total
          let barHeight = -(percentage / 100) * this.chartHeight; // calculate the height of the bar
          rect(0, barStart, this.barWidth, barHeight); // Draw the next bar
          barStart += barHeight; // update the starting point for the next bar
        } else if ((this.chartType = "LINE")) {
          let barHeight = -value * this.scale; //barheight is - (since we're working below the orignal y co-ord) and scales it according to the maxvalue and chartheight
          rect(0, 0, this.barWidth, barHeight);
          translate(0, barHeight); //makes sure to always skip to the next bar of the second array in yValues
        }
      }
      pop();
      translate(gap + this.barWidth, 0); // Move to the next bar position

      // xLabels
      push();
      noStroke();
      textSize(this.textSizeText);
      if (this.textRotate === 0) {
        textAlign(CENTER, CENTER);
      } else {
        textAlign(this.titleHorzAlign, this.titleVertAlign);
      }
      rotate(this.textRotate);
      fill(this.xLabelColour);
      textFont(this.genFont);
      text(XLabels[i], 0, this.xLabelHeight); //fills the text with the each corresponding year
      translate(this.barWidth / 2, 0);
      pop();
    }
    pop();

    //avergae line
    if (this.chartType == "LINE") {
      push();
      stroke(this.avgLineColour); // Red color
      strokeWeight(this.avgLineWeight);
      translate(0, -this.average * this.scale);
      line(0, 0, this.chartWidth, 0);
      pop();
    }
    if (this.chartType == "LINE") {
      noStroke();
      fill(this.avgLineTextColour);
      textSize(this.avgLineTextSize);
      textFont(this.semiFont);
      textAlign(this.avgLineTextHorzAlign, this.avgLineTextVertAlign);
      text(
        this.avgLineText+" "+ this.average,
        this.chartWidth - this.avgLineTextXPos,
        -this.chartHeight + this.avgLineTextYPos
      );
    }

    //subtext x axis
    push();
    noStroke();
    fill(this.subXAxisColour);
    textFont(this.fontBold);
    textAlign(this.colHorzAlign, this.colVertAlign);
    textSize(this.textSizeColText);
    text(this.colLabel, this.textColX, this.textColY);
    pop();

    //text for title
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
    rotate(this.colYAxisRotation);
    text(this.colYAxisTextValue, this.colYAxisTextX, this.colYAxisTextY);

    pop();
  }
}
