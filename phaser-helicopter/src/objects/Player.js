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
        this.sprite.body.bounce.y = 0;

        this.sprite.animations.add('walk', [0,1], 10, true);
        this.sprite.animations.play('walk', 10, true);
        this.sprite.body.gravity.y = 2500;
        this.sprite.body.velocity.y = 0;
        this.sprite.body.collideWorldBounds = true;

        this.sprite.anchor.setTo(0.5, 0.5);

    }


    increaseVerticalVelocity() {
        // console.log(this.sprite.body.velocity.y);
        // this.sprite.body.velocity.y = Math.max(-1200, this.sprite.body.velocity.y - 150);
        this.sprite.body.velocity.y -= 1000;
    }
    
    moveRight() {
        // console.log(this.sprite.body.velocity.x);
        // console.log('move right');
        this.sprite.body.velocity.x += 400;
        if (this.facing == 'left') {
            this.sprite.scale.x *= -1;
            this.facing = 'right';
        }
    }

    moveLeft() {
        // console.log(this.sprite.body.velocity.x);
        // console.log('move left');
        this.sprite.body.velocity.x -= 400;
        if (this.facing == 'right') {
            this.sprite.scale.x *= -1;
            this.facing = 'left';
        }
    }


    stopLateral() {
        this.sprite.body.velocity.x = 0;
    }

}

export default Player;