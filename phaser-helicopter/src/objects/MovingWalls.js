class MovingWalls {

    constructor(game){

        this.game = game;
        this.spriteGroup = null;
        this.badPoints = -10000;

        let seed = Date.now();
        this.random = new Phaser.RandomDataGenerator([seed]);

        this.initWalls();
    }

    doubleBadPoints() {
        this.badPoints = this.badPoints * 2;
    }
    
    changeBadPoints(value) {
        this.badPoints += value;
    }
    
    getBadPoints() {
        return this.badPoints;
    }
    initWalls(){

        this.spriteGroup = this.game.add.group();
        this.spriteGroup.enableBody = true;
        this.spriteGroup.createMultiple(15, 'panda');

        this.coinGroup = this.game.add.group();
        this.coinGroup.enableBody = true;
        this.coinGroup.createMultiple(30, 'coin');
        this.coinGroup.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
    }

    spawn() {
        let num_coins = this.random.integerInRange(0,4); // to do this is stupid
        for(var i=0;i<num_coins;i++){
            this.addGoodCoin();
        }
        this.addBadWall();
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

    addBadWall() {
        this.wallSpeed = this.random.integerInRange(750, 1000);
        let wall = this.spriteGroup.getFirstDead();
        wall.scale.setTo(this.game.rnd.realInRange(.25, 1), this.game.rnd.realInRange(.25, 1));
        wall.body.updateBounds(wall.scale.x, wall.scale.y);
        wall.body.gravity.y = 0;

        wall.reset(this.game.world.width, this.random.integerInRange(0, this.game.world.height));

        wall.body.velocity.x = -this.wallSpeed;
        wall.body.immovable = true;

        //When the block leaves the screen, kill it
        wall.checkWorldBounds = true;
        wall.outOfBoundsKill = true;
        wall.points = this.badPoints;
        return wall;
    }

}

export default MovingWalls;