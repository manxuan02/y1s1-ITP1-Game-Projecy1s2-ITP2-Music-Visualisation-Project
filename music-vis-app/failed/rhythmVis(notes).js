/*
FOR THE DETECTION OF BEAT IN THE SONG
1. have a function to detect beat
    - there should be a buffer of 1sec.
    so the code will detect if there is a beat in that 1sec
    - can let the 'song of 1sec' be pushed into an empty-array(bufferPoint)
    - then push the 'captured 1sec part' INTO the 'empty-array(bufferPoint)'
    - framerate(60) - helps to "divide" the song into 60 times a second ,, already have
*/

function drawGameNotes(x, y, color)
{
    var x = x;
    var y = y;
    var color = color;
    var beatWidth = 100;
    var beatHeight = 90;

    this.speed = speed;
    
    this.draw = function()
    {
        update();
        fill(color);
        ellipse(x,y,beatWidth,beatHeight);
    }

    //to change the 'height' of the notes = let it move
    function update()
    {
        this.speed -= 0.1;
        //update x & y
        y += 5*this.speed;
    }
}