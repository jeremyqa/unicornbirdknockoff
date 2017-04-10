class GameOver extends Phaser.State {

	create() {
        console.log("game over, man");
        this.showMainMessage();
        this.showHighPandaCost();
        this.showHiringMessage();
        }

    showMainMessage() {
        this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'unicorn');
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.restartGame, this);

        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, `YOU'RE OUT OF MONEY :(\nClick the unicorn to try again.`, {
            font: "72px Arial",
            fill: "#ABCDEF",
            align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);
    }

    showHiringMessage() {
        let hiringText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 300, `Built during CB Insights Hack Day (We're hiring)`, {
            font: "20px Arial",
            fill: "#ABCDEF",
            align: "center"
        });
        hiringText.anchor.setTo(0.5, 0.5);
        hiringText.inputEnabled = true;
        hiringText.events.onInputDown.add(function() { window.open("https://www.cbinsights.com/jobs", "_blank");}, this);

    }

    showHighPandaCost() {
        let pandaText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, `Most expensive panda ever bought: $${localStorage.getItem("highPandaCost")*-1}`, {
            font: "20px Arial",
            fill: "#ABCDEF",
            align: "center"
        });
        pandaText.anchor.setTo(0.5, 0.5);

    }

	restartGame() {
        this.game.state.start("GameTitle");
	}

    update() {
        this.sprite.angle += 1;
    }

}

export default GameOver;
