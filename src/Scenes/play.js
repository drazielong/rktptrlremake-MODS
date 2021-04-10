class play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    //preloads assets so we can use them in game
    preload() { 
        this.load.image('dave', 'assets/dave.png');
    }

    create() {
        //green ui bg - add and rectangle come from phaser framework
        //parameters: ?, ?, width, height, color
        //Im guessing the first two parameters are the start corner as in where to draw the rectangle
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0); //default origin is the middle of rectangle
        //white borders i cant see the whole thing bruh
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        this.dave = this.add.tileSprite(0, 0, 640, 480, 'dave').setOrigin(0,0);
        this.dave2 = this.add.tileSprite(0, 0, 640, 480, 'dave').setOrigin(0,0);
        this.add.text(240, 150, 'DAVE IS ETERNAL');
    }

    update(){
        this.dave.tilePositionX -= 2;
        this.dave.tilePositionY -= 2;
        this.dave2.tilePositionX += 2;
        this.dave2.tilePositionY += 2;
    }

}

