class Platforms {

    constructor(game, player){

        this.game = game;
        this.player = player;
        this.initBricks();
    }
    
    initBricks(){
        this.brickGroup = this.game.add.physicsGroup();
        this.brickGroup.enableBody = true;
        this.brickGroup.createMultiple(100, 'grass');

        this.coinGroup = this.game.add.physicsGroup();
        this.coinGroup.enableBody = true;
        this.coinGroup.createMultiple(30, 'coin');
        this.coinGroup.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);

        this.ogreGroup = this.game.add.physicsGroup();
        this.ogreGroup.enableBody = true;
        this.ogreGroup.createMultiple(30, 'ogre');
        this.ogreGroup.callAll('animations.add', 'animations', 'attack', [0, 1, 2, 3], 10, true);
    }

    addOgre() {
        let ogre = this.ogreGroup.getFirstDead();
        ogre.body.gravity.y = 200;
        ogre.scale.setTo(5, 5);
        ogre.body.updateBounds(ogre.scale.x, ogre.scale.y);
        ogre.reset(this.player.sprite.body.position.x + this.game.rnd.realInRange(-500, 500), 0);
        ogre.checkWorldBounds = true;
        ogre.outOfBoundsKill = true;
        ogre.body.immovable = false;
        ogre.animations.play('attack', 5, true);
    }

    addGoodCoin() {
        let coin = this.coinGroup.getFirstDead();
        coin.animations.play('spin', 10, true);
        coin.body.gravity.y = 200;
        coin.body.updateBounds(coin.scale.x, coin.scale.y);
        coin.reset(this.player.sprite.body.position.x + this.game.rnd.realInRange(-1000, 1000), 0);
        coin.body.velocity.x = 0;
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