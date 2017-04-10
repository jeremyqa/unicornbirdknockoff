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

        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, `YOU'RE OUT OF MONEY :(\nClick the unicorn to try again.`, {
            font: "72px Arial",
            fill: "#ABCDEF",
            align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);
    }

    showHiringMessage() {
        let hiringText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, `Built during CB Insights Hack Day (We're hiring)\nClick the coin to see job openings:`, {
            font: "20px Arial",
            fill: "#ABCDEF",
            align: "center"
        });
        hiringText.anchor.setTo(0.5, 0.5);
        hiringText.inputEnabled = true;
        hiringText.events.onInputDown.add(this.openJobsPage, this);

        this.coinSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 300, 'coin');
        this.coinSprite.anchor.setTo(0.5, 0.5);
        this.coinSprite.animations.add('spin', [0,1,2,3,4,5,6,7,8,10], 10, true);
        this.coinSprite.animations.play('spin', 10, true);
        this.coinSprite.inputEnabled = true;
        this.coinSprite.events.onInputDown.add(this.openJobsPage, this);

    }

    openJobsPage() {
        window.open("https://www.cbinsights.com/jobs", "_blank");
    }
    
    showHighPandaCost() {
        let pandaText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, `Most expensive panda ever bought: $${localStorage.getItem("highPandaCost")*-1}`, {
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
