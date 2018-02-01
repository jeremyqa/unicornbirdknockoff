class Platforms {

    constructor(game, player){

        this.game = game;
        this.player = player;
        this.initBricks();
        this.initCoinGroup();
        this.initOgreGroup();
    }
    
    initBricks(){
        this.brickGroup = this.game.add.physicsGroup();
        this.brickGroup.enableBody = true;
        this.brickGroup.createMultiple(100, 'grass');

    }

    initOgreGroup() {
      this.ogreGroup = this.game.add.physicsGroup();
      this.ogreGroup.enableBody = true;
      this.ogreGroup.createMultiple(30, 'ogre');
      this.ogreGroup.callAll('animations.add', 'animations', 'attack', [0, 1, 2, 3], 10, true);
    }

    initCoinGroup() {
      this.coinGroup = this.game.add.physicsGroup();
      this.coinGroup.enableBody = true;
      this.coinGroup.createMultiple(30, 'coin');
      this.coinGroup.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
    }



  addOgre(xCoord, yCoord) {
        let ogre = this.ogreGroup.getFirstDead();
        ogre.hp = 2;
        ogre.scale.setTo(5, 5);
        ogre.body.updateBounds(ogre.scale.x, ogre.scale.y);
        ogre.reset(xCoord, yCoord);
        ogre.checkWorldBounds = true;
        ogre.outOfBoundsKill = true;
        ogre.body.immovable = true;
        ogre.animations.play('attack', 5, true);
        ogre.body.sprite.tint = 0xFFFFFF;
    }

    addProjectile(xVelocity, yVelocity) {
        let coin = this.coinGroup.getFirstDead();
        coin.animations.play('spin', 10, true);

        coin.reset(this.player.sprite.body.position.x, this.player.sprite.body.position.y);
        coin.body.velocity.y = yVelocity;
        coin.body.velocity.x = xVelocity;
        coin.body.updateBounds(coin.scale.x, coin.scale.y);

        coin.body.immovable = false;
        coin.checkWorldBounds = true;
        coin.outOfBoundsKill = true;
    }


    playerDropBrick() {
        this.xdelta = 0;
        if(this.player.facing == "right") {
            this.xdelta = 125;
        }
        else if (this.player.facing == "left") {
            this.xdelta = -125;
        }
        this.addBrick(this.player.sprite.body.position.x + this.xdelta, this.player.sprite.body.position.y+120, 1, 1)
    }
    
    addBrick(x, y, scalex, scaley) {
        let brick = this.brickGroup.getFirstDead();
        brick.scale.setTo(scalex, scaley);
        brick.body.updateBounds(brick.scale.x, brick.scale.y);
        brick.body.gravity.y = 0;

        brick.reset(x, y);
        
        brick.body.immovable = true;
        brick.body.collideWorldBounds = true;
    }

}

export default Platforms;