import Player from 'objects/Player';
import Platforms from 'objects/Platforms';

class Main extends Phaser.State {
    create() {
        this.debug = false;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#6699CC';

        this.player = new Player(this.game);
        this.player.spawn();

        this.platforms = new Platforms(this.game, this.player);

        this.addControls();
        this.addTimers();

        // this.game.world.setBounds(0, 0, 1920, 1920);
        // this.game.camera.follow(this.player.sprite);

        // this.platforms = this.game.add.physicsGroup();
        // this.platforms.enableBody = true;
        // this.platforms.physicsBodyType = Phaser.Physics.ARCADE;
        //
        // this.platforms.create(600, 600, 'platform');
        // this.platforms.create(400, 200, 'panda');
        // this.platforms.setAll('body.immovable', true);

    }

    update() {
        // console.log(this.player);
        // console.log(this.player.sprite.body.position.y, this.player.sprite.body.position.x);
        this.game.physics.arcade.collide(this.player.sprite, this.platforms.getGroup());
        this.game.physics.arcade.collide(this.platforms.getGroup());
        // this.game.physics.arcade.overlap(this.player.sprite, this.platforms.spriteGroup, this.collideDecision, null, this);
        // this.game.physics.arcade.overlap(this.player.sprite, this.platforms.coinGroup, this.collideDecision, null, this);

        if(this.player.isRising){
            this.player.increaseVerticalVelocity();
        }

        if(this.player.sprite.body.blocked.down === true || this.player.sprite.body.blocked.up == true) {
            // console.log('edge');
        }
    }

    collideDecision(a, b) {

    }

    addControls(){
        this.addKeyboardInput();
    }


    addKeyboardInput() {
        let jump = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        let right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        let left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        let space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        jump.onDown.add(this.player.setRising, this.player);
        jump.onUp.add(this.player.setFalling, this.player);

        right.onDown.add(this.player.moveRight, this.player);
        // right.onUp.add(this.player.stopLateral, this.player);

        left.onDown.add(this.player.moveLeft, this.player);
        // left.onUp.add(this.player.stopLateral, this.player);
        space.onDown.add(this.platforms.addBrick, this.platforms);


    }

    addTimers(){
        // this.game.time.events.loop(750, this.platforms.spawn, this.platforms);
    }

    gameOver(){
        localStorage.setItem("highScore", this.highScore);
        localStorage.setItem("highPandaCost", this.highPandaCost);
        this.game.state.start('GameOver')
    }

}

export default Main;