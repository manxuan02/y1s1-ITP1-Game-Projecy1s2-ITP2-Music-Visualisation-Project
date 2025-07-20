function SongSlider()
{
    //Progress of the song
    this.audioProg = 0;
    //Song's current time
    this.audioCur = 0;
    //Song's full length in seconds
    this.audioLen = sound.duration();

    this.isDragging = false;

    var w = width / 2;
    var h = 40;
    var x = width / 4;
    var y = height / 4 * 3; 
    var handleX;
    var handleY;

    //for slider
    this.slider = createSlider(0,100,0);
    this.slider.position(width/4, height/4*3 + 20);

    this.draw = function()
    {
        //when the song is playing
        if(sound.isPlaying())
        {
            //to update the 
            this.updateProg(sound.currentTime());
            this.setCurrentTime(sound.currentTime());

            //for slider
            // this.slider.value(progress);
        }
        
        if(this.slider.value() !== (sound.currentTime() / this.audioLen) * 100)
        {
            this.handleInput(this.slider.value());
        }

        this.drawSongSlider();

    }
        // var audio = this.drawSongSlider().value();
        // console.log("audio is set to: ",audio); // Debugging statement

    this.updateProg = function(time)
    {
        this.audioCur = (time / this.audioLen) * 100;
    }

    //to change the playback position
    this.handleInput = function(percentage)
    {
        //when the song has Started Playing && Is Playing
        if(this.audioLen>0)
        {
            //jumps to the New Time, updating the playback position
            sound.jump(this.audioLen * (percentage/100));

            //update progress of the song W the New Time
            this.updateProg(this.audioLen * (percentage/100));
        }
    }

    //updates the current time
    this.setCurrentTime = function(time)
    {
        this.audioCur = time;
    }

    //updates the total duration
    this.setDuration = function(time)
    {
        this.audioLen = time;
    }

    //to fast forward the song
    this.fastforward = () => {
        if(sound.isPlaying())
        {
            var nextPlayTime = sound.currentTime() + 5;

            if(nextPlayTime < this.audioLen)
            {
                sound.jump(nextPlayTime);
                this.setCurrentTime(nextPlayTime);
            }
        }
    }

    //to play back the song
    this.playBack = () => {
        if(sound.isPlaying())
        {
            var nextPlayTime = sound.currentTime() - 5;

            sound.jump(nextTime > 0 ? nextTime : 0);
        }
    }

    //to draw the seek bar
    this.drawSongSlider = function()
    {
        // //drawing the seek bar
        // fill(255,0,0);
        // rect(x,y,w,h);

        // //drawing the progress of the song >> the alrdy over parts
        // var progressWidth = (this.audioCur / 100) * w;
        // fill(0,255,0);
        // rect(x,y,progressWidth,h);

        // handleX = x + progressWidth;
        // handleY = y + h / 2;

        // //drawing the Current progress of the song >> the CURRENT position
        // fill(0,0,255);
        // ellipse(handleX,handleY,15,15);

        // // console.log("ellipse is drawing: ", handleX);
    }

    // //checks if the mouse is near the handle of the seekbar
    // this.mousePressed = function()
    // {
    //     if(dist(mouseX, mouseY, handleX, handleY) < 50)
    //     {
    //         this.isDragging = true;
    //     }

    //     console.log("songslider mousePressed: ", this.isDragging);
    // }

    // //While dragging, 
    // this.mouseDragged = function()
    // {
    //     if(this.isDragging)
    //     {
    //         //calculates the percentage of the song's progress, based on the current position of the mouse relative to the seek bar
    //         //mouseX - x: the distance between Current position & seekBar
    //         //constraint: ensures that the calculated percentage is WITHIN 0 & 100
    //         var percentage = constrain((mouseX - x)||(mouseY - y) / w * 100, 0, 100);
            
    //         //to update the song's playback position to the audio
    //         this.handleInput(percentage);

    //         //to update handleX position based on the New percentage
    //         handleX = x + (percentage / 100) * w;

    //         this.drawSongSlider();

    //         console.log("songslider mouseDragged: ",percentage);
    //     }
    // }

    // this.mouseReleased = function()
    // {
    //     this.isDragging = false;

    //     console.log("songslider mouseReleased: ", this.isDragging);
    // }
}

function secToMin(seconds)
{
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);

    return '${minutes}:${secs < 10 ? "0": " "}${sec}';
}