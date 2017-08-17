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

        // this.coinGroup = this.game.add.group();
        // this.coinGroup.enableBody = true;
        // this.coinGroup.createMultiple(30, 'coin');
        // this.coinGroup.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
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
        coin.body.gravity.y = 0;
        coin.reset(this.game.world.width, this.random.integerInRange(0, this.game.world.height));
        coin.body.velocity.x = -750;
        coin.body.immovable = true;
        coin.checkWorldBounds = true;
        coin.outOfBoundsKill = true;
        coin.points = 1000;
    }

    addBrick() {
        console.log('add brick');
        console.log(this.player.sprite.body.position.x, this.player.sprite.body.position.y);

        let brick = this.spriteGroup.getFirstDead();
        brick.scale.setTo(.25, .25);
        brick.body.updateBounds(brick.scale.x, brick.scale.y);
        brick.body.gravity.y = 1000;

        brick.reset(this.player.sprite.body.position.x, this.player.sprite.body.position.y);
        
        // brick.body.immovable = true;
        brick.body.collideWorldBounds = true;
        //When the block leaves the screen, kill it
        // brick.checkWorldBounds = true;
        // brick.outOfBoundsKill = true;
        // brick.points = this.badPoints;
        return brick;
    }

}

export default Platforms;