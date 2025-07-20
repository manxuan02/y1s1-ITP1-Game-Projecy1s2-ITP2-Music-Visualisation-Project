//container function for the visualisations
function Visualisations(){
	//array to store visualisations
	this.visuals = [];
	//currently selected vis. set to null until vis loaded in
	this.selectedVisual = null;

	//add a new visualisation to the array
	//@param vis: a visualisation object
	this.add = function(vis){
		this.visuals.push(vis);
		//if selectedVisual is null set the new visual as the 
		//current visualiation
		if(this.selectedVisual == null){
			this.selectVisual(vis.name);
		}
	};

	//select a visualisation using it name property
	//@param visName: name property of the visualisation
	this.selectVisual = function(visName){
		for(var i = 0; i < this.visuals.length; i++){
			if(visName == this.visuals[i].name){
				this.selectedVisual = this.visuals[i];
			}
		}
	};

	//select song
	this.chooseSong = function(songIndex)
	{
		if(playlist[currentSong].isPlaying())
		{
			playlist[currentSong].stop();
		}
		//to update the current song name
		currentSong = songIndex;
		//to restart the song, if song is changed
		playlist[currentSong].jump(0);

		this.playbackButton = new PlaybackButton();

		//to update the playback button's state
		// if(playSong==true)
		// {
		// 	playlist[currentSong].play();
		// 	this.playbackButton.playing = true;
		// }
		// else
		// {
		// 	this.playbackButton.playing = false;
		// }
		this.playbackButton.playing = false;

		console.log("song selected: ", songs[currentSong]);
	};
}
