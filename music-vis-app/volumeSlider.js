function VolumeSlider()
{
    this.volSlider = null;

    this.x = windowWidth - 350;
    this.y = windowHeight - 950;
    this.width = 300;
    this.height = 20;

    //slider's min, max, [value], [step]
    this.volSlider = createSlider(0, 1, volume, 0.01);
    console.log("Slider created:", this.volSlider); // Debugging statement
    //slider's x & y
    this.volSlider.position(this.x,this.y);
    //slider's width & height
    this.volSlider.size(this.width,this.height);

    this.draw = function()
    {
        var volume = this.volSlider.value();

        //for the text
        fill(255);
        textSize(20);
        text('volume', this.x - 70, this.y + 18); //string, x, y
        noFill();

        //setting volume of the assets=song
        for(i=0;i<playlist.length;i++)
		{
			playlist[i].setVolume(volume);
		}
        console.log("volume is set to: ", volume); // Debugging statement
    }
}