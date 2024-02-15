class BarChart {
  constructor(obj) {
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

    //text
    this.textSizeText = obj.textSizeText;
    this.textRotate = obj.textRotate;
    this.xValue = obj.xValue;

    //colors
    this.barFill = obj.barFill;
    this.textColour = obj.textColour;

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
    let XLabels = this.data.map((x) => x[this.xValue]);

    // Draw ticks on y-axis
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(0, i * (-this.chartHeight / this.numTicks));
      line(0, 0, -5, 0);
      pop();
    }

    // Draw number for the ticks
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(0, i * (-this.chartHeight / this.numTicks));
      fill(255, 255, 0);
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
      fill(this.barFill);
      noStroke();
      rect(0, 0, this.barWidth, -this.data[i][this.yValue] * this.scale);
      translate(gap + this.barWidth, 0);

      // Text 
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
  }
}
