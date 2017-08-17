class Player {

    constructor(game){
        this.game = game;
        this.isRising = false;
        this.sprite = null;
    }

    spawn(){
        
        this.sprite = this.game.add.sprite(200, this.game.world.centerY, 'unicorn');
        this.sprite.name = "player";
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.enableBody = true;
        this.sprite.body.bounce.y = .25;

        this.sprite.animations.add('walk', [0,1], 10, true);
        this.sprite.animations.play('walk', 10, true);
        this.sprite.body.gravity.y = 4500;
        this.sprite.body.velocity.y = 0;
        this.sprite.body.collideWorldBounds = true;

        this.sprite.anchor.setTo(0.5, 0.5);

    }

    setRising(){
        this.isRising = true;
    }

    setFalling(){
        this.isRising = false;
    }

    increaseVerticalVelocity() {
        // console.log(this.sprite.body.velocity.y);
        this.sprite.body.velocity.y = Math.max(-1200, this.sprite.body.velocity.y - 150);
    }
    
    moveRight() {
        // console.log(this.sprite.body.velocity.x);
        // console.log('move right');
        this.sprite.body.velocity.x = 250;
    }

    moveLeft() {
        // console.log(this.sprite.body.velocity.x);
        // console.log('move left');
        this.sprite.body.velocity.x = -250;
    }

    
    stopLateral() {
        // console.log(this.sprite.body.velocity.x);
        // console.log("stop lateral");
        this.sprite.body.velocity.x = 0;
    }

    isOutOfBounds(){

        let position = this.sprite.body.position.y;

        return position > this.game.world.height || position < 0;

    }

}

export default Player;