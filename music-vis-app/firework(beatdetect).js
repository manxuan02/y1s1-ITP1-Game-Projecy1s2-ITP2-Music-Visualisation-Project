//Checks EACH FRAME, whether it is a beat or not
function BeatDetect()
{
    //empty array that stores the average volume of a particular analysis
    sampleBuffer = [];

    this.detectBeat = function(spectrum)
    {
        var sum = 0; //sum for a particular instance of the spectrum
        var isBeat = false;

        //Loop through the spectrum
        for(i=0;i<spectrum.length;i++)
        {
            sum += spectrum[i]* spectrum[i]; //square the value to have a larger difference between each instance  

            //for THIS INSTANCE, it adds up ALL the amplitudes of different frequencies in the spectrum
        }

        //Want to have a buffer of a period of time
        //Let (period of time) be about 1sec
        //so push it onto the array
        //So when the array reaches a certain size for 1sec, then we can detect if has the beat or not 
        if(sampleBuffer.length==60) //60 frames 1sec
        {
            //Detect a beat
            var sampleSum = 0;

            //Work out the average of the total added values
            //Adds up all the values in the buffer together
            for(i=0;i<sampleBuffer.length;i++)
            {
                sampleSum += sampleBuffer[i];
            }
            //Average
            var sampleAverage = sampleSum/sampleBuffer.length;

            var c = calConstant(sampleAverage);

            //Found out the DIFFERENCE we are from the average
            //because anything OVER everage, might be detected as a beat
            if(sum > sampleAverage*c)
            {
                //When is a beat is seen
                isBeat = true;

                console.log('Beat detected: ', sum, ' > ', sampleAverage * c);
            }
            sampleBuffer.splice(0,1); //remove from index 0, 1 element
            sampleBuffer.push(sum); //add the 'sum of spectrum' into sampleBuffer
        }
        else
        {
            sampleBuffer.push(sum);
        }

        //return isBeat = false, so to Detect a Beat again!!
        return isBeat;
    }

    function calConstant(sampleAverage)
    {
        //Constant = ACCEPTABLE RANGE of spectrum average that can over the beat
        // var c = 1.1; 
        //To work out a Better C, start by calculating the variance
        //smaller variance = bigger difference
        var varianceSum = 0;
        for(i=0;i<sampleBuffer.length;i++)
        {
            //variance across sample
            varianceSum += sampleBuffer[i] - sampleAverage; //'sum' of the 'Difference' FROM the 'average' for 'each values'
            //this.sampleBuffer[i] = each values
            //sampleAverage = average
            //varianceSum += = sum
        }
        //Work out variance
        var variance = varianceSum/sampleBuffer.length;

        //R/S between 'variance' & 'c'
        //w reference to y=mx+b,, y=c x=variance
        //assume uw variance=25 then c=1.15,, when variance=200 then c(bring down by 1)=0.975
        var m = -0.15 / (25-200); 
        var b = 1 + (m*200);
        return (m*variance) + b;
    }
}