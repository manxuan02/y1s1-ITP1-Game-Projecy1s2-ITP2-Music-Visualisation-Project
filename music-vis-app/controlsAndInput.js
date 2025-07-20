//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = false;
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		//--> NEED TO CREATE A [NEW var], THEN [this.playbackbutton.hitCheck] TO "CALL" this.hitCheck IN controlsAnsInput.js
		//this.hitCheck = the method used for checking the mouse click

		//checks if the playback button has been clicked
		var isClicked = this.playbackButton.hitCheck();
		if (!isClicked) {
			if (this.playbackButton.playing) {
				// Pause or stop the current song
				playlist[currentSong].pause();
				this.playbackButton.playing = false;
			} else {
				// Play the current song
				playlist[currentSong].play();
				this.playbackButton.playing = true;
			}
		}
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		console.log(keycode);
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
		}
		else if(keycode >= 65 && keycode <= 90)
		{
			if(!this.playbackButton.playing)
			{
				//to convert keycode >> letter
				var keyToLetter = String.fromCharCode(keycode).toLowerCase();
				//letters to toggle song
				var letters = "abcdefghijklmnopqrstuvwyxz";
				//uses 'keyToLetter' to find the song's-index in 'letters'
				var songIndex = letters.indexOf(keyToLetter);
				if(songIndex >= 0 && songIndex < playlist.length)
				{
					vis.chooseSong(songIndex, false);
				};
			}
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		//playback button 
		this.playbackButton.draw();
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){

			text("Select a visualisation:", 100, 70);
			this.menu();
		}	
		pop();
	};

	//function to toggle visualisation
	this.menu = function(){
		//draw out menu items for each visualisation
		for(i=0;i<vis.visuals.length;i++)
		{
			text((i+1)+": "+vis.visuals[i].name, 100, 85 + (i+1) * 35); //name of visualisation, x-axis, y-axis
			//"i+1"-> to change according to the "vis" array
		}

		//to toggle song choice
		var letters = "abcdefghijklmnopqrstuvwyxz"; //letters to toggle song
		for(i=0;i<playlist.length;i++)
		{
			text(letters[i]+": "+songs[i].split('/').pop(), 100, 100 + ((vis.visuals.length + i + 1) * 35)); //name of song, x-axis, y-axis
		}
	};
}