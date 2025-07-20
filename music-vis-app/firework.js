function Fireworks()
{
    this.name = "fireworks";

    // angleMode(DEGREES);

    var fireworksArray = []; //fireworks will be INSIDE the array

    //adding firework
    this.addFirework = function()
    {
        //changes color of each firework
        var ran_color = color(random(0,255), random(0,255), random(0,255));
        //changes x of each firework
        var ran_x = random(width*0.2, width*0.8);
        //changes y of each firework
        var ran_y = random(height*0.2, height*0.8);

        //add the change to EACH firework
        fireworksArray.push(new Firework(ran_color, ran_x, ran_y));

        console.log('firework added:', fireworksArray);
    }

    //update fireworksArray
    this.update = function()
    {
        //need to go from BACK to FRONT
        //because 'splice' deletes the element, then the elements behind will move forward >> making the LAST 'container' to be EMPTYYY
        //so START from the BACK
        for(var i=fireworksArray.length-1;i>=0;i--)
        {
            //draws INDIV firework
            fireworksArray[i].draw();
            //checks if fireworks[i] depleted
            print(fireworksArray[i]);
            if(fireworksArray[i].depleted == true)
            {
                //depleted = REMOVE from the list
                fireworksArray.splice(i, 1);
                //to adjust the loop index to account for the removed element
                
                console.log('firework depleted n removed');
            }
        }
    }

    //TO HAVE A RED ON THE SCREEN WHEN IT DETECTS A BEAT
    this.draw = function()
    {
        // this.update();
    }
}

//Location & color of EACH INDIV firework
function Firework(color, x, y) //fills 'Fireworks'
{
    this.color = color;
    this.x = x;
    this.y = y;

    //List of particles
    var particles = [];
    //when firework disappear depleted=true
    this.depleted = false; //public contructor, so use 'this.'

    //angle/position of each firework
    for(i=0;i<360;i+=18)
    //360^o = in a circular direction
    //18x20=360 >> produce 20 particles W 18^o difference
    {
        //pushing "Particles" function TO 'particle'
        particles.push(new Particles(this.x, this.y, this.color, i, 10));
    }

    //drawing of each firework, when it appears/disappears
    this.draw = function()
    {
        //iterate over the particles
        for(i=0;i<particles.length;i++)
        {
            particles[i].draw(); //in particles(), it calls update(), updating the location of firework on screen
        }
        //check speed of particle
        //no speed = depleted(TRUE)     got speed = depleted(FALSE)
        if(particles[0].speed <= 0) //[0] >> because it can be ANY particle, so just take the 1st one
        //when it is >=0, 'console.log' works
        {
            this.depleted = true;
            console.log('firework depleted');
        }
    }
}