function RhythmVis() {
    this.name = 'rhythmVis';

    // var noteX = 100;
    // var noteY = 50;
    // var color = color;
    var beatWidth = 100;
    var beatHeight = 90;
    var dropline = 900;

    // Lane 1(most left)
    var lane1 = width/3;
    // Lane 2
    var lane2 = width/2;
    // Lane 3
    var lane3 = width*2/3;
    // Lane 4
    var lane4 = width*5/6;
    //x-coordinate of note
    this.noteX = [lane1, lane2, lane3, lane4];

    //note's moving speed
    var speed = 2;

    //empty array to store active notes
    var notes = [];

    //to get sum of energy
    var bassSum = 0;
    var midSum = 0;
    var trebleSum = 0;
    var lowMidSum = 0;
    var highMidSum = 0;
    var frameCounter = 0;
    
    this.draw = function()
    {
        if(playlist[currentSong].isPlaying())
        {
            this.detectBeat();
        }
        update();
        this.drawNote();
        
        // console.log("note dropping: ", notes);
    }

    this.drawNote = function()
    {
        //for note
        for(i=0; i<notes.length; i++)
        {
            //to change the colors accordingly with the empty array 'notes'
            fill(notes[i].color);
            noStroke();

            //to change the lanes accordingly with the empty array 'notes'
            ellipse(notes[i].x,notes[i].y,beatWidth,beatHeight);
        }
        //for dropline
        stroke(0,0,255)
        strokeWeight(6)
        line(0,dropline,width,dropline);
        noStroke();
    }

    this.detectBeat = function()
    {
        var lastNote = 0;
        //distance between notes, 500ms
        var notesDistance = 500; 
        var currentTime = millis();

        if(currentTime - lastNote > notesDistance)
        {
            var bass = fourier.getEnergy("bass");
            var mid = fourier.getEnergy("mid");
            var treble = fourier.getEnergy("treble");
            var lowMid = fourier.getEnergy("lowMid");
            var highMid = fourier.getEnergy("highMid");

            //to produce notes at random lane
            var conditions = [
                //For bass >> red
                {check: bass>100, color: window.color(255,0,0)},
                //For mid >> blue
                {check: mid>80, color: window.color(0,0,255)},
                //For lowMid >> green
                {check: lowMid>75 && treble>10, color: window.color(0,255,0)},
                //For highMid >> yellow
                {check: highMid>30 && treble>10, color: window.color(255,255,0)}
            ]

            for(i=0;i<conditions.length;i++)
            {
                if(conditions[i].check)
                {
                    //random lanes
                    var lane = round(random(0,3));
                    var laneX = this.noteX[lane];

                    //Add new note to the empty 'notes' array
                    notes.push({x: laneX, y: 50, color: conditions[i].color});
                    // console.log('Note created in lane:', laneX);

                    //to update 'lastnote' after a new note is created
                    lastNote = currentTime;

                    //to exit the loop after Adding 1 note
                    break;
                }
            }

            //getting the average energies per framerate

            //sum of energy values
            bassSum += bass;
            midSum += mid;
            trebleSum += treble;
            lowMidSum += lowMid;
            highMidSum += highMid;

            frameCounter++;


            //calculates average Per Framerate
            if(frameCounter <= 60)
            {
                var avgBass = bassSum / frameCounter;
                var avgMid = midSum / frameCounter;
                var avgTreble = trebleSum / frameCounter;
                var avgLowMid = lowMidSum / frameCounter;
                var avgHighMid = highMidSum / frameCounter;
                
                console.log(`Avg Bass: ${avgBass}, Avg Mid: ${avgMid}, Avg Treble: ${avgTreble}, Avg LowMid: ${avgLowMid}, Avg HighMid: ${avgHighMid}`);


                //to update averages after a new note is created 
                bassSum = 0;
                midSum = 0;
                trebleSum = 0;
                lowMidSum = 0;
                highMidSum = 0;

                console.log("framecounter: ", frameCounter);

            }

            //using average values to create the notes
            // if(bass > 80)
            // {
            //     //random lanes
            //     var lane = round(random(0,3));
            //     var laneX = this.noteX[lane];

            //     //Add new note to the empty 'notes' array
            //     notes.push({x: laneX, y: 50, color: conditions[i].color});
            // }
        }

        // console.log(`Bass: ${bass}, Mid: ${mid}, Treble: ${treble}, LowMid: ${lowMid}, HighMid: ${highMid}`);
    }

    //to change the 'height' of the notes = let it move
    function update()
    {
        for(i=0; i<notes.length; i++)
        {
            //update y
            notes[i].y += speed;

            //note stops when it reaches dropline
            if(notes[i].y >= dropline)
            {
                notes[i].y = dropline;
            }
        }
    }

}
