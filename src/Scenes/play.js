class play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    //preloads assets so we can use them in game
    preload() { 
        this.load.image('stars', 'assets/stars.png');
        this.load.image('galaxy', 'assets/galaxy.png');
        this.load.image('rocket', 'assets/rocket.png');
    }

    create() {
        //tile sprite wants five parameters: x-position, y-position, width, height, and a key string that tells us which image to use
        this.stars = this.add.tileSprite(0, 0, 640, 480, 'stars').setOrigin(0,0);
        //green ui bg - add and rectangle come from phaser framework
        //parameters: ?, ?, width, height, color
        //Im guessing the first two parameters are the starting position as in where to draw the rectangle
        //default origin is the middle of rectangle, we want the upper left corner
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0); 
        //white borders 
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize, 'rocket').setOrigin(0.5, 0);
        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.stars.tilePositionX -= 2;
        this.p1Rocket.update();
    }

}

