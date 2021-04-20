class play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

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
        
        this.kid01 = new Kid(this, game.config.width + borderUISize * 6, borderUISize * 6, 'kid0S', 0, 30).setOrigin(0, 0);
        this.kid02 = new Kid(this, game.config.width + borderUISize * 3, borderUISize * 7 + borderPadding * 2, 'kid1S', 0, 20).setOrigin(0,0);
        this.kid03 = new Kid(this, game.config.width, borderUISize * 6 + borderPadding * 8, 'kid2S', 0, 10).setOrigin(0,0);
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

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, '$' + this.p1Score, scoreConfig);

        this.gameOver = false;

        scoreConfig.fixedWidth = 0;

        // game clock depending on mode selected + game over text
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 - 16, 'You earned $' + this.p1Score + ' dollars!', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Nice going dude!!!', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 80, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.clockTimer = this.add.text(borderUISize + borderPadding * 15, borderUISize + borderPadding * 2, 'Time remaining: ' + game.settings.gameTimer, scoreConfig);

        this.music = false; //queue me adding music in probably the most roundabout way

        //added a condition for the powerup because you could still get points after you get the powerup after it got destroyed? hopefully this helps fixes
        this.powerupGot = false;

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

        if(game.settings.gameTimer == 45000 && !this.music) {
            this.gameBGM = this.sound.add('game_bgm', {volume: 0.3, loop: false});
            this.gameBGM.play();
            this.music = true;
        }

        if(game.settings.gameTimer == 60000 && !this.music) {
            this.gameBGM = this.sound.add('game_bgm2', {volume: 0.3, loop: false});
            this.gameBGM.play();
            this.music = true;
        }

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
            this.kid01.update();           
            this.kid02.update();
            this.kid03.update();
        }

        if (!this.gameOver && !this.powerupGot) {
            this.Pop2.update();
        }

        if(this.checkCollision(this.p1Rocket, this.kid03)) {
            this.p1Rocket.reset();
            this.kidChomp(this.kid03);
        }
        if (this.checkCollision(this.p1Rocket, this.kid02)) {
            this.p1Rocket.reset();
            this.kidChomp(this.kid02);      
        }
        if (this.checkCollision(this.p1Rocket, this.kid01)) {
            this.p1Rocket.reset();
            this.kidChomp(this.kid01);
        }
        if (this.checkCollision(this.p1Rocket, this.Pop2)) {
            this.p1Score += this.Pop2.points;
            this.scoreLeft.text = this.p1Score; 
            this.p1Rocket.reset();
            this.Pop2.reset();         //just to be sure the soon to be empty object (?) is off screen
            this.Pop2.destroy();       
            this.p1Rocket.destroy();
            this.p1Rocket = new Rocket2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(0.5, 0);
            this.powerupGot = true;
        }
    }

    checkCollision(rocket, kid) {
        if (rocket.x < kid.x + kid.width &&
            rocket.x + rocket.width > kid.x &&
            rocket.y < kid.y + kid.height &&
            rocket.height + rocket.y > kid.y) {
                return true;
            }
            else {
                return false;
            }
    }

    kidChomp(kid) {
        kid.alpha = 0;
        let randomNum = Math.floor(Math.random() * 4);
        this.sound.play('sfx_eat' + randomNum, {volume: 0.4});
        let eat = this.add.sprite(kid.x, kid.y, 'chomp').setOrigin(0, 0);
        eat.anims.play('chomp');
        kid.reset();                          // reset kid position so you can't hit it while invisible (reset point is pretty far off screen)
        eat.on('animationcomplete', () => {    // callback after anim completes
          kid.alpha = 1;                      // make kid visible again
          eat.destroy();                       // remove eat sprite
        });
        // score add
        this.p1Score += kid.points;
        this.scoreLeft.text = '$' + this.p1Score; 
        this.p1Rocket.isReset = true;    
      }

    //attempt at creating an animation that plays as the kids go across the screen -- definitely not how ur supposed to do it
    animationUpd8(kid, spritesheet) {
        let wave = this.add.sprite(kid.x, kid.y, spritesheet).setOrigin(0, 0);
        wave.anims.play(spritesheet);
        wave.on('animationcomplete', () => {
            wave.destroy();
        });
    }
}