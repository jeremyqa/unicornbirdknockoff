class Preload extends Phaser.State {

	preload() {
        this.game.load.spritesheet('unicorn', 'assets/unicorn-sprite.png', 150, 120);
        this.game.load.image('panda', 'assets/austerityPanda.jpg');
        this.game.load.spritesheet('coin', 'assets/01coin.png', 120, 120);
        this.game.load.spritesheet('ogre', 'assets/ogre-attack.png', 26, 28);
        this.game.load.image('background', 'assets/debug-grid-1920x1920.png');
        this.game.load.image('grass', 'assets/grass_128x128.png');
	}

	create() {
		//NOTE: Change to GameTitle if required
		this.game.state.start("GameTitle");
	}

}

export default Preload;
