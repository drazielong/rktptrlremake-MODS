class Powerup extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.kidSpeed + 2;       
    }

    update(){
        this.x -= this.moveSpeed;
        //if powerup goes beyond the border on the left side, reset 600 pixels off the right side
        if(this.x <= 0 - this.width) {
            this.x = game.config.width + 600;
        }
    }

    reset() {
        this.x = game.config.width + 600;
    }
}