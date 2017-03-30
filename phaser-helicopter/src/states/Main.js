import Helicopter from 'objects/Helicopter';
import MovingWalls from 'objects/MovingWalls';

class Main extends Phaser.State {
    create() {
        console.log("hello world -- create()");
        // this.game.add.sprite(0,0,'unicorn');

        this.money = 10000;
        //Enable Arcade Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set the games background colour
        this.game.stage.backgroundColor = '#6699CC';

        this.helicopter = new Helicopter(this.game);
        this.helicopter.spawn();

        this.walls = new MovingWalls(this.game);

        this.addControls();
        this.addTimers();

        this.text = this.game.add.text(50, 10, `$${this.money}`, {
            font: "20px Arial",
            fill: "#000000",
            align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);
    }

    update() {

        this.game.physics.arcade.overlap(this.helicopter.sprite, this.walls.spriteGroup, this.collideDecision, null, this);

        // // Check if out of bounds
        // if(this.helicopter.isOutOfBounds()){
        //     this.gameOver();
        // }

        // Check if  helicopter is rising
        if(this.helicopter.isRising){
            this.helicopter.increaseVerticalVelocity();
        }

        this.money--;


        if(this.money < 1) {
            this.gameOver();
        }

        if(this.helicopter.sprite.body.blocked.down === true || this.helicopter.sprite.body.blocked.up == true) {
            this.money -= 300;
        }

        this.text.setText(`$${this.money}`);
    }

    collideDecision(a, b) {
        this.money += b.points;
        b.kill();

    }

    addControls(){
        this.game.input.onDown.add(this.helicopter.setRising, this.helicopter);
        this.game.input.onUp.add(this.helicopter.setFalling, this.helicopter);
    }

    addTimers(){
        this.game.time.events.loop(750, this.walls.spawn, this.walls);
    }

    gameOver(){
        // this.game.state.restart();
        this.game.state.start('GameOver')
    }

}

export default Main;