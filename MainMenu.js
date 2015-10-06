
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.background = null;
	this.playButton = null;
	this.logo = null;
	this.swamp = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
		
		this.background = this.add.sprite(0, 0, 'background');
		this.logo = this.add.sprite(this.world.width/2, 300, 'logo');
		this.logo.anchor.setTo(0.5, 0.5);
		this.playButton = this.add.button(this.world.width/2, 400, 'playButton', this.startGame, this, 1, 0);
		this.playButton.anchor.setTo(0.5, 0.5);
		this.playButton.input.useHandCursor = true;
		
		this.swamp = this.add.audio('swamp');
		//this.swamp.play();
		
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		this.state.start('Game');

	}

};
