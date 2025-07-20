//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

//for playlist
var songs = [
    'assets/wave - ATEEZ (에이티즈).mp3',
    'assets/answer - ATEEZ (에이티즈).mp3',
	'assets/dancing like butterfly wings - ATEEZ (에이티즈).mp3',
	'assets/cheers to youth - SEVENTEEN (세븐틴).mp3'
];
var playlist = [];
//to track the current playing song
var currentSong = 0;
var songList = null;

//for firework
var beatDetect;
var fireworks;

//for game
var beatOfGame;

//for volume 
var volumeSlider = null;
var volume = 0.2;

//for song
var songSlider = null;

//for loading the song
function preload(){
	soundFormats('mp3', 'ogg');

	for(let sound of songs)
	{
		playlist.push(loadSound(sound));
	};
}

function setup(){
	createCanvas(windowWidth, windowHeight-10);
	background(0);
	controls = new ControlsAndInput();
	volumeSlider = new VolumeSlider();

	songSlider = new SongSliders();

	//instantiate the fft object
	fourier = new p5.FFT();
	
	//for Fireworks
	frameRate(60);
	beatDetect = new BeatDetect();
	fireworks = new Fireworks();
	// angleMode(DEGREES);

	//for rhythmVis
	bpm = 90;

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new RhythmVis());
	vis.add(new Spectrum());
	vis.add(new WavePattern());
	vis.add(new Needles());
	vis.add(new RidgePlots());
	vis.add(fireworks);
}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();

	var spectrum = fourier.analyze(); //an instance of spectrum

	if(vis.selectedVisual.name === 'fireworks')
	{
		// fireworks.update();
		if(beatDetect.detectBeat(spectrum)) //if this is TRUE
		{
			console.log('Beat Detected');
			fireworks.addFirework();
		}
		fireworks.update();
		// console.log('Firework UPDATED');
	}


	//draw the controls on top.
	controls.draw();
	//draw the volume slider
	volumeSlider.draw();
	// sound.setVolume(volume.slider.value()/200);
	//draw the song slider
	songSlider.draw();
}

function mouseClicked(){
	//checks if the volume slider has been clicked
	if (mouseX > volumeSlider.x && mouseX < volumeSlider.x + volumeSlider.width && mouseY > volumeSlider.y && mouseY < volumeSlider.y + volumeSlider.height)
	{
		return; // Don't trigger playback if the volume slider is clicked
	}


	controls.mousePressed();
	// songSlider.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
