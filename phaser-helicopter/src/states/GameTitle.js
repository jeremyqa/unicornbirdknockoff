class GameTitle extends Phaser.State {

	create() {
        this.sprite = this.game.add.sprite(200, this.game.world.centerY, 'unicorn');
        this.sprite.animations.add('walk', [0,1], 10, true);
        this.sprite.animations.play('walk', 10, true);

        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, `GREEN FOR MONEY. RED IS BAD.`, {
            font: "72px Arial",
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
