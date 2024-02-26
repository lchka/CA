class StackedChart100 {
  constructor(obj) {
    //canvas
    this.canvasWidth = obj.canvasWidth;
    this.canvasHeight = obj.canvasHeight;

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
    this.yValueTotal = obj.yValueTotal;
    this.totalArray = obj.totalArray;
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
    this.tickStyle = obj.tickStyle;

    //text x axis
    this.textSizeText = obj.textSizeText;
    this.textSizeColText = obj.textSizeColText;
    this.textRotate = obj.textRotate;
    this.xLabelHeight = obj.xLabelHeight;

    //text for col name

    this.colLabel = obj.colLabel; //to pull the section name from the csv file
    this.textColX = obj.textColX;
    this.textColY = obj.textColY;
    this.textColWeight = obj.textColWeight;
    this.colVertAlign = obj.colVertAlign;
    this.colHorzAlign = obj.colHorzAlign;

    //text col y axis name

    this.colYAxisColour = obj.colYAxisColour;
    this.colYAxisSize = obj.colYAxisSize;
    this.colYAxisRotation = obj.colYAxisRotation;
    this.colYAxisStyle = obj.colYAxisStyle;
    this.colYAxisTextValue = obj.colYAxisTextValue;
    this.colYAxisTextX = obj.colYAxisTextX;
    this.colYAxisTextY = obj.colYAxisTextY;

    //text  for title
    this.textSizeTitle = obj.textSizeTitle;
    this.titleText = obj.titleText;
    this.textTitleX = obj.textTitleX;
    this.textTitleY = obj.textTitleY;
    this.titlePaddingX = obj.titlePaddingX;
    this.titleWeight = obj.titleWeight;
    this.titleVertAlign = obj.titleVertAlign;
    this.titleHorzAlign = obj.titleHorzAlign;

    //avg line and text
    this.avgLineWeight = obj.avgLineWeight;
    this.avgLineTextColour = obj.avgLineTextColour;
    this.avgLineTextSize = obj.avgLineTextSize;
    this.avgLineTextHorzAlign = obj.avgLineTextHorzAlign;
    this.avgLineTextVertAlign = obj.avgLineTextVertAlign;
    this.avgLineTextXPos = obj.avgLineTextXPos;
    this.avgLineTextYPos = obj.avgLineTextYPos;

    //key for distraction
    this.keyTitle = obj.keyTitle;
    this.keyTitleSize = obj.keyTitleSize;
    this.keyTitleHorzAlign = obj.keyTitleHorzAlign;
    this.keyTitleVertAlign = obj.keyTitleVertAlign;
    this.keyXTitle = obj.keyXTitle;
    this.keyYTitle = obj.keyYTitle;
    this.keyXPos = obj.keyXPos;
    this.keyYPos = obj.keyYPos;
    this.keyPaddingY = obj.keyPaddingY;
    this.strokeWeightForBox = obj.strokeWeightForBox;
    this.boxSize = obj.boxSize;
    this.keyTextSize = obj.keyTextSize;
    this.keyTextHorzAlign = obj.keyTextHorzAlign;
    this.keyTextVertAlign = obj.keyTextVertAlign;

    //colors
    this.barFill = obj.barFill;
    this.textColour = obj.textColour;
    this.bColour = obj.bColour;
    this.ticksColour = obj.ticksColour;
    this.avgLineColour = obj.avgLineColour;
    this.strokeColourForBox = obj.strokeColourForBox;
    this.keyTextColour = obj.keyTextColour;
    this.chartLineColour = obj.chartLineColour;

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
        textAlign(LEFT, CENTER);
      }
      rotate(this.textRotate);
      fill(this.textColour);
      text(XLabels[i], 0, this.xLabelHeight); //fills the text with the each corresponding year
      translate(this.barWidth / 2, 20);
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
        "The average is: " + this.average,
        this.chartWidth - this.avgLineTextXPos,
        -this.chartHeight + this.avgLineTextYPos
      );
    }

    //subtext x axis
    push();
    noStroke();
    fill(this.textColour);
    textFont(this.fontBold);
    textAlign(this.colHorzAlign, this.colVertAlign);
    textSize(this.textSizeColText);
    text(this.colLabel, this.textColX, this.textColY);
    pop();

    //key for distraction
    push();
    noStroke();
    fill("#000000");
    textSize(this.keyTitleSize);
    textAlign(this.keyTitleHorzAlign, this.keyTitleVertAlign);
    textFont(this.fontBold);
    console.log(this.keyTitle);
    text("Key For Distractions", this.keyXTitle, this.keyYTitle);

    for (let s = 0; s < this.yValues.length; s++) {
      translate(this.keyXPos, this.keyYPos + s * this.keyPaddingY); // Adjust the vertical translation to create space between each rectangle and text
      textFont(this.genFont);
      stroke("#000000");
      strokeWeight(this.strokeWeightForBox);
      textFont(this.fontBold);
      fill(this.chartLineColour);
      rect(0, 0, this.boxSize, this.boxSize); // Rectangle position is relative to the translated origin
      noStroke();
      fill(this.keyTextColour);

      textSize(this.keyTextSize);
      textAlign(this.keyTextHorzAlign, this.keyTextVertAlign);

      text(this.yValues[s], this.textXPos, this.textYPos);
    }
    pop();

    //text for title
    push();
    noStroke();
    fill("#000000");
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
    textStyle(this.colYAxisStyle);
    text(this.colYAxisTextValue, this.colYAxisTextX, this.colYAxisTextY);

    pop();
  }
}
