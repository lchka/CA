//fix scaling, first loop is already the max, how to set the max from the array of cleanData, with the lowest value as first tick

class LineGraphChart {
  constructor(obj) {

    //CHART
    this.data = obj.data;
    this.chartWidth = obj.chartWidth;
    this.chartHeight = obj.chartHeight;
    this.xLinePos = obj.xLinePos;
    this.yLinePos = obj.yLinePos;
    this.yValues = obj.yValues;
    this.xValue = obj.xValue;
    this.calculateTotal();
    this.totalArray = [];
    this.pointEllipseSize = obj.pointEllipseSize;
    this.chartXYLineWeight = obj.chartXYLineWeight;
    this.axisLineStrokeWeight = obj.axisLineStrokeWeight;
    this.genFont = obj.genFont;
    this.fontBold = obj.fontBold;

    //ticks
    this.numTicks = obj.numTicks;
    this.ticksTextSize = obj.ticksTextSize;
    this.tickStyle = obj.tickStyle;
    this.tickTextXPos = obj.tickTextXPos;
    this.ticksLength = obj.ticksLength;

    //subtext x axis

    this.subLabel = obj.subLabel; //to pull the section name from the csv file
    this.textSubX = obj.textSubX;
    this.textSubY = obj.textSubY;
    this.subVertAlign = obj.subVertAlign;
    this.subHorzAlign = obj.subHorzAlign;
    this.textSizeSub = obj.textSizeSub;

    //subtext y axis
    this.colYAxisSize = obj.colYAxisSize;
    this.colYAxisTextValue = obj.colYAxisTextValue;
    this.colYAxisTextX = obj.colYAxisTextX;
    this.colYAXisTextY = obj.colYAxisTextY;
    this.colYAxisRotation = obj.colYAxisRotation;

    //text  for title
    this.textSizeTitle = obj.textSizeTitle;
    this.titleText = obj.titleText;
    this.textTitleX = obj.textTitleX;
    this.textTitleY = obj.textTitleY;
    this.titlePaddingX = obj.titlePaddingX;
    this.titleVertAlign = obj.titleVertAlign;
    this.titleHorzAlign = obj.titleHorzAlign;

    //text for xLabel
    this.textYPosXLabel = obj.textYPosXLabel;
    this.textSizeXLabel = obj.textSizeXLabel;
    this.textXLabelRotate = obj.textXLabelRotate;
    this.horzAlignXLabel = obj.horzAlignXLabel;
    this.vertAlignXLabel = obj.vertAlignXLabel;
    this.xLabelLineWeight = obj.xLabelLineWeight;
    this.xAxisTextYTwoPos = obj.xAxisTextYTwoPos;
    this.xAxisTextYOnePos = obj.xAxisTextYOnePos;
    this.textSizeText = obj.textSizeText;
    this.textRotate = obj.textRotate;

    //indi line
    this.indiLineOneHeight = obj.indiLineOneHeight;
    this.indiLineTwoHeight = obj.indiLineTwoHeight;

    // key for yValues
    this.strokeWeightForBox = obj.strokeWeightForBox;
    this.keyXPos = obj.keyXPos;
    this.keyYPos = obj.keyYPos;
    this.boxSize = obj.boxSize;
    this.textXPos = obj.textXPos;
    this.textYPos = obj.textYPos;
    this.keyPaddingY = obj.keyPaddingY;
    this.keyTextSize = obj.keyTextSize;

    //colors
    this.strokeColourForBox = obj.strokeColourForBox;
    this.colYAxisColour = obj.colYAxisColour;
    this.textColour = obj.textColour;
    this.textTitleColour = obj.textTitleColour;
    this.ticksValueColour = obj.ticksValueColour;
    this.pointsColour = obj.pointsColour;
    this.chartLineColour = obj.chartLineColour;
    this.chartLineIndiLineColour = obj.chartLineIndiLineColour;
    this.subTextColour = obj.subTextColour;
    this.textXLabelColour = obj.textXLabelColour;
    this.keyTextColour = obj.keyTextColour;
    this.axisLineColour = obj.axisLineColour;

    // Calculate maxValue and scale
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
    //creates the graphs lines
    push();
    translate(this.xLinePos, this.yLinePos);
    stroke(this.axisLineColour);
    strokeWeight(this.chartXYLineWeight);
    line(0, 0, 0, -this.chartHeight);
    line(0, 0, this.chartWidth, 0);

    //

    // Draw ticks on y-axis
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(0, i * (-this.chartHeight / this.numTicks));
      line(0, 0, this.ticksLength, 0);
      pop();
    }

    //  tick text
    let tickValue = this.maxValue / this.numTicks; //prevents it from going over the max of preset value in the column/rows. On first loop it did display the max value (453) but kept going over it, which is why we needed another variable that handles the 'gap difference' between each value label.
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(0, (i * -this.chartHeight) / this.numTicks); //chartheight is always in - as the original 0,0 is above the plus.
      noStroke();
      textSize(this.ticksTextSize);
      textFont(this.genFont);
      fill(this.ticksValueColour);
      textAlign(RIGHT, CENTER);

      text(Math.ceil(i * tickValue), this.tickTextXPos, 0); //everytime it loops it adds from the previous loop to the current one, used math,ciel to round to the nearest whole number
      pop();
    }

    // Drawing chart lines and points
    let xStep = this.chartWidth / (this.data.length - 1);
    let yStep = this.chartHeight / this.maxValue;
    noFill();
    for (let j = 0; j < this.yValues.length; j++) {
      //iterates throught the yValues

      beginShape();
      noFill();
      for (let i = 0; i < this.data.length; i++) {
        stroke(this.chartLineColour[j]);
        strokeWeight(this.axisLineStrokeWeight);
        let yLine = -this.data[i][this.yValues[j]] * yStep; //pulls the values from yValues individually and then using yStep it jumps to the next

        // Draw points
        push();
        fill(this.pointsColour);
        noStroke();
        ellipse(i * xStep, yLine, this.pointEllipseSize); //draws ellipses on each point of 'contact' where we get to point a to b
        noFill();
        pop();

        // text for xLabel
        push();
        noStroke();
        translate(i * xStep, this.textYPosXLabel); //Draws the next xStep, in normal barchart this would be gapWidth
        rotate(this.textXLabelRotate);
        fill(this.textXLabelColour);
        textSize(this.textSizeXLabel);
        textFont(this.genFont);
        textAlign(this.horzAlignXLabel, this.vertAlignXLabel);
        text(this.data[i][this.xValue], 0, this.textYPosXLabel); //draws years below the line
        pop();

        // Draw the Indicator line alongside the text
        if (j === 0) {
          //array one text so the first line
          push();
          translate(i * xStep, yLine);
          stroke(this.chartLineIndiLineColour[j]);
          strokeWeight(this.xLabelLineWeight);
          rotate(-this.textRotate);
          line(0, 0, 0, this.indiLineOneHeight);
          pop();

          // Draw text for chart line labels first array
          push();
          noStroke();
          textFont(this.fontBold);
          fill(this.textColour);
          textSize(this.textSize);
          textAlign(LEFT, CENTER);
          text(
            this.data[i][this.yValues[j]],
            i * xStep,
            yLine + this.xAxisTextYOnePos
          );
          pop();
        } else {
          // Adjust the position of the second indicator line and text
          push();
          translate(i * xStep, yLine);
          stroke(this.chartLineIndiLineColour[1]);
          strokeWeight(this.xLabelLineWeight);
          rotate(-this.textRotate);
          line(0, 0, 0, -this.indiLineTwoHeight); // Different line for the second array
          pop();

          // Draw text for chart line labels first array
          push();
          noStroke();
          textFont(this.fontBold);
          fill(this.textColour);
          textSize(this.textSize);
          textAlign(LEFT, CENTER);
          text(
            this.data[i][this.yValues[j]],
            i * xStep,
            yLine + -this.xAxisTextYTwoPos
          ); // Adjusted y position for clarity
          pop();
        }

        vertex(i * xStep, yLine); //makes the line move to the next point, by looping it take the past iteration and add any need values to that, in this case [i] , stand for the iteration of the loop, and add the needed values to move to the next point.
      }
      noFill();
      endShape();
    }
    pop();

    // key for yValues

    for (let s = 0; s < this.yValues.length; s++) {
      push();

      translate(
        this.xLinePos + this.keyXPos,
        this.yLinePos - this.keyYPos + s * this.keyPaddingY
      );

      stroke(this.strokeColourForBox);
      strokeWeight(this.strokeWeightForBox);
      textFont(this.fontBold);
      fill(this.chartLineColour[s]);
      rect(0, 0, this.boxSize, this.boxSize); // Rectangle position is relative to the translated origin
      noStroke();
      fill(this.keyTextColour);
      textSize(this.keyTextSize);
      text(this.yValues[s], this.textXPos, this.textYPos);
      // Text y position is relative to the translated origin
      pop();
    }

    //subtext x axis
    push();
    noStroke();
    fill(this.subTextColour);
    textFont(this.fontBold);
    textAlign(this.subHorzAlign, this.subVertAlign);
    textSize(this.textSizeSub);
    text(this.subLabel, this.textSubX, this.textSubY);
    pop();

    //subtext y axis
    push();
    noStroke();
    fill(this.colYAxisColour);
    textSize(this.colYAxisSize);
    textAlign(this.colYHorzAlign, this.colYVertAlign);
    textFont(this.fontBold);
    rotate(this.colYAxisRotation);
    text(this.colYAxisTextValue, this.colYAxisTextX, this.colYAXisTextY);
    pop();

    // text for title
    push();
    noStroke();
    fill(this.textTitleColour);
    textFont(this.fontBold);
    textSize(this.textSizeTitle);
    textStyle(this.titleWeight);
    textAlign(this.titleHorzAlign, this.titleVertAlign);
    text(this.titleText, this.textTitleX, -this.textTitleY, this.titlePaddingX);
    pop();
  }
}
