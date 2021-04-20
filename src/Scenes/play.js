class play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    //preloads assets so we can use them in game
    preload() { 
        this.load.image('rocket', 'assets/pop1.png');
        this.load.image('rocket2', 'assets/pop2.png');
        this.load.image('kid0S', 'assets/kid1.png');
        this.load.image('kid1S', 'assets/kid2.png');
        this.load.image('kid2S', 'assets/kid3.png');
        this.load.spritesheet('chomp', 'assets/chomp2.png', {frameWidth: 76, frameHeight: 84, startFrame: 0, endFrame: 4});
        this.load.spritesheet('bg', 'assets/bgsprites.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 1});
    }

    create() {
        //animation config
        this.anims.create({
            key: 'drive',
            frames: this.anims.generateFrameNumbers('bg', { start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'chomp',
            frames: this.anims.generateFrameNumbers('chomp', { start: 0, end: 4, first: 0}),
            frameRate: 12
        });

        let bgAnim = this.add.sprite(0, 0, 'drive').setOrigin(0, 0);
        bgAnim.anims.play('drive');

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0); 
        
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 6, 'kid0S', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 7 + borderPadding * 2, 'kid1S', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 8, 'kid2S', 0, 10).setOrigin(0,0);
        this.Pop2 = new Powerup(this, game.config.width, borderUISize * 2 + borderPadding * 4, 'powerup', 0, 1000).setOrigin(0,0);

        //white borders 
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        //add rocket aka popsicle (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        this.gameOver = false;

        scoreConfig.fixedWidth = 0;

        // game clock depending on mode selected
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.clockTimer = this.add.text(borderUISize + borderPadding * 15, borderUISize + borderPadding * 2, 'Time remaining: ' + game.settings.gameTimer, scoreConfig);

        this.gameBGM = this.sound.add('menu_bgm', {volume: 0.2, loop: true});
        this.gameBGM.play();

        /* {
             mute: false,
             volume: 1,
             rate: 1,
             detune: 0,
             seek: 0,
             loop: false,
             delay: 0
        */ 
       }

    update() {
        this.clockTimer.text = ('Time remaining: ' + Math.floor(this.clock.getRemainingSeconds()));

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.gameBGM.stop(); 
            this.scene.start("menuScene");
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.gameBGM.stop();
            this.scene.restart();
        }

        if (!this.gameOver) { 
            this.p1Rocket.update();              
            this.ship01.update();           
            this.ship02.update();
            this.ship03.update();
            this.Pop2.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);      
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.Pop2)) {
            this.p1Score += this.Pop2.points;
            this.scoreLeft.text = this.p1Score; 
            this.p1Rocket.reset();
            this.Pop2.destroy();
            this.p1Rocket.destroy();
            this.p1Rocket = new Rocket2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(0.5, 0);
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            }
            else {
                return false;
            }
    }

    shipExplode(ship) {
        ship.alpha = 0;
        let randomNum = Math.floor(Math.random() * 4);
        this.sound.play('sfx_eat' + randomNum, {volume: 0.8});
        let eat = this.add.sprite(ship.x, ship.y, 'chomp').setOrigin(0, 0);
        eat.anims.play('chomp');
        ship.reset();                           // reset ship position so you can't hit it while invisible
        eat.on('animationcomplete', () => {    // callback after anim completes
          ship.alpha = 1;                      // make ship visible again
          eat.destroy();                       // remove eat sprite
        });
        // score add
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        this.p1Rocket.isReset = true;    
      }

    //attempt at creating an animation that plays as the kids go across the screen -- definitely not how ur supposed to do it
    animationUpd8(ship, spritesheet) {
        let wave = this.add.sprite(ship.x, ship.y, spritesheet).setOrigin(0, 0);
        wave.anims.play(spritesheet);
        wave.on('animationcomplete', () => {
            wave.destroy();
        });
    }
}