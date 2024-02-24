//fix scaling, first loop is already the max, how to set the max from the array of cleanData, with the lowest value as first tick

class HorzBarChart {
  constructor(obj) {
    //canvas
    this.canvasWidth = obj.canvasWidth;
    this.canvasHeight = obj.canvasHeight;

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

   //ticks
   this.numTicks = obj.numTicks;
   this.ticksTextSize = obj.ticksTextSize;
   this.tickStyle = obj.tickStyle;
   this.tickVert=obj.tickvert;
   this.tickHorz=obj.tickHorz;

    //text y axis
    this.textSizeText = obj.textSizeText;
    this.textSizeColText = obj.textSizeColText;
    this.textRotate = obj.textRotate;
    this.xAxisHorz=obj.xAxisHorz;
    this.xAxisVert=obj.xAxisVert;

    //subtext
    this.subLabel = obj.subLabel; //to pull the section name from the csv file
    this.textSubX = obj.textSubX;
    this.textSubY = obj.textSubY;
    this.subVertAlign = obj.subVertAlign;
    this.subHorzAlign = obj.subHorzAlign;
    this.textSizeSub = obj.textSizeSub;

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
    this.axisLineColour = obj.axisLineColour;
    this.textColour = obj.textColour;
    this.bColour = obj.bColour;
    this.ticksColour = obj.ticksColour;
    this.subTextColour = obj.subTextColour;
    this.barValueColour = obj.barValueColour;

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
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate(i * (this.chartWidth / this.numTicks), 0);
      line(0, 0, 0, 5);
      pop();
    }

    //  tick text
    let tickValue = this.maxValue / this.numTicks;
    for (let i = 0; i <= this.numTicks; i++) {
      push();
      translate((i * this.chartWidth) / this.numTicks, 20);
      noStroke();
      textSize(this.ticksTextSize);
      rotate(this.textRotate);
      fill(this.textColour);
      text(Math.ceil(i * tickValue), -10, 0);
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
      let barWidth = map(this.data[i][this.xValue], 0, this.maxValue,0,this.chartWidth
      );//gets all the data from the xValue and pulls out each individual values and displays them.
      fill(this.barFill[i % this.barFill.length]);
      noStroke();
      rect(0, 0, barWidth, gap); // Adjust width based on xValue

      // Draw bar value
      push();
      fill(this.barValueColour);
      textFont(this.fontBold);
      textAlign(CENTER, CENTER); // Set text alignment
      textSize(this.barValueTextSize);
      text(xLabel[i], barWidth + 15, -this.chartHeight / this.data.length / 2); // Draw text
      // Translate for the next bar
      translate(0, gap + this.barHeight);
      
      // Text y AXIS
      push();

      textSize(this.textSizeText);
      rotate(this.textRotate);
      fill(this.textColour);
      text(yLabel[i], -20, -this.chartHeight / this.data.length -10);//displays the data 
      translate(0, -this.barHeight / 2);
      pop();
    }
    pop();

    // Subtext
    push();
    noStroke();
    fill(this.subTextColour);
    textFont(this.fontBold);
    textAlign(this.subHorzAlign, this.subVertAlign);
    textSize(this.textSizeSub);
    text(this.subLabel, this.textSubX, this.textSubY);
    pop();

    // Title text
    push();
    noStroke();
    fill(this.textColour);
    textFont(this.fontBold);
    textSize(this.textSizeTitle);
    textStyle(this.titleWeight);
    textAlign(this.titleHorzAlign, this.titleVertAlign);
    text(this.titleText, this.textTitleX, -this.textTitleY, this.titlePaddingX);
    pop();

    // Text for column 2
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
