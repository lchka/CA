//fix scaling, first loop is already the max, how to set the max from the array of cleanData, with the lowest value as first tick

class BarChart {
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
    this.ticksTextSize=obj.ticksTextSize;
    this.tickStyle=obj.tickStyle;

    //TEXT
    this.textSizeText = obj.textSizeText;
    this.textSizeColText = obj.textSizeColText;
    this.textRotate = obj.textRotate;
    this.xValue = obj.xValue;
    

        //text for col name

    this.colLabel = obj.colLabel; //to pull the section name from the csv file
    this.textColX = obj.textColX;
    this.textColY = obj.textColY;
this.textColWeight=obj.textColWeight;

         //text  for title
    this.textSizeTitle = obj.textSizeTitle;
    this.titleText = obj.titleText;
    this.textTitleX= obj.textTitleX;
    this.textTitleY=obj.textTitleY;
    this.titlePaddingX=obj.titlePaddingX;
    this.titleWeight=obj.titleWeight;

    //colors
    this.barFill = obj.barFill;
    this.textColour = obj.textColour;
    this.bColour = obj.bColour;
    this.ticksColour=obj.ticksColour;

    // Calculate maxValue and scale
    this.maxValue = max(this.data.map((d) => d[this.yValue])); // Get the max height of the chart
    this.scale = this.chartHeight / this.maxValue; // Calculate the scale for the chart
  }

  render() {
    // for (let i = 0; i < 1000; i++) {
    //   if (this.scale % this.numTicks == 0) {
    //     break;
    //   } else {
    //     this.scale = this.scale + 1;
    //   }
    // }

    push();
    translate(this.xPos, this.yPos);
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
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(0, (i * -this.chartHeight) / this.numTicks);
      noStroke();
      textSize(this.ticksTextSize);
      textStyle(this.tickStyle);
      fill(this.ticksColour);
      textAlign(RIGHT, CENTER);
      text(i * this.maxValue, -10, 0);
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

    //text xvalue col name
    push();
    noStroke();
    fill(this.textColour);
    textSize(this.textSizeColText);
    textStyle(this.textColWeight);

    textAlign(CENTER, CENTER);
    text(this.colLabel, this.textColX, this.textColY);
    pop();

    //text xvalue title name
    push();
    noStroke();
    fill(this.textColour);
    textSize(this.textSizeTitle);
    textStyle(this.titleWeight);
    textAlign(CENTER, CENTER);
    text(this.titleText, this.textTitleX, -this.textTitleY,this.titlePaddingX);
    pop();
  }
}
