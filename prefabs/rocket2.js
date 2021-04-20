//making this because i dont have time to figure out exactly how to change the movespeed rocket.js
class Rocket2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);  //add to existing, displayList, updateList
        this.isFiring = false;     //track rocket's firing status 
        this.isReset = true;       //check is missile is reset before playing the firing sfx again
        this.moveSpeed = 6;        //pixels per frame 
        this.sfxPop = scene.sound.add('sfx_pop');
    }

    update(){
        //left right movement which is only allowed if rocket is not firing
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.isFiring = true;
            if (this.isReset){
                this.sfxPop.play({volume: 0.5}); //play sfx
            }    
        }
        //if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
            this.isReset = false; //to prevent the rocket shooting sound from playing when in the air
        }
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
            this.isReset = true;
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}