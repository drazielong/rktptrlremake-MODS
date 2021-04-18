class play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    //preloads assets so we can use them in game
    preload() { 
        this.load.image('rocket', 'assets/pop2.png');
        this.load.image('spaceship', 'assets/kid1.png'); 
        this.load.image('dave','assets/dave.png'); //placeholder for powerup
        // load spritesheet
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 2});
        this.load.spritesheet('bg', 'assets/bgsprites.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 1});
        this.load.audio('bgm', 'assets/menubgm.m4a') //placeholder!!!!!!!!!!!!!!!
    }

    create() {
        //animation config
        this.anims.create({
            key: 'drive',
            frames: this.anims.generateFrameNumbers('bg', { start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });

        this.bgAnimation();

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0); 

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0,0);

        //white borders 
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 2, first: 0}),
            frameRate: 3
        });

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

        //display clock (same settings as score because lazy)
        this.clockTimer = this.add.text(borderUISize + borderPadding * 22, borderUISize + borderPadding * 2, game.settings.gameTimer, scoreConfig);

        this.sound.play('bgm', {volume: 0.2, loop: true});
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

        //scoreConfig is outta scope, but play.scoreConfig works (sort of lmao) but it does not update still

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
            //resets audio: had to type it like this because even if i put the music in a variable, i couldnt call it here because its out of scope I guesS? it would also tell me "stop isnt a function" if i did this.sound.stop('bgm')
            //but this line can access the music from any scene apparently
            //shoutout to user Joseph7695 on phaser discorse forums for coming in clutch
            this.sound.get('bgm').stop(); 
        }

        if (!this.gameOver) {               
            this.p1Rocket.update();
            this.ship01.update();           
            this.ship02.update();
            this.ship03.update();

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
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;  
        this.sound.play('sfx_eat1', {volume: 0.8}); //randomize eat sounds go here
        this.p1Rocket.isReset = true;    
      }

    bgAnimation() {
        let bgAnim = this.add.sprite(0, 0, 'drive').setOrigin(0, 0);
        bgAnim.anims.play('drive');
    }
}