import Boot from 'states/Boot';
import Preload from 'states/Preload';
import GameTitle from 'states/GameTitle';
import Main from 'states/Main';
import GameOver from 'states/GameOver';

class Game extends Phaser.Game {

    constructor() {
        let maxWidth = 1600;
        let maxHeight = 900;
        let windowWidth = window.innerWidth * window.devicePixelRatio;
        let windowHeight = window.innerHeight * window.devicePixelRatio;

        super(Math.min(maxWidth, windowWidth), Math.min(maxHeight, windowHeight), Phaser.AUTO);
        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('GameTitle', GameTitle, false);
        this.state.add('Main', Main, false);
        this.state.add('GameOver', GameOver, false);

        this.state.start('Boot');
    }

}

new Game();