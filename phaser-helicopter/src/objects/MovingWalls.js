class MovingWalls {

    constructor(game){

        this.game = game;
        this.spriteGroup = null;

        let seed = Date.now();
        this.random = new Phaser.RandomDataGenerator([seed]);
        this.wallSpeed = this.random.integerInRange(250, 700);

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
        this.spriteGroup.createMultiple(10, wallSpriteTexture);

    }

    spawn(){

        let wall = this.spriteGroup.getFirstDead();
        wall.scale.setTo(this.game.rnd.realInRange(1, 3), this.game.rnd.realInRange(1, 3));
        wall.body.gravity.y = 0;

        wall.reset(this.game.world.width, this.random.integerInRange(0, this.game.world.height));

        wall.body.velocity.x = -this.wallSpeed;
        wall.body.immovable = true;

        //When the block leaves the screen, kill it
        wall.checkWorldBounds = true;
        wall.outOfBoundsKill = true;
        wall.name = "foobar wall";

        /*
        ok so the idea here is that any wall might be + or - money
        so first decide the value -- ok
        then set the color
         */

        // wall.points = this.random.integerInRange(-10000, 10000)
        wall.points = 0

    }

}

export default MovingWalls;