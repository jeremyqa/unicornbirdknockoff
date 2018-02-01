import Player from 'objects/Player';
import Platforms from 'objects/Platforms';

class Main extends Phaser.State {
    create() {
        this.score = 0;
        this.destroy = false;
        this.shootTimer = this.game.time.now;
        this.invulnTimer = this.game.time.now;

        this.bg = this.game.add.tileSprite(0, 0, 1920, 1920, 'background');
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#6699CC';

        this.player = new Player(this.game);
        this.player.spawn();

        this.platforms = new Platforms(this.game, this.player);
        
        this.platforms.addBrick(600, 1500, 1, 1);
        this.platforms.addBrick(1100, 1500, 1, 1);
        this.platforms.addOgre(300, 300);
        this.platforms.addOgre(300, 600);

        this.addKeyboardInput();
        this.addTimers();

        this.game.world.setBounds(0, 0, 1920, 1920);
        this.game.camera.follow(this.player.sprite);

        this.scoreTimer = this.game.time.now;

        this.text = this.game.add.text(225, 20, `scores here`, {
            font: "20px Arial",
            fill: "#000000",
            align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);
        this.text.fixedToCamera = true;

    }

    update() {
        if(this.game.time.now > this.scoreTimer) {
            this.text.setText(this.score);
        }

        this.player.stopMovement();
        //  collide(object1, object2, collideCallback, processCallback, callbackContext)

      // ogre and coins
      this.game.physics.arcade.collide(this.platforms.ogreGroup, this.platforms.coinGroup, this.damageOgre, null, this);


      // coins and walls:
      this.game.physics.arcade.collide(this.platforms.brickGroup,  this.platforms.coinGroup);


      // creatures -> walls:
      this.game.physics.arcade.collide(this.player.sprite, this.platforms.brickGroup, null, null, this);
      this.game.physics.arcade.collide(this.platforms.ogreGroup,  this.platforms.brickGroup);

      // player <- ogre hit:
      this.game.physics.arcade.collide(this.platforms.ogreGroup, this.player.sprite, this.ogreHitPlayer,null, this);


      this.checkMovementKeys();
      this.checkFireKeys();
      if(this.invulnTimer < this.game.time.now) {
        this.player.sprite.tint = 0xFFFFFF;
      }
    }


    ogreHitPlayer(player, ogre) { // this is confusing which is which
      if(this.invulnTimer > this.game.time.now) {
        return;
      }
      player.body.sprite.tint = 0x000000;
      this.invulnTimer = this.game.time.now + 200;
    }

    damageOgre(ogre, coin) {
      coin.kill();
      ogre.hp--;
      ogre.body.sprite.tint = 0xff0000;
      if(ogre.hp <= 0) {
        ogre.kill();
      }
    }

    checkMovementKeys() {
      if(this.right.isDown) {
        this.player.moveRight();
      }
      if(this.left.isDown) {
        this.player.moveLeft();
      }
      if(this.up.isDown) {
        this.player.moveUp();
      }
      if(this.down.isDown) {
        this.player.moveDown();
      }
    }
    checkFireKeys() {
      if(this.game.time.now > this.shootTimer) {
        if(this.cursors.left.isDown) {
            this.platforms.addProjectile(-500, 0);
            this.shootTimer = this.game.time.now + 500;
          }
        else if(this.cursors.right.isDown) {
          this.platforms.addProjectile(500, 0);
          this.shootTimer = this.game.time.now + 500;
        }
        else if(this.cursors.up.isDown) {
          this.platforms.addProjectile(0, -500);
          this.shootTimer = this.game.time.now + 500;
        }
        else if(this.cursors.down.isDown) {
          this.platforms.addProjectile(0, 500);
          this.shootTimer = this.game.time.now + 500;
        }

      }
    }
    addKeyboardInput() {
        this.up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.cursors = this.game.input.keyboard.createCursorKeys();

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