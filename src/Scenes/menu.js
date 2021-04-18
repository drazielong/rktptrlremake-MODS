class menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx_select', 'assets/select.wav');
        this.load.audio('sfx_eat1', 'assets/eat1.wav');
        this.load.audio('sfx_eat2', 'assets/eat2.wav');
        this.load.audio('sfx_eat3', 'assets/eat3.wav');
        this.load.audio('sfx_eat4', 'assets/eat4.wav');
        this.load.audio('sfx_pop', 'assets/pop.m4a');
        this.load.audio('menu_bgm', 'assets/menubgm.m4a');
        this.load.image('menubg', 'assets/menu.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'ROCKET PATROL... 2!!!', menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width / 2, game.config.height / 2, 'Use ↔ keys to move and (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        // this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        this.sound.play('menu_bgm', {volume: 0.2, loop: true});
        this.add.tileSprite(0, 0, 640, 480, 'menubg').setOrigin(0,0);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //ez mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.sound.get('menu_bgm').stop(); 
            this.scene.start('playScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.sound.get('menu_bgm').stop(); 
            this.scene.start('playScene');
        }
    }
}