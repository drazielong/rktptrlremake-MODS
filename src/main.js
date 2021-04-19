//Rosie Longo
//Popsicle Patrol
//April 18, 2021
//13 hrs so far
//Reskinned the game to be popsicle shooting game and not space (60 points)
//added original background music to menu and main game (5 points)
//Randomized explosion (eating) sfx (10 points)
//changed the background to have an animated sprite (got rid of scrolling bg for now)
//added a powerup that is earned by shooting a faster sprite -- the powerup shoots faster and is larger than the base popsicle. It is worth 1000 points. the player keeps it until game over (20 points)
//new title screen AND rules screen (10 points)
//added clock on screen (10 points)

//shoutout to user Joseph7695 on phaser discorse forums for posting about this.sound.get()

/*
    WIP stuff:
    - kids animations as they slide by (or change back to static heads so it matches the eating anims)
    - reimplement scrolling bg (like flowers/sidewalk/blades of grass)
    - border and general UI changes
    - BGM music for the main game + fix the overlapping (bug)
    - maybe as cleanup, rename shit in these files to not say "spaceship" n stuff anymore
*/

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