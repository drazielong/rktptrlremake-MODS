class Kid extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;  //store pointValue
        this.moveSpeed = game.settings.kidSpeed;       
    }

    update() {
        this.x -= this.moveSpeed;
        //if ship goes beyond the border on the left side, reset on the right side
        if(this.x <= 0 - this.width) {
            this.x = game.config.width + 50;
        }
    }

    reset() {
        let randomNum = Math.floor(Math.random() * 300);
        this.x = game.config.width + 600 + randomNum;
    }
}