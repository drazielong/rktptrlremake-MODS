class Powerup extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = game.settings.spaceshipSpeed + 2;       
    }


    update(){
        this.x -= this.moveSpeed;
        //if powerup goes beyond the border on the left side, reset on the right side
        if(this.x <= 0 - this.width) {
            this.x = game.config.width + 600;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}