var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    init: function () {

        // State Declarations
        this.state.add('Preloader', BasicGame.Preloader);
		this.state.add('MainMenu', BasicGame.MainMenu);
		this.state.add('Game', BasicGame.Game);
        
        // Game Varaibles
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            // desktop specific settings
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            // mobile settings.
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }

    },

    preload: function () {

        //  Here we load the assets required for our preloader
        this.load.image('preloaderBackground', 'assets/backgrounds/bogBg.png');
        this.load.image('loadingBar', 'assets/etc/loading_bar.png');

    },

    create: function () {
	    
        this.state.start('Preloader');

    }

};
