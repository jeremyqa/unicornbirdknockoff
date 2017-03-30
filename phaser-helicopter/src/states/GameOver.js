class GameOver extends Phaser.State {

	create() {
        console.log("game over, man");
        this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'unicorn');
        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, `YOU'RE OUT OF MONEY, BRO`, {
            font: "72px Arial",
            fill: "#ABCDEF",
            align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);
	}

	restartGame() {
		this.game.state.start("Main");
	}

    update() {
        this.sprite.angle += 1;
    }

}

export default GameOver;