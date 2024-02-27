class StackedBarChart {
  constructor(obj) {
    //CHART
    this.data = obj.data;
    this.chartWidth = obj.chartWidth;
    this.chartHeight = obj.chartHeight;
    this.xStackedPos = obj.xStackedPos;
    this.yStackedPos = obj.yStackedPos;
    this.barWidth = obj.barWidth;
    this.yValues = obj.yValues;
    this.xValue = obj.xValue;
    this.calculateTotal();
    this.totalArray = [];
    this.lineGraphWeight = obj.lineGraphWeight;

    //ticks
    this.numTicks = obj.numTicks;
    this.ticksTextSize = obj.ticksTextSize;
    this.tickLength=obj.tickLength;
    this.tickHorzAlign=obj.tickHorzAlign;
    this.tickVertAlign=obj.tickVertAlign;
this.tickTextXPos=obj.tickTextXPos;
    //xLabels
    this.textSizeText = obj.textSizeText;
    this.textSizeColText = obj.textSizeColText;
    this.textRotate = obj.textRotate;
    this.genFont = obj.genFont;
    this.fontBold = obj.fontBold;
    this.xLabelHeight = obj.xLabelHeight;
    this.xLabelHorzAlign=obj.xLabelHorzAlign;
    this.xLabelVertAlign=obj.xLabelVertAlign;

    //subtext x axis
    this.colLabel = obj.colLabel;
    this.textColX = obj.textColX;
    this.textColY = obj.textColY;
    this.colVertAlign = obj.colVertAlign;
    this.colHorzAlign = obj.colHorzAlign;

    //subtext y axis

    this.colYAxisSize = obj.colYAxisSize;
    this.colYAxisRotation = obj.colYAxisRotation;
    this.colYAxisTextValue = obj.colYAxisTextValue;
    this.colYAxisTextX = obj.colYAxisTextX;
    this.colYAXisTextY = obj.colYAxisTextY;

    //text  for title
    this.textSizeTitle = obj.textSizeTitle;
    this.titleText = obj.titleText;
    this.textTitleX = obj.textTitleX;
    this.textTitleY = obj.textTitleY;
    this.titlePaddingX = obj.titlePaddingX;
    this.titleVertAlign = obj.titleVertAlign;
    this.titleHorzAlign = obj.titleHorzAlign;

    // key for yValues
    this.strokeWeightForBox = obj.strokeWeightForBox;
    this.keyXPos = obj.keyXPos;
    this.keyYPos = obj.keyYPos;
    this.boxSize = obj.boxSize;
    this.textXPos = obj.textXPos;
    this.textYPos = obj.textYPos;
    this.keyPaddingY = obj.keyPaddingY;
    this.keyYTitle = obj.keyYTitle;
    this.keyXTitle = obj.keyXTitle;
    this.keyTitle = obj.keyTitle;
    this.keyTitleSize = obj.keyTitleSize;
    this.keyTitleHorzAlign = obj.keyTitleHorzAlign;
    this.keyTitleVertAlign = obj.keyTitleVertAlign;
    this.keyTextHorzAlign = obj.keyTextHorzAlign;
    this.keyTextVertAlign = obj.keyTextVertAlign;

    //colors
    this.strokeColourForBox = obj.strokeColourForBox;
    this.barFill = obj.barFill;
    this.textColour = obj.textColour;
    this.ticksColour = obj.ticksColour;
    this.colYAxisColour = obj.colYAxisColour;
    this.axisLineColour = obj.axisLineColour;
    this.titleColour = obj.titleColour;
    this.xLabelColour = obj.xLabelColour;
    this.strokeColourForBox = obj.strokeColourForBox;
    this.keyTextColour = obj.keyTextColour;
    this.keyTitleColour = obj.keyTitleColour;

    this.scale = this.chartHeight / this.maxValue; // Calculate the scale for the chart
  }
  calculateTotal() {
    this.totalArray = [];

    for (let i = 0; i < this.data.length; i++) {
      //gets the length of the data
      let total = 0;
      for (let j = 0; j < this.yValues.length; j++) {
        //iterates through yValues

        // Sum up all values within each array
        total += int(this.data[i][this.yValues[j]]); //had to be converted to integers as the second object in the array cam up as NaN.
      }
      this.totalArray.push(total); //pushed into array so that they're individual values
    }
    console.log(this.totalArray);

    // Calculate maxValue after populating totalArray
    this.maxValue = max(this.totalArray);
  }

  render() {
    push();
    translate(this.xStackedPos, this.yStackedPos);
    strokeWeight(this.lineGraphWeight);
    stroke(this.axisLineColour);
    line(0, 0, 0, -this.chartHeight);
    line(0, 0, this.chartWidth, 0);

    // Map for labels x is just a name
    let XLabels = this.data.map((x) => x[this.xValue]);

    // Draw ticks on y-axis
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(0, i * (-this.chartHeight / this.numTicks));
      line(0, 0, this.tickLength, 0);
      pop();
    }

    //  tick text
    let tickValue = this.maxValue / this.numTicks; //prevents it from going over the max of preset value in the column/rows. On first loop it did display the max value (453) but kept going over it, which is why we needed another variable that handles the 'gap difference' between each value label.
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(0, (i * -this.chartHeight) / this.numTicks);
      noStroke();
      textSize(this.ticksTextSize);
      fill(this.ticksColour);
      textAlign(this.tickHorzAlign, this.tickVertAlign);
      textFont(this.genFont);
      text(Math.ceil(i * tickValue), this.tickTextXPos, 0); //math ceil rounds to the highest whole number.
      //round() can also be used and a decimal can be placed
      //everytime 'i' loops it adds from the previous loop to the current one
      pop();
    }

    // Calculate gap
    let gap =
      (this.chartWidth - this.data.length * this.barWidth) /
      (this.data.length + 1);

    //drawing bars
    push();
    translate(gap, 0);
    for (let i = 0; i < this.data.length; i++) {
      push();
      for (let j = 0; j < this.yValues.length; j++) {
        let value = this.data[i][this.yValues[j]]; //draws bars by pulling each array object values and iterates through them per bar
        let barHeight = -value * this.scale; //this make sure the bar scales correctly compared to the actual total

        noStroke();
        fill(this.barFill[j]);

        rect(0, 0, this.barWidth, barHeight); //draws bar
        translate(0, barHeight);
      }
      pop();
      translate(gap + this.barWidth, 0);

      // xLabels text
      push();
      textSize(this.textSizeText);
      if (this.textRotate === 0) {
        textAlign(CENTER, CENTER);
      } else {
        textAlign(this.xLabelHorzAlign, this.xLabelVertAlign);
      }
      textFont(this.genFont);
      noStroke();
      rotate(this.textRotate);
      fill(this.xLabelColour);
      text(XLabels[i], 0, this.xLabelHeight); //fills the text with the each corresponding year
      translate(this.barWidth, 0);
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
    text(this.colYAxisTextValue, this.colYAxisTextX, this.colYAXisTextY);

    pop();

    //key for distraction
    push();
    noStroke();
    fill(this.keyTitleColour);
    textSize(this.keyTitleSize);
    textAlign(this.keyTitleHorzAlign, this.keyTitleVertAlign);
    textFont(this.fontBold);
    text(
      this.keyTitle,
      this.keyXPos + this.keyXTitle,
      this.keyYPos + this.keyYTitle
    );

    for (let s = 0; s < this.yValues.length; s++) {//looping to pull the amount of objects inside the yValues array
      translate(this.keyXPos, this.keyYPos + s * this.keyPaddingY); // Adjust the vertical translation to create space between each rectangle and text
      textFont(this.genFont);
      stroke(this.strokeColourForBox);
      strokeWeight(this.strokeWeightForBox);
      textFont(this.fontBold);
      fill(this.barFill[s]);
      rect(0, 0, this.boxSize, this.boxSize); // Rectangle position is relative to the translated origin
      noStroke();
      fill(this.keyTextColour);

      textSize(this.keyTextSize);
      textAlign(this.keyTextHorzAlign, this.keyTextVertAlign);

      text(this.yValues[s], this.textXPos, this.textYPos);

      pop();
    }
  }
}
