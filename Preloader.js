
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(this.world.width/2, this.world.height/2, 'loadingBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('background', 'assets/backgrounds/bogBg.png');
		this.load.image('logo', 'assets/etc/bogdad_logo.png');
		this.load.spritesheet('playButton', 'assets/etc/startButton.png', 75, 36);
		this.load.spritesheet('bogdad', 'assets/sprites/bogdad.png', 34, 34);
		this.load.image('speech', 'assets/sprites/slurredSpeech.png');
		
		// SOUND
		this.load.audio('swamp', 'assets/sound/ambientSwamp.mp3');
		this.load.audio('groan', 'assets/sound/groan.mp3');
		this.load.audio('gurble', 'assets/sound/gurble.mp3');
		this.load.audio('muck', 'assets/sound/muck.mp3');
		this.load.audio('ambient', 'assets/sound/atmosphere1.mp3');
		
		// FONTS
		this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		this.state.start('MainMenu');
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('swamp') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
