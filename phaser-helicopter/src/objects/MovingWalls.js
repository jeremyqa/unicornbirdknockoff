class MovingWalls {

    constructor(game){

        this.game = game;
        this.spriteGroup = null;

        let seed = Date.now();
        this.random = new Phaser.RandomDataGenerator([seed]);
        this.wallSpeed = this.random.integerInRange(750, 1500);

        this.initWalls();
    }

    initWalls(){

        this.wallHeight = 100;
        this.wallWidth = 100;

        let wallSprite = new Phaser.Graphics(this.game)
            .beginFill(Phaser.Color.hexToRGB('#AABBCC'), 1)
            .drawRect(0, 0, this.wallWidth, this.wallHeight);

        let wallSpriteTexture = wallSprite.generateTexture();

        this.spriteGroup = this.game.add.group();
        this.spriteGroup.enableBody = true;
        this.spriteGroup.createMultiple(15, wallSpriteTexture);

    }

    spawn(){

        let wall = this.spriteGroup.getFirstDead();
        wall.scale.setTo(this.game.rnd.realInRange(1, 1.2), this.game.rnd.realInRange(1, 4));
        wall.body.updateBounds(wall.scale.x, wall.scale.y);
        wall.body.gravity.y = 0;

        wall.reset(this.game.world.width, this.random.integerInRange(0, this.game.world.height));

        wall.body.velocity.x = -this.wallSpeed;
        wall.body.immovable = true;

        //When the block leaves the screen, kill it
        wall.checkWorldBounds = true;
        wall.outOfBoundsKill = true;
        wall.name = "foobar wall";



        let wall_type = this.random.integerInRange(0,5); // to do this is stupid
        if (wall_type == 1) {
            wall.tint = 0x00ff00;
            wall.points = 1000
        }
        // else if (wall_type == 2) {
        //     wall.tint = 0x0000FF;
        //     wall.points = 0
        // }
        else {
            wall.tint = 0xFF0000;
            wall.points = -5000;
        }

    }

}

export default MovingWalls;