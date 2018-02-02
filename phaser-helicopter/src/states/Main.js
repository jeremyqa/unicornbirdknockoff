import Player from 'objects/Player';
import Platforms from 'objects/Platforms';

class Main extends Phaser.State {
    create() {
        this.money = 10000;
        this.shootDelay = 500;
        this.shootTimer = this.game.time.now;
        this.invulnTimer = this.game.time.now;
        this.level = 1;

        this.bg = this.game.add.tileSprite(0, 0, 1920, 1920, 'background');
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#6699CC';

        this.player = new Player(this.game);
        this.player.spawn();

        this.platforms = new Platforms(this.game, this.player);
        
        // this.platforms.addBrick(50, 0, 10, 1);
        this.platforms.addTreasure(50, 100, 0, 0);
        // this.platforms.addOgre(1300, 300, 0, 0);
        // this.platforms.addFly(500, 500);
        // this.platforms.addOgre(300, 600, 0, 0);
        // this.platforms.addOgre(300, 900, 0, 0);

        this.addKeyboardInput();
        this.addTimers();

        this.game.world.setBounds(0, 0, 1920, 1920);
        this.game.camera.follow(this.player.sprite);

        this.text = this.game.add.text(225, 20, `scores here`, {
            font: "42px Arial",
            fill: "#000000",
            align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);
        this.text.fixedToCamera = true;

    }

    update() {
      if (this.money < 0) {
        this.gameOver();
      }

      if(this.platforms.countOfEnemies() == 0) {
        this.platforms.randomTreasure();
        this.level++;
        this.spawmMonstersAtLevel(this.level);
      }

      this.player.stopMovement();
      this.text.setText(this.money);


      this.addMonsterBehaviors();
      this.addCollideRules();
      this.checkMovementKeys();
      this.checkFireKeys();
      this.checkInvuln();
    }


    addMonsterBehaviors() {
      this.platforms.ogreGroup.forEachAlive(this.platforms.seekPlayer, this, 300);
      this.platforms.bugGroup.forEachAlive(this.platforms.randomMovement, this, 150);
    }

    getTreasure(player, treasure) {
      treasure.kill();
      this.money += 1000;
    }

    addCollideRules() {
    //  collide(object1, object2, collideCallback, processCallback, callbackContext)

    // monsters and coins
    this.game.physics.arcade.collide(this.platforms.ogreGroup, this.platforms.coinGroup, this.damageMonster, null, this);
    this.game.physics.arcade.collide(this.platforms.bugGroup, this.platforms.coinGroup, this.damageMonster, null, this);

    // ogre & bugs
    this.game.physics.arcade.collide(this.platforms.ogreGroup, this.platforms.bugGroup, null, null, this);

    // coins and walls:
    this.game.physics.arcade.collide(this.platforms.brickGroup,  this.platforms.coinGroup);

    // creatures -> walls:
    this.game.physics.arcade.collide(this.player.sprite, this.platforms.brickGroup, null, null, this);
    this.game.physics.arcade.collide(this.platforms.ogreGroup,  this.platforms.brickGroup);

    // player <- ogre hit:
    this.game.physics.arcade.collide(this.platforms.ogreGroup, this.player.sprite, this.monsterHitPlayer,null, this);
      this.game.physics.arcade.collide(this.platforms.bugGroup, this.player.sprite, this.monsterHitPlayer,null, this);

    //player and treasure
    this.game.physics.arcade.collide(this.player.sprite, this.platforms.treasureGroup, this.getTreasure, null, this);
  }

    checkInvuln() {
      if(this.invulnTimer < this.game.time.now) {
        this.player.sprite.tint = 0xFFFFFF;
      }
    }

    monsterHitPlayer(player, monster) { // this is confusing which is which
      this.player.sprite.body.velocity.x += (monster.body.velocity.x)*10;
      this.player.sprite.body.velocity.y += (monster.body.velocity.y)*10;
      if(this.invulnTimer > this.game.time.now) {
        return;
      }
      player.body.sprite.tint = 0x000000;
      this.invulnTimer = this.game.time.now + 200;
      this.money -= 500;
    }

    damageMonster(ogre, coin) {
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
            this.money -= 100; // todo: don't copy paste this
            this.platforms.addProjectile(-500, 0);
            this.shootTimer = this.game.time.now + this.shootDelay;
          }
        else if(this.cursors.right.isDown) {
          this.money -= 100; // todo: don't copy paste this
          this.platforms.addProjectile(500, 0);
          this.shootTimer = this.game.time.now + this.shootDelay;
        }
        else if(this.cursors.up.isDown) {
          this.money -= 100; // todo: don't copy paste this
          this.platforms.addProjectile(0, -500);
          this.shootTimer = this.game.time.now + this.shootDelay;
        }
        else if(this.cursors.down.isDown) {
          this.money -= 100; // todo: don't copy paste this
          this.platforms.addProjectile(0, 500);
          this.shootTimer = this.game.time.now + this.shootDelay;
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
        // this.game.time.events.loop(1000, this.platforms.randomOgre, this.platforms);
        // this.game.time.events.loop(1000, this.platforms.randomFly, this.platforms);
        // this.game.time.events.loop(10000, this.platforms.randomTreasure, this.platforms);
    }


  spawmMonstersAtLevel(level) {
    let fuzz = this.game.rnd.integerInRange(0,2);
    for(var i=0; i<fuzz; i++) {
      this.platforms.randomFly();
      this.platforms.randomOgre()
    }

  }
    gameOver(){
        // localStorage.setItem("highScore", this.highScore);
        // localStorage.setItem("highPandaCost", this.highPandaCost);
        this.game.state.start('GameOver')
    }

}

export default Main;