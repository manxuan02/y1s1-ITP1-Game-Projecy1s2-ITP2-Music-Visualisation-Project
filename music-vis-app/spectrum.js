function Spectrum(){
	this.name = "spectrum";

	this.draw = function(){
		push();
		var spectrum = fourier.analyze();
		noStroke();
		
		//fill(0,255,0)
		for (var i = 0;i<spectrum.length;i++){
			//var x = map(i, 0, spectrum.length, 0, width);
		    //var h = -height + map(spectrum[i], 0, 255, height, 0); //the amplitude ranging 0-255 
		    //rect(x, height, width / spectrum.length, h );

			//change the spectrum to show horizontally(-) NOT vertically(|)
			var y = map(i,0,spectrum.length,0,height);
			var w = map(spectrum[i],0,255,0,width); //the amplitude ranging 0-255
		    //rect(0,y,w,height/spectrum.length);
			//width_of_rect != width
			//width_of_rect = 0,, cause u want to start from LEFTTTTT not from RIGHTT stooooooopiddd

			//use map() to gradually change the colour
			var g = map(spectrum[i],0,255,255,0);
			fill(spectrum[i],g,0);
			rect(0,y,w,height/spectrum.length);
  		}
		pop();
	};
}
