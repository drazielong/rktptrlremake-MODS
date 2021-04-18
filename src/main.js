//Rosie Longo
//Popsicle Patrol
//April 18, 2021
//3 hrs so far
//Reskinned the game to be popsicle shooting game and not space (60 points)
//added background music to menu and main game (5 points)
//changed the background to have an animated sprite

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [menu, play],
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;