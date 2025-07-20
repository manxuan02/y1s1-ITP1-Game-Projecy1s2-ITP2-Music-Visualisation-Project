/*
1. draw the lines without any output
	- plot & scale its location on the canvas
	- draw lines that moves up the screen in regular intervals
		> create a 2d array of lines, add one to the array every x frames
			(requires a NEW function)
		> each frame clear screen & decrease the y coordinates of each line
			**decrease y coordinates, so it moves UP the screen
		Condition:
		> if (line y) < (plot y) then remove from array
2. add the music output
*/

function RidgePlots()
{
    this.name = "ridgeplots";

	this.output = [];
	this.speed = 0.7;

	//Plot & Scale *screen* location on the canvas
	this.startX = width/5; //left edge of plot
	this.endY = height/5; //end at the top,, cause it MOVES UP
	this.startY = height - this.endY; //start at the bottom,, cause it MOVES UP
	this.spectrumWidth = (width/5)*3; //let the width of the *screen* be 3/5 of the canvas
	this.spectrumHeight = height - this.endY*2; //height of the *screen*

	// console.log("ridge plot is running");

    this.addWave = function()
	{
		var w = fourier.waveform(); //use this to build the graphic
		//.waveform() = gives a small moment in time, showing the output from THAT period
		console.log("waveform data:",w);
		var outputWave = [];
		var smallScale = 3;
		var bigScale = 40;

		//To create the Inner array separately,, To loop the waveform
		for(i=0;i<w.length;i++)
		{
			if(i%20 == 0) //only using every 20th of 1024 waveform point
			//There's 1024elements from a "waveform". DW to have too many, so using a FEW of it only!!
			//so use mod!!
			{
				var x = map(i, 0,1024, this.startX, this.startX+this.spectrumWidth); //x-coordinates will increase regularly with diff. points along the line

				//making (SIDES of line): scale a bit
				if(i<1024*0.25 || i>1024*0.75) //0.25=1st quarter	0.75=4th quarter
				{
					var y = map(w[i], -1,1, -smallScale,smallScale);

					outputWave.push(
						{x: x, y: this.startY+y} //READ PROPERLY,, y changes accordingly to the change in waveform
					);
				}
				//making (MIDDLE of line): scale a lot
				else //wavefrom is in the 2nd&3rd quarter of the waveform
				{
					var y = map(w[i], -1,1, -bigScale,bigScale);

					outputWave.push(
						{x: x, y: this.startY+y} //READ PROPERLY,, y changes accrodingly to the change in waveform
					);
				}
			}
		}
		//Putting 'outputWave' array into 'output', so it changes accordingly
		this.output.push(outputWave);
	}

    this.draw = function()
    {
        noFill();
		stroke(255);
		strokeWeight(2);

		if(frameCount%10 == 0)
		//%: mod
		//e.g. so for every 60th frame "this" will happen,, 60mod30==0
		{
			this.addWave();
		}

		//Clear screen & Decrease the y-coordinates of each line,, so it MOVEs UP
		for(i=0;i<this.output.length;i++) //upper array
		{
			var o = this.output[i];

			beginShape();
			for(j=0;j<o.length;j++) //inner array
			{
				o[j].y -= this.speed; //y coordinates
				vertex(o[j].x, o[j].y);
			}
			endShape();
			
			//CHECK to Remove the array IF (line y) < (plot/end y)
			if(o[0].y < this.endY) //o[0].y = 1st value
			{
				this.output.splice(i,1);
				//splice() = remove the element from the array,, splice(list, value, position)
			}
		}
    }
}