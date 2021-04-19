//Rosie Longo
//Popsicle Patrol
//April 18, 2021
//13 hrs so far
//Reskinned the game to be popsicle shooting game and not space (60 points)
//added background music to menu and main game (5 points)
//Randomized explosion (eating) sfx (10 points)
//changed the background to have an animated sprite (got rid of scrolling bg for now)
//added a powerup that is earned by shooting a faster sprite -- the powerup shoots faster and is larger than the base popsicle. the player keeps it until game over (20 points)
//new title screen AND rules screen (10 points)

//shoutout to user Joseph7695 on phaser discorse forums for posting about this.sound.get()

/*
    WIP stuff:
    - songs overlap when you quit to the main menu and start a new game (because of multiple song instances and the code only stops one at a time??)
    - kids animations (while they are going by and when they eat the popsicle) (10 points?)
    - border and general UI changes (10 points?)
    - BGM music for the main game + fix the overlapping (low priority)
    - maybe as cleanup, rename shit in these files to not say "spaceship" n stuff anymore
    - clock on screen if its even fucking possible (10 points)
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