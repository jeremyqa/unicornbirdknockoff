class GameTitle extends Phaser.State {

	create() {
        this.game.stage.backgroundColor = '#000000';
        this.sprite = this.game.add.sprite(200, this.game.world.centerY, 'unicorn');
        this.sprite.animations.add('walk', [0,1], 10, true);
        this.sprite.animations.play('walk', 10, true);

        this.text = this.game.add.text(this.game.world.centerX, 200, `GREEN FOR MONEY. RED IS BAD.\nLose points for touching the edge.\nHold mouse to fly up. \nRelease to fall.\nClick unicorn to start`, {
            font: "64px Arial",
            fill: "#ABCDEF",
            align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);

        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.foo, this);
	}

	foo() {
        console.log('click')
		this.game.state.start("Main");
	}

}

export default GameTitle;
