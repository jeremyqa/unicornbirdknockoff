class Player {

    constructor(game){
        this.game = game;
        this.sprite = null;
        this.facing = 'right'
    }

    spawn(){
        
        this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'unicorn');
        this.sprite.name = "player";
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.enableBody = true;

        this.sprite.animations.add('walk', [0,1], 10, true);
        this.sprite.animations.play('walk', 10, true);

        this.sprite.body.collideWorldBounds = true;

        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.tint = 0xFF00CC; // kind of a gross color
        // this.sprite.body.tint = 0xFFFFFF;
    }


    moveUp() {
        this.sprite.body.velocity.y -= 1000;
    }
    moveDown() {
      this.sprite.body.velocity.y += 1000;
    }
    moveRight() {
        this.sprite.body.velocity.x += 1000;
        if (this.facing == 'left') {
            this.sprite.scale.x *= -1;
            this.facing = 'right';
        }
    }
    moveLeft() {
        this.sprite.body.velocity.x -= 1000;
        if (this.facing == 'right') {
            this.sprite.scale.x *= -1;
            this.facing = 'left';
        }
    }
    stopMovement() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
    }

}

export default Player;