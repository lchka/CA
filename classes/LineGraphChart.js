//fix scaling, first loop is already the max, how to set the max from the array of cleanData, with the lowest value as first tick

class LineGraphChart {
  constructor(obj) {
    //canvas
    this.canvasWidth = obj.canvasWidth;
    this.canvasHeight = obj.canvasHeight;

    //CHART
    this.data = obj.data;
    this.chartWidth = obj.chartWidth;
    this.chartHeight = obj.chartHeight;
    this.xLinePos = obj.xLinePos;
    this.yLinePos = obj.yLinePos;
    this.axisLineColour = obj.axisLineColour;
    this.yValue = obj.yValue;
    this.yValues = obj.yValues;
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

    //subtext

    this.subLabel = obj.subLabel; //to pull the section name from the csv file
    this.textSubX = obj.textSubX;
    this.textSubY = obj.textSubY;
    this.subVertAlign = obj.subVertAlign;
    this.subHorzAlign = obj.subHorzAlign;
    this.textSizeSub = obj.textSizeSub;

    //text col y axis name

    // this.colYAxisColour = obj.colYAxisColour;
    // this.colYAxisSize = obj.colYAxisSize;
    // this.colYAxisRotation = obj.colYAxisRotation;
    // this.colYAxisStyle = obj.colYAxisStyle;
    // this.colYAxisTextValue = obj.colYAxisTextValue;
    // this.colYAxisTextX = obj.colYAxisTextX;
    // this.colYAXisTextY = obj.colYAxisTextY;

    //text  for title
    this.textSizeTitle = obj.textSizeTitle;
    this.titleText = obj.titleText;
    this.textTitleX = obj.textTitleX;
    this.textTitleY = obj.textTitleY;
    this.titlePaddingX = obj.titlePaddingX;
    this.titleWeight = obj.titleWeight;
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
    this. xAxisTextYOnePos=obj. xAxisTextYOnePos;
    this.textSizeText = obj.textSizeText;
    this.textSizeColText = obj.textSizeColText;
    this.textRotate = obj.textRotate;
    this.xValue = obj.xValue;

    //indi line
    this.indiLineOneHorzAlign = obj.indiLineOneHorzAlign;
    this.indiLineOneVertAlign = obj.indiLineOneVertAlign;
    this.indiLineRotate = obj.indiLineRotate;
    this.indiLineOneHeight = obj.indiLineOneHeight;
    this.indiLineTwoHeight = obj.indiLineTwoHeight;
    this.indiLineWeight = obj.indiLineWeight;

    //colors
    this.barFill = obj.barFill;
    this.textColour = obj.textColour;
    this.textTitleColour = obj.textTitleColour;
    this.bColour = obj.bColour;
    this.ticksValueColour = obj.ticksValueColour;
    this.pointsColour = obj.pointsColour;
    this.chartLineColour = obj.chartLineColour;
    this.chartLineIndiLineColour = obj.chartLineIndiLineColour;
    this.subTextColour = obj.subTextColour;
    this.textXLabelColour = obj.textXLabelColour;

    // Calculate maxValue and scale
    this.maxValue = max(this.data.map((d) => d[this.yValue])); // Get the max value from the yValue of the chart
    this.scale = this.chartHeight / this.maxValue; // Calculate the scale for the chart
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
      textFont(this.fontBold);
      fill(this.ticksValueColour);
      textAlign(RIGHT, CENTER);

      text(Math.ceil(i * tickValue), this.tickTextXPos, 0); //everytime it loops it adds from the previous loop to the current one, used math,ciel to round to the nearest whole number
      pop();
    }

    // Drawing chart lines and points
    let xStep = this.chartWidth / (this.data.length - 1);
    let yStep = this.chartHeight / this.maxValue;
    noFill();
    for (let j = 0; j < this.yValues.length; j++) {//iterates throught the yValues
      beginShape();
      noFill();
      for (let i = 0; i < this.data.length; i++) {
        stroke(this.chartLineColour[j]);
        strokeWeight(this.axisLineStrokeWeight);
        let yLine = -this.data[i][this.yValues[j]] * yStep;//pulls the values from yValues individually and then using yStep it jumps to the next

        // Draw points
        push();
        fill(this.pointsColour);
        noStroke();
        ellipse(i * xStep, yLine, this.pointEllipseSize);//draws ellipses on each point of 'contact' where we get to point a to b
        noFill();
        pop();

        // Draw text for xLabel below graph line
        push();
        noStroke();
        translate(i * xStep, this.textYPosXLabel);//Draws the next xStep, in normal barchart this would be gapWidth
        rotate(this.textXLabelRotate);
        fill(this.textXLabelColour);
        textSize(this.textSizeXLabel);
        textFont(this.fontBold);
        textAlign(this.horzAlignXLabel, this.vertAlignXLabel);
        text(this.data[i][this.xValue], 0, this.textYPosXLabel);//draws years below the line
        pop(); 

        // Draw the Indicator line alongside the text
        if (j === 0) {
          //array one text so the first line
          push();
          translate(i * xStep, yLine);
          stroke(this.chartLineIndiLineColour[j]);
          strokeWeight(this.xLabelLineWeight);
          rotate(this.textRotate); 
          line(0, 0, 0, this.indiLineOneHeight);
          pop();

          // Draw text for chart line labels first array
          push();
          noStroke();
          textFont(this.fontBold);
          fill(this.textColour[j]);
          textSize(this.textSize);
          textAlign(LEFT, CENTER);
          text(
            this.data[i][this.yValues[j]],
            i * xStep,
            yLine + this. xAxisTextYOnePos
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
          fill(this.textColour[j]);
          textSize(this.textSize);
          textAlign(LEFT, CENTER);
          text(
            this.data[i][this.yValues[j]],
            i * xStep,
            yLine + (-this.xAxisTextYTwoPos)
          ); // Adjusted y position for clarity
          pop();
        }

        vertex(i * xStep, yLine); //makes the line move to the next point, by looping it take the past iteration and add any need values to that, in this case [i] , stand for the iteration of the loop, and add the needed values to move to the next point.
      }
      noFill();
      endShape();
    }
    pop();

    //subtext
    push();
    noStroke();
    fill(this.subTextColour);
    textFont(this.fontBold);
    textAlign(this.subHorzAlign, this.subVertAlign);
    textSize(this.textSizeSub);
    text(this.subLabel, this.textSubX, this.textSubY);
    pop();

    // main for title each graph
    push();
    noStroke();
    fill(this.textTitleColour);
    textFont(this.fontBold);
    textSize(this.textSizeTitle);
    textStyle(this.titleWeight);
    textAlign(this.titleHorzAlign, this.titleVertAlign);
    text(this.titleText, this.textTitleX, -this.textTitleY, this.titlePaddingX);
    pop();

    pop();
  }
}
