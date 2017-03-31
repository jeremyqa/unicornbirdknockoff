class Preload extends Phaser.State {

	preload() {
		/* Preload required assets */
		//this.game.load.image('myImage', 'assets/my-image.png');
		//this.game.load.audio('myAudio', 'assets/my-audio.wav');
		//this.game.load.atlas('myAtlas', 'assets/my-atlas.png', 'assets/my-atlas.json');
        this.game.load.spritesheet('unicorn', 'assets/unicorn-sprite.png', 150, 120);
        this.game.load.image('panda', 'assets/austerityPanda.jpg');
        this.game.load.spritesheet('coin', 'assets/01coin.png', 120, 120)
	}

	create() {
		//NOTE: Change to GameTitle if required
		this.game.state.start("GameTitle");
	}

}

export default Preload;
