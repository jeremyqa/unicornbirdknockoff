import Player from 'objects/Player';
import Platforms from 'objects/Platforms';

class Main extends Phaser.State {
    create() {
        this.bg = this.game.add.tileSprite(0, 0, 1920, 1920, 'background');
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#6699CC';

        this.player = new Player(this.game);
        this.player.spawn();

        this.platforms = new Platforms(this.game, this.player);
        
        this.platforms.addBrick(600, 1500, 1, 1);
        this.platforms.addBrick(1100, 1500, 1, 1);
        this.platforms.addGoodCoin();

        this.addControls();
        this.addTimers();

        this.game.world.setBounds(0, 0, 1920, 1920);
        this.game.camera.follow(this.player.sprite);

        this.brickTimer = this.game.time.now;
        this.coinTimer = this.game.time.now;

        // this.platforms = this.game.add.physicsGroup();
        // this.platforms.enableBody = true;
        // this.platforms.physicsBodyType = Phaser.Physics.ARCADE;
        //
        // this.platforms.create(600, 600, 'platform');
        // this.platforms.create(400, 200, 'panda');
        // this.platforms.setAll('body.immovable', true);


    }

    update() {
        this.player.stopLateral();

        this.game.physics.arcade.collide(this.player.sprite, this.platforms.brickGroup);
        this.game.physics.arcade.collide(this.player.sprite, this.platforms.coinGroup);
        this.game.physics.arcade.collide(this.platforms.brickGroup,  this.platforms.coinGroup);

        this.game.physics.arcade.collide(this.platforms.ogreGroup,  this.platforms.coinGroup);
        this.game.physics.arcade.collide(this.platforms.ogreGroup,  this.platforms.brickGroup);
        this.game.physics.arcade.collide(this.platforms.ogreGroup, this.player.sprite);



        // this.game.physics.arcade.overlap(this.player.sprite, this.platforms.brickGroup, this.collideDecision, null, this);
        // this.game.physics.arcade.collide(this.player.sprite, this.platforms.coinGroup, this.collideDecision, null, this);


        if(this.player.sprite.body.blocked.down === true || this.player.sprite.body.blocked.up == true) {
            // console.log('edge');
        }
        

        if(this.right.isDown) {
            this.player.moveRight();
        }
        if(this.left.isDown) {
            this.player.moveLeft();
        }
        // jumpButton.isDown && (player.body.onFloor() || player.body.touching.down
        if(this.jump.isDown && (this.player.sprite.body.blocked.down || this.player.sprite.body.touching.down)) {
            this.player.increaseVerticalVelocity();
        }
        if(this.space.isDown && this.game.time.now > this.brickTimer) {
            this.platforms.playerDropBrick();
            this.platforms.addOgre();
            this.brickTimer = this.game.time.now + 750;
        }

        if(this.game.time.now > this.coinTimer) {
            this.platforms.addGoodCoin();
            this.coinTimer = this.game.time.now + this.game.rnd.realInRange(1000, 5000);
        }
    }

    collideDecision(a, b) {
        console.log("COLLIDED");
        b.kill();
    }

    addControls(){
        this.addKeyboardInput();
    }


    addKeyboardInput() {
        this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // jump.onDown.add(this.player.setRising, this.player);
        // jump.onUp.add(this.player.setFalling, this.player);
        //
        // right.onDown.add(this.player.moveRight, this.player);
        // // right.onUp.add(this.player.stopLateral, this.player);
        //
        // left.onDown.add(this.player.moveLeft, this.player);
        // // left.onUp.add(this.player.stopLateral, this.player);
        // space.onDown.add(this.platforms.addBrick, this.platforms);


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