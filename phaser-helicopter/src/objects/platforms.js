class Platforms {

    constructor(game, player){

        this.game = game;
        this.player = player;
        this.initBricks();
        this.initCoinGroup();
        this.initOgreGroup();
        this.initTreasure();
        this.initBugs();

    }
  
    initBugs() {
      this.bugGroup = this.game.add.physicsGroup();
      this.bugGroup.enableBody = true;
      this.bugGroup.createMultiple(20, 'fly');
    }
  
    initBricks(){
        this.brickGroup = this.game.add.physicsGroup();
        this.brickGroup.enableBody = true;
        this.brickGroup.createMultiple(10, 'grass');
    }

    initOgreGroup() {
      this.ogreGroup = this.game.add.physicsGroup();
      this.ogreGroup.enableBody = true;
      this.ogreGroup.createMultiple(20, 'ogre');
      this.ogreGroup.callAll('animations.add', 'animations', 'attack', [0, 1, 2, 3], 10, true);
    }

    initCoinGroup() {
      this.coinGroup = this.game.add.physicsGroup();
      this.coinGroup.enableBody = true;
      this.coinGroup.createMultiple(30, 'coin'); // make sure this doesn't fill up
      this.coinGroup.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
    }

    initTreasure() {
      this.treasureGroup = this.game.add.physicsGroup();
      this.treasureGroup.enableBody = true;
      this.treasureGroup.createMultiple(30, 'treasure');  // limit spawns. is there a smart way to do that?
    }


  seekPlayer(child, speed) { // todo: make them turn towards the player?
    if(child.body.position.x > this.player.sprite.body.position.x) {
      child.body.velocity.x = speed * -1;
    }
    if(child.body.position.y > this.player.sprite.body.position.y) {
      child.body.velocity.y = speed * -1;
    }
    if(child.body.position.x < this.player.sprite.body.position.x) {
      child.body.velocity.x = speed;
    }
    if(child.body.position.y < this.player.sprite.body.position.y) {
      child.body.velocity.y = speed;
    }
  }

  randomMovement(child, speed) { // todo: use speed. favor moving towards center.
    child.body.velocity.x += this.game.rnd.integerInRange(-300, 300);
    child.body.velocity.x = Math.max(-400, Math.min(child.body.velocity.x, 400));

    child.body.velocity.y += this.game.rnd.integerInRange(-300, 300);
    child.body.velocity.y = Math.max(-400, Math.min(child.body.velocity.y, 400));

  }


  addTreasure(xcoord, ycoord, xVel, yVel) {
    let treasure = this.treasureGroup.getFirstDead();
    treasure.scale.setTo(.5,.5);
    treasure.body.updateBounds(.5,.5);
    treasure.reset(xcoord, ycoord);
    treasure.checkWorldBounds = true;
    treasure.body.immovable = true;
  }
  
  addFly(xcoord, ycoord) {
    let bug = this.bugGroup.getFirstDead();
    bug.hp = 2;
    bug.scale.setTo(1,1);
    bug.body.updateBounds(1,1);
    bug.reset(xcoord, ycoord);
    bug.checkWorldBounds = true;
    bug.body.immovable = true;
    bug.outOfBoundsKill = true;
    bug.body.sprite.tint = 0xFFFFFF;
  }
  
  addOgre(xCoord, yCoord, xVelocity, yVelocity) {
        let ogre = this.ogreGroup.getFirstDead();
        ogre.hp = 2;
        ogre.scale.setTo(5, 5);
        ogre.body.updateBounds(ogre.scale.x, ogre.scale.y);
        ogre.reset(xCoord, yCoord);
        ogre.checkWorldBounds = true;
        ogre.outOfBoundsKill = true;
        ogre.body.immovable = false;
        ogre.animations.play('attack', 5, true);
        ogre.body.sprite.tint = 0xFFFFFF;
        ogre.body.velocity.x = xVelocity;
        ogre.body.velocity.y = yVelocity;
    }

  randomOgre() { // todo: consolidate randomFoo methods
    if(this.ogreGroup.countLiving() < 5) {
      this.addOgre(this.game.rnd.integerInRange(100, 200), this.game.rnd.integerInRange(100, 1000), 0, 0);
    }
  }

  randomTreasure() {
    if(this.treasureGroup.countLiving() < 3) {
      this.addTreasure(this.game.rnd.integerInRange(100, 1000), this.game.rnd.integerInRange(100, 1000, 0, 0))
    }
  }

  randomFly() {
    if(this.bugGroup.countLiving() < 5) {
      this.addFly(this.game.rnd.integerInRange(100, 1000), this.game.rnd.integerInRange(100, 1000), 0, 0)
    }
  }

    addProjectile(xVelocity, yVelocity) {
      if(this.coinGroup.countLiving() < 30) {
        let coin = this.coinGroup.getFirstDead();
        coin.animations.play('spin', 10, true);

        coin.reset(this.player.sprite.body.position.x, this.player.sprite.body.position.y);
        coin.body.velocity.y = yVelocity;
        coin.body.velocity.x = xVelocity;
        coin.body.updateBounds(coin.scale.x, coin.scale.y);

        coin.body.immovable = true;
        coin.checkWorldBounds = true;
        coin.outOfBoundsKill = true;
      }
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

    countOfEnemies() {
      return this.ogreGroup.countLiving() + this.bugGroup.countLiving() + this.treasureGroup.countLiving();
    }
  
}

export default Platforms;