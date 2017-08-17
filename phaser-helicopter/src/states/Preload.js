class Preload extends Phaser.State {

	preload() {
        this.game.load.spritesheet('unicorn', 'assets/unicorn-sprite.png', 150, 120);
        this.game.load.image('panda', 'assets/austerityPanda.jpg');
        this.game.load.image('platform', 'assets/platform.png');
        this.game.load.spritesheet('coin', 'assets/01coin.png', 120, 120);
        this.game.load.image('background', 'assets/debug-grid-1920x1920.png');
	}

	create() {
		//NOTE: Change to GameTitle if required
		this.game.state.start("GameTitle");
	}

}

export default Preload;
