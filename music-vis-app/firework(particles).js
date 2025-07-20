//store firework
function Particles(x, y, color, angle, speed)
{
    var x = x;
    var y = y;
    var color = color;
    var angle = angle;

    this.speed = speed; //when (speed of particles)=0, it will update every frame
    //speed REDUCE=firework FINISH

    this.draw = function()
    {
        update();
        fill(color);
        ellipse(x, y, 10, 10);
        //change it vertex instead of ellipse
    }

    function update()
    {
        this.speed -= 0.1;
        //update x & y
        x += cos(angle)*speed; //CAH: A=cosH
        y += sin(angle)*speed; //SOH: O=sinH

        console.log('particle speed:', speed);
    }
}