function SongSliders()
{
    this.audioSlider = null;

    this.x = windowWidth - 350;
    this.y = windowHeight - 900;
    this.width = 300;
    this.height = 20;

    //create audio slider
    this.audioSlider = createSlider(0, 100, 0, 1);
    //slider's x & y
    this.audioSlider.position(this.x, this.y); 
    //slider's width & height
    this.audioSlider.size(this.width, this.height);

    //slider is updated based on the song's current position
    this.updateSlider = function()
    {
        if (playlist[currentSong].isPlaying())
        {
            var position = map(playlist[currentSong].currentTime(), 0, playlist[currentSong].duration(), 0, 100);
            this.audioSlider.value(position);
        }
    };

    //change song position when the slider is manually adjusted
    this.audioSlider.input(() => {
        var newPosition = map(this.audioSlider.value(), 0, 100, 0, playlist[currentSong].duration());
        playlist[currentSong].jump(newPosition);
    });

    // Draw the slider
    this.draw = function()
    {
        //Continuously update the slider
        this.updateSlider();

        //for the text
        fill(255);
        textSize(20);
        text('song', this.x - 70, this.y + 18); //string, x, y
        noFill();
    };
}
