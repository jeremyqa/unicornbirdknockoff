class Platforms {

    constructor(game, player){

        this.game = game;
        this.spriteGroup = null;
        this.player = player;
        this.initBricks();
    }
    getGroup() {
        return this.spriteGroup;
    }
    initBricks(){
        this.spriteGroup = this.game.add.physicsGroup();
        this.spriteGroup.enableBody = true;
        this.spriteGroup.createMultiple(100, 'panda');

        this.coinGroup = this.game.add.physicsGroup();
        this.coinGroup.enableBody = true;
        this.coinGroup.createMultiple(30, 'coin');
        this.coinGroup.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
    }

    spawn() {
        // let num_coins = this.random.integerInRange(0,4); // to do this is stupid
        // for(var i=0;i<num_coins;i++){
        //     this.addGoodCoin();
        // }
        // this.addBrick();
    }

    addGoodCoin() {
        let coin = this.coinGroup.getFirstDead();
        coin.animations.play('spin', 10, true);
        coin.body.gravity.y = 200;
        coin.scale.setTo(1, 1);
        coin.body.updateBounds(coin.scale.x, coin.scale.y);
        coin.reset(10, 100);
        coin.body.velocity.x = 0;
        coin.body.immovable = false;
        coin.checkWorldBounds = true;
        coin.outOfBoundsKill = true;
    }

    playerDropBrick() {
        this.addBrick(this.player.sprite.body.position.x, this.player.sprite.body.position.y, .25, .25)
    }
    
    addBrick(x, y, scalex, scaley) {
        let brick = this.spriteGroup.getFirstDead();
        brick.scale.setTo(scalex, scaley);
        brick.body.updateBounds(brick.scale.x, brick.scale.y);
        brick.body.gravity.y = 0;

        brick.reset(x, y);
        
        brick.body.immovable = true;
        brick.body.collideWorldBounds = true;
    }

}

export default Platforms;