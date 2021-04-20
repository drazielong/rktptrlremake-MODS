class menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
        this.choice = false;
    }

    preload() {
        this.load.audio('sfx_select', 'assets/select.wav');
        this.load.audio('sfx_eat0', 'assets/eat0.wav');
        this.load.audio('sfx_eat1', 'assets/eat1.wav');
        this.load.audio('sfx_eat2', 'assets/eat2.wav');
        this.load.audio('sfx_eat3', 'assets/eat3.wav');
        this.load.audio('sfx_pop', 'assets/pop.m4a');
        this.load.audio('menu_bgm', 'assets/menubgm.m4a');
        this.load.audio('bgm', 'assets/dark_theme.mp3'); //placeholder :/
        this.load.image('menubg', 'assets/menu.png');
        this.load.image('rules', 'assets/rules.png');
        this.load.spritesheet('kid0', 'assets/kid1SP.png', {frameWidth: 86, frameHeight: 105, startFrame: 0, endFrame: 1});
        this.load.spritesheet('kid1', 'assets/kid2SP.png', {frameWidth: 86, frameHeight: 105, startFrame: 0, endFrame: 1});
        this.load.spritesheet('kid2', 'assets/kid3SP.png', {frameWidth: 86, frameHeight: 105, startFrame: 0, endFrame: 1});
        this.load.image('powerup','assets/powerup.png');
    }

    create() {
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        //https://phasertutorials.com/creating-a-phaser-3-template-part-3/?a=13 for music shit
        //i think what is happening is that every time we open a scene, a new instance of the song and every asset is created
        //so when i return to the menu screen and play another game, the menu song will play anyway bc i only have one "stop song" function
        this.sound.play('menu_bgm', {volume: 0.2, loop: true});
        this.add.tileSprite(0, 0, 640, 480, 'menubg').setOrigin(0,0);

        this.anims.create({
            key: 'kidz0',
            frames: this.anims.generateFrameNumbers('kid0', { start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'kidz1',
            frames: this.anims.generateFrameNumbers('kid1', { start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'kidz2',
            frames: this.anims.generateFrameNumbers('kid2', { start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) && !this.choice) {
            //ez mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.choice = true;
            this.sound.play('sfx_select');
            this.add.tileSprite(0, 0, 640, 480, 'rules').setOrigin(0,0);
            this.Animation(100, 150, 'kidz0');
            this.Animation(250, 150, 'kidz1');
            this.Animation(400, 150, 'kidz2');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && !this.choice) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.choice = true;
            this.sound.play('sfx_select');
            this.add.tileSprite(0, 0, 640, 480, 'rules').setOrigin(0,0);
            this.Animation(100, 150, 'kidz0');
            this.Animation(250, 150, 'kidz1');
            this.Animation(400, 150, 'kidz2');
        }

        if (Phaser.Input.Keyboard.JustDown(keyF) && this.choice){
            this.sound.play('sfx_select');
            this.sound.get('menu_bgm').stop(); 
            this.scene.start('playScene');
            this.choice = false;
        }
    }

    Animation(x, y, kid) {
        let Anim = this.add.sprite(x, y, kid).setOrigin(0, 0);
        Anim.anims.play(kid);
    }
}