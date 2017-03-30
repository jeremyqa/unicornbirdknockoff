class Preload extends Phaser.State {

	preload() {
		/* Preload required assets */
		//this.game.load.image('myImage', 'assets/my-image.png');
		//this.game.load.audio('myAudio', 'assets/my-audio.wav');
		//this.game.load.atlas('myAtlas', 'assets/my-atlas.png', 'assets/my-atlas.json');
        this.game.load.spritesheet('unicorn', 'assets/unicorn-sprite.png', 150, 120)
	}

	create() {
		//NOTE: Change to GameTitle if required
		this.game.state.start("GameTitle");
	}

}

export default Preload;
