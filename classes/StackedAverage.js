class StackedAverage {
  constructor(obj) {
    //canvas
    this.canvasWidth = obj.canvasWidth;
    this.canvasHeight = obj.canvasHeight;

    //CHART
    this.data = obj.data;
    this.chartWidth = obj.chartWidth;
    this.chartHeight = obj.chartHeight;
    this.xAvgPos = obj.xAvgPos;
    this.yAvgPos = obj.yAvgPos;
    this.barWidth = obj.barWidth;
    this.yValues = obj.yValues;
    this.xValue = obj.xValue;
    this.calculateTotal();
    this.calculateAverage();
    this.totalArray = [];
    this.genFont = obj.genFont;
    this.fontBold = obj.fontBold;

    //ticks
    this.numTicks = obj.numTicks;
    this.ticksTextSize = obj.ticksTextSize;

    //avg line and text
    this.avgLineWeight=obj.avgLineWeight;

    //x axis labels
    this.textSizeText = obj.textSizeText;
    this.textSizeColText = obj.textSizeColText;
    this.textRotate = obj.textRotate;

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
    this.avgLineColour = obj.avgLineColour;
    this.axisLineColour = obj.axisLineColour;

    this.scale = this.chartHeight / this.maxValue; // Calculate the scale for the chart
  }
  calculateTotal() {
    this.totalArray = [];

    for (let i = 0; i < this.data.length; i++) {
      let total = 0;
      for (let j = 0; j < this.yValues.length; j++) {
        // Sum up all values within each array
        total += int(this.data[i][this.yValues[j]]);
        //int makes sure any values are converted to integers
      }
      this.totalArray.push(total);//pushes into the array
    }

    // Calculate maxValue after populating totalArray
    this.maxValue = max(this.totalArray);
  }

  //another way to calculate the average
  //   calculateAverage() {
  //     let sum = 0;
  //     let count = 0;

  //     // Iterate over each data object
  //     for (let i = 0; i < this.data.length; i++) {
  //         // Iterate over each key in the data object
  //         for (let j = 0; j < this.yValues.length; j++) {
  //             // Get the value associated with the current key
  //             let value = parseInt(this.data[i][this.yValues[j]]);
  //             // Add the value to the sum
  //             sum += value;
  //             // Increment the count
  //             count++;
  //         }
  //     }

  //     // Calculate the average
  //     this.average = sum / count;
  // }
  calculateAverage() {
    let totalSum = 0;

    // Sum up all the values in totalArray
    for (let i = 0; i < this.totalArray.length; i++) {
      totalSum += this.totalArray[i];
    }

    // Calculate the average
    this.average = (totalSum / this.totalArray.length) / this.yValues.length;
    //dividing by this.yValues.length ensures the loop doesnt sum the loop itself, depending on the amount of values in yValues. This ensures to always get the first average before it gets added to itself.
  }

  render() {

    push();
    translate(this.xAvgPos, this.yAvgPos);
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
      textAlign(RIGHT, CENTER);
      textFont(this.genFont);
      text(Math.ceil(i * tickValue), -10, 0); //everytime i loop it adds from the previous loop to the current one
      pop();
    }

    // Calculate gap
    let gap =
      (this.chartWidth - this.data.length * this.barWidth) /
      (this.data.length + 1);

    //drawing bars
    push();

    translate(gap, 0);//makes sure our starting point is a gap away from the y graph line
    for (let i = 0; i < this.data.length; i++) {//amount of data
      push();
      for (let j = 0; j < this.yValues.length; j++) {//gets all the values in yValues
        let value = this.data[i][this.yValues[j]];//iterates each value
        let barHeight = -value * this.scale;//barheight is - (since we're working below the orignal y co-ord) and scales it according to the maxvalue and chartheight

        noStroke();
        fill(this.barFill[j]);

        rect(0, 0, this.barWidth, barHeight);
        translate(0, barHeight);//makes sure to always skip to the next bar of the second array in yValues
      }
      pop();
      translate(gap + this.barWidth, 0);//makes the gap within the bars

      // Text X AXIS
      push();
      textSize(this.textSizeText);
      if (this.textRotate === 0) {
        textAlign(CENTER, CENTER);
      } else {
        textAlign(LEFT, CENTER);
      }
      rotate(this.textRotate);
      fill(this.textColour);
      text(XLabels[i], 0, 30);
      translate(this.barWidth / 2, 20);
      pop();
    }
    pop();

    //average line 
    push();
    stroke(this.avgLineColour); // Red color
    strokeWeight(this.avgLineWeight);
    translate(0, -this.average * this.scale);
    line(0, 0, this.chartWidth, 0);
    push();
    pop();

    pop();
    //text xvalue col name
    push();
    noStroke();
    fill(this.textColour);
    textFont(this.fontBold);
    textAlign(this.colHorzAlign, this.colVertAlign);
    textSize(this.textSizeColText);
    // textStyle(this.textColWeight);
    text(this.colLabel, this.textColX, this.textColY);
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
