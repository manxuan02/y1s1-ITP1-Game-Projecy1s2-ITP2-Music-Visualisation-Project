/*
1. Change the x of beats to change accordingly as it drops
    - can let 'this.x = beatsDetected' 

2. Set the timing for beats to appear
    - create a function for timing of the beats to appear
    - create a function for GETTING the beats

3. When 'mouseClick' on the beat, the beat dissapears
    - create a function for 'mouseClick'
    - can use event-listener to check for mouseClick then the beat dissapears

4. ensure that the y-axis = the lanes, are FIXED
5. need to have note interval
6. need to have hitWindow
- can use 'currentTime()' to = notesHitting the hitWindow
7. need to have speed of the notes falling
*/

function RhythmVis()
{
    this.name = 'rhythmVis';

    this.y = 100;
    this.speed = 5;
    this.pressed = false;
    this.notes = [];

    this.gameStartTime = millis();
    this.previousNote = 0;

    this.lanes = 
    {
        // Lane 1(most left)
        x1: width/3,
        // Lane 2
        x2: width/2,
        // Lane 3
        x3: width*2/3,
        // Lane 4
        x4: width*5/6
    }

    console.log("rhythmVis");

    this.draw = function()
    {
        //calling GameBeat() to generate notes
        GameBeat();

        for(var note of this.notes)
        {
            drawGameNotes(note.x, note.y, note.color);

            console.log("is drawing");
        }

        // To update note's position
        this.update();
    }

    this.update = function()
    {
        for(i=0;i<this.notes.length;i++)
        {
            // To move the notes DOWN the screen
            this.notes[i].y += this.speed;
        }

        // Removes notes that has gone off screen
        this.notes = this.notes.filter(note => note.y<height);
        /* 
        filter() >> is a callback function, and is applied to EACH element in the array
        >> it 'checks' for the y of each element, if the note has gone off screen, removing it, filtering the elements accrodingly.
        */

        console.log("updating rhythmVis");
    }
}

function GameBeat()
{
    // var gameStartTime = millis();
    var noteSpeed = (height - 100);
    //empty array to store the beats
    // bufferPoint = [];

    /*
    millis() - tracks how long a song has been running for in milliseconds

    millis()-gameStartTime = (amount of time passed SINCE game started)
        - helps synchronize the noteGeneration & the song

    millis()-gameStartTime-noteSpeed = (amount of time passed SINCE game started, ACCOUNTING FOR timetaken for the note to travel from top>bottom)
        - to ensure that notes are generated in advance, so it reaches the bottom at the right time
    */
    
    //to ensure notes are generated in advance, so it reaches the bottom at the right time
    var currentTime = millis() - this.gameStartTime - noteSpeed;

    //the last time a note was generated 
    // var previousNote = 0;
    
    //to produce the next note & ensure that the difference between the notes are NOT VERY BIG
    if(currentTime - this.previousNote >= 200)
    {
        //get the different frequency of the song
        var bass = spectrum.getEnergy("bass");
        var mid = spectrum.getEnergy("mid");
        var treble = spectrum.getEnergy("treble");
        var lowMid = spectrum.getEnergy("lowMid");
        var highMid = spectrum.getEnergy("highMid");

        //creating a new note
        var conditions = [
            //For bass >> red
            {check: bass>230, color: color(255,0,0)},
            //For mid >> blue
            {check: mid>225, color: color(0,0,255)},
            //For lowMid >> green
            {check: lowMid>100 && treble>110, color: color(0,255,0)},
            //For highMid >> yellow
            {check: highMid>120 && treble>100, color: color(255,255,0)}
        ]
        // , outcome: ()=>this.notes.push(new beat("yellow"))
        for(i=0;i<conditions.length;i++)
        {
            if(conditions[i].check)
            {
                var lane = round(random(0,3));
                var laneX = this.lanes[lane];

                // drawGameNotes(this.lanes,this.y,conditions[i].color);
                this.notes.push({x:laneX, y:this.y, color:conditions[i].color, speed:this.speed});
            }
        }

        this.previousNote = currentTime;
    }
}