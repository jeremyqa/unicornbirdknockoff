class GameTitle extends Phaser.State {

	create() {
        this.game.stage.backgroundColor = '#000000';
        this.addUnicornToTitleScreen();
        this.addCoinToTitleScreen();
        this.addInsructionsTextToTitle();

        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.getStarted, this);

	}

    addInsructionsTextToTitle() {
        this.text = this.game.add.text(this.game.world.centerX, 200, `HACK DAY 2.1.1`, {
            font: "36px Arial",
            fill: "#ABCDEF",
            align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);
    }

    addUnicornToTitleScreen() {
        this.sprite = this.game.add.sprite(200, this.game.world.centerY, 'unicorn');
        this.sprite.animations.add('walk', [0, 1], 10, true);
        this.sprite.animations.play('walk', 10, true);
    }

    addCoinToTitleScreen() {
        this.coin = this.game.add.sprite(400, this.game.world.centerY, 'coin');
        this.coin.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.coin.animations.play('spin', 10, true);
    }

	getStarted() {
		this.game.state.start("Main");
	}

}

export default GameTitle;
