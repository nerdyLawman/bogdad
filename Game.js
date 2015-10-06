
BasicGame.Game = function (game) {

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

	this.plays = 0;
	this.disappointment = 0;
	this.approval = 0;
	this.score = null;
	
	this.background = null;
	this.logo = null;
	this.bogDad = null;
	
	this.muck = null;
	this.gurble = null;
	this.groan = null;
	this.ambient = null;
	
	this.bigX = null;
	this.talkBox = null;
	this.optionOne = null;
	this.optionTwo = null;
	this.result = null;
	this.reset = null;

};

WebFontConfig = {
    google: {
      families: ['VT323']
    }

};

function goFull() {

    if (this.scale.isFullScreen)
    {
        this.scale.stopFullScreen();
    }
    else
    {
        this.scale.startFullScreen(false);
    }

};

function ambientFade() {
	this.ambient.play('', 0, 0, true);
	this.ambient.fadeTo(4400, 0.3);
};

function setFont(text, size, color) {
	text.font = 'VT323';
	text.fontSize = size;
	if (color == 'white') { text.fill = '#ffffff'; }
	else if (color == 'green') { text.fill = '#92e90a'; }
	else if (color == 'yellow') { text.fill = '#f1f40b'; }
	else { text.fill = '#92e90a'; };
	text.align = 'left';
	//text.stroke = '#0b866d';
	//text.strokeThickness = 4;
	text.setShadow(2, 3, 'rgba(11,134,109,0.9)', 0);
};

function overText(text) {
	text.fill = '#f1f40b';
};

function outText(text) {
	text.fill = '#ffffff';
};

function setClickable(text) {
	text.inputEnabled = true;
    text.input.useHandCursor = true;
    text.events.onInputOver.add(overText, this);
    text.events.onInputOut.add(outText, this);
};

function assignOptions() {
	var optionsBankOne = [
		"kill the neighbor's yappy dog...",
		"clean the attic...",
		"get the mountain bike I've been wanting...",
		"dig up the backyard...",
		"tell Mom he's sorry...",
		"stay up late playing videogames...",
		"study for the math test...",
		"bring him some pizza...",
	];
	var optionsBankTwo = [
		"brush my teeth...",
		"shampoo his smelly hair...",
		"get him a beer from the fridge...",
		"watch out for ill omens...",
		"change the oil on the Buick...",
		"bring him some pasta...",
		"read some of his poetry...",
		"bring him another dead raccoon...",
	]
	var returnOne = optionsBankOne[Math.floor(Math.random() * optionsBankOne.length)];
	var returnTwo = optionsBankTwo[Math.floor(Math.random() * optionsBankTwo.length)];
	var returnOptions = [returnOne, returnTwo];
	return (returnOptions);
};

function selectText() {
	this.talkBox.destroy();
	this.optionOne.destroy();
	this.optionTwo.destroy();
	
	var resultText = '';
	var correct = this.rnd.integerInRange(1, 2);
	var choice = this.rnd.integerInRange(1, 2);
	if (choice == correct) {
		this.approval += 1;
		resultText = "That is precisely what BOGDAD\nwanted you to do!\nBOGDAD is pleased.";
	}
	else {
		this.disappointment += 1;
		resultText = "You have misunderstood BOGDAD\nand done a horrible thing.\nYou have disappointed BOGDAD.";
	};
	
	this.result = this.add.text(600, 100, resultText);
	setFont(this.result, 26, 'green');
	
	this.reset = this.add.text(600, 260, 'ASK BOGDAD SOMETHING ELSE?');
	setFont(this.reset, 26, 'white');
	setClickable(this.reset);
	this.reset.events.onInputDown.add(resetBogDad, this);
	
	this.score.setText("approval: " + this.approval + "\ndisappointment: " + this.disappointment);
	
	this.time.events.add(Phaser.Timer.SECOND * 1, byeBogDad, this);
};

function bogDadEmerges() {
	// FIRST PLAY
	if (this.plays <= 0) {
		this.logo.destroy();
		
		this.score = this.add.text(20, 20, "approval: " + this.approval + "\ndisappointment: " + this.disappointment);
		setFont(this.score, 26, 'green');
	}
	this.plays += 1;
	
	var popUpSpots = [[306, 460, -2], [174, 656, -6], [684, 532, 3], [798, 431, 1], [892, 595, 4], [729, 800, 9]];
	var popUpLocation = popUpSpots[Math.floor(Math.random() * popUpSpots.length)]
	if (popUpLocation[2] > 0) {
		this.bogDad.scale.setTo(popUpLocation[2], popUpLocation[2]);
	}
	else {
		this.bogDad.scale.setTo(popUpLocation[2], popUpLocation[2] * -1);
	};
	this.bogDad.x = popUpLocation[0];
	this.bogDad.y = popUpLocation[1]
	this.bogDad.visible = true;
	this.bogDad.animations.play('emerge', 7, false);
	this.bogDad.events.onAnimationComplete.addOnce(bogDadIdles, this);
	
	this.muck.volume = this.bogDad.scale.x * 0.1;
	this.gurble.volume = this.bogDad.scale.x * 0.1;
	this.muck.play();
	this.gurble.play();
};

function bogDadIdles() {
	this.bogDad.animations.play('warble', 6, true);
	this.time.events.add(Phaser.Timer.SECOND * 3, bogDadSez, this);
};

function bogDadSez() {
	this.speech = this.add.sprite(this.bogDad.x - 10 * this.bogDad.scale.x, this.bogDad.y - this.bogDad.height / 2 - this.bogDad.height/ 4 , 'speech');
	this.speech.anchor.setTo(1,1);
	this.speech.scale.setTo(this.bogDad.scale.x, this.bogDad.scale.y);
	
	this.groan.volume = this.bogDad.scale.x * 0.1;
	this.groan.play();
	
	this.optionsText = assignOptions();
	this.time.events.add(Phaser.Timer.SECOND * 3, presentOptions, this);
};

function presentOptions() {
	this.speech.destroy();
	
	this.talkBox = this.add.text(560, 40, "It sounded like BOGDAD wants me to...")
	setFont(this.talkBox, 26, 'green');
    
    this.optionOne = this.add.text(560, 80, this.optionsText[0])
    setFont(this.optionOne, 26, 'white');
    setClickable(this.optionOne);
    this.optionOne.events.onInputDown.add(selectText, this);
    
    this.optionTwo = this.add.text(560, 120, this.optionsText[1])
    setFont(this.optionTwo, 26, 'white');
    setClickable(this.optionTwo);
    this.optionTwo.events.onInputDown.add(selectText, this);
};

function byeBogDad() {
	this.bogDad.animations.play('leave', 8, false);
	this.muck.play();
	this.bogDad.events.onAnimationComplete.addOnce(hideBogDad, this);
	
};

function hideBogDad() {
	this.bogDad.visible = false;
};

function resetBogDad() {
	this.playAgain();
};

BasicGame.Game.prototype = {

    create: function () {
	    
		this.background = this.add.sprite(0, 0, 'background');
		
		this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.bigX = this.add.text(10, 768, "x");
		this.bigX.anchor.setTo(0, 1);
		setFont(this.bigX, 26, 'white');
		setClickable(this.bigX);
		this.bigX.events.onInputDown.add(goFull, this);
		
		this.logo = this.add.sprite(this.world.width/2, 300, 'logo');
		this.logo.anchor.setTo(0.5, 0.5);
		var logoTween = this.add.tween(this.logo).to({alpha: 0}, 1400, Phaser.Easing.Linear.None, true);
		
		this.time.events.add(Phaser.Timer.SECOND * 4, bogDadEmerges, this);
		
		// CREATE BOGDAD BUT DON'T DO ANYTHING WITH HIM . . . YET
		this.bogDad = this.add.sprite(570, 400, 'bogdad');
		this.bogDad.anchor.setTo(0.5, 1);
		this.bogDad.visible = false;
		// SETUP BOGDAD ANIMATIONS
		this.bogDad.animations.add('emerge', [0, 1, 2, 3, 4, 5], 6, true);
		this.bogDad.animations.add('warble', [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 6, true);
		this.bogDad.animations.add('leave', [5, 4, 3, 2, 1, 0], 8, true);
			
		// SETUP AUDIO
		this.muck = this.add.audio('muck');
		this.groan = this.add.audio('groan');
		this.gurble = this.add.audio('gurble');
		this.ambient = this.add.audio('ambient');
		this.ambient.onDecoded.add(ambientFade, this);
		
    },

    update: function () {
	    
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
    },
    
    render: function() {
	    //this.game.debug.inputInfo(32, 32);
    },
    
    playAgain: function () {
	    this.result.destroy();
		this.reset.destroy();
	    this.time.events.add(Phaser.Timer.SECOND * 3, bogDadEmerges, this);
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.bogDad.destroy();
        this.logo.destroy();
        this.background.destroy();
        this.result.destroy();
		this.reset.destroy();
		this.score.destroy();

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
