import Helicopter from 'objects/Helicopter';
import MovingWalls from 'objects/MovingWalls';

class Main extends Phaser.State {
    create() {
        this.highScore = localStorage.getItem("highScore");
        this.highPandaCost = localStorage.getItem("highPandaCost");

        if (this.highScore === null) {
            this.highScore = 0;
        }
        
        if (this.highPandaCost === null) {
            this.highPandaCost = 0;
        }
        this.money = 0;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#6699CC';

        this.helicopter = new Helicopter(this.game);
        this.helicopter.spawn();

        this.walls = new MovingWalls(this.game);

        this.addControls();
        this.addTimers();

        this.text = this.game.add.text(225, 10, `scores here`, {
            font: "20px Arial",
            fill: "#000000",
            align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);
    }

    update() {

        this.game.physics.arcade.overlap(this.helicopter.sprite, this.walls.spriteGroup, this.collideDecision, null, this);
        this.game.physics.arcade.overlap(this.helicopter.sprite, this.walls.coinGroup, this.collideDecision, null, this);

        if(this.helicopter.isRising){
            this.helicopter.increaseVerticalVelocity();
        }

        this.money++;

        if(this.money > this.highScore) {
            this.highScore = this.money;
        }
        
        if(this.money < 1) {
            this.gameOver();
        }

        if(this.helicopter.sprite.body.blocked.down === true || this.helicopter.sprite.body.blocked.up == true) {
            this.money -= 2;
        }

        this.text.setText(`$${this.money} Top: $${this.highScore} Panda Cost: -$${this.walls.getBadPoints()*-1}`);
    }

    collideDecision(a, b) {
        this.money += b.points;
        if (b.points < 0) {
            if(this.highPandaCost > this.walls.getBadPoints()) {
                this.highPandaCost = this.walls.getBadPoints();
            }
            this.walls.doubleBadPoints()
        }
        else {
            this.walls.changeBadPoints(-100);
        }
        b.kill();
    }

    addControls(){
        this.addSpaceBar();
        this.addMouseClick();
        this.addEscapeToQuit();
    }

    addEscapeToQuit() {
        let escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escape.onDown.add(this.gameOver, this);
    }

    addMouseClick() {
        this.game.input.onDown.add(this.helicopter.setRising, this.helicopter);
        this.game.input.onUp.add(this.helicopter.setFalling, this.helicopter);
    }

    addSpaceBar() {
        let space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this.helicopter.setRising, this.helicopter);
        space.onUp.add(this.helicopter.setFalling, this.helicopter);
    }

    addTimers(){
        this.game.time.events.loop(750, this.walls.spawn, this.walls);
    }

    gameOver(){
        localStorage.setItem("highScore", this.highScore);
        localStorage.setItem("highPandaCost", this.highPandaCost);
        this.game.state.start('GameOver')
    }

}

export default Main;