class play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        //green ui bg - add and rectangle come from phaser framework
        //parameters: ?, ?, width, height, color
        //Im guessing the first two parameters are the start corner as in where to draw the rectangle
        this.add.rectangle(0, borderUISize + BorderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0); //default origin is the middle of rectangle
    }
}

//adam is speedrunning so ill finish this later