//Rosie Longo
//Popsicle Patrol
//April 18, 2021
//16 hours so far
//Reskinned the game to be popsicle shooting game and not space (60 points)
//added original background music to menu (5 points)
//Randomized explosion (eating) sfx (10 points)
//Randomized timing for kids respawning because why not
//changed the background to have an animated sprite (got rid of scrolling bg for now)
//added a powerup that is earned by shooting a faster sprite -- the powerup shoots faster and is larger than the base popsicle + is worth 1000 points. the player keeps it until game over (20 points)
//new title screen AND rules screen (10 points)
//added timer on screen (10 points)

/*
    WIP stuff/things I might get around to doing:
    - kids animations as they slide by? On the rules screen you can see the idea I had for that, but I couldn't work it out.
        - They dont even need arms I would take an armless sprite of the kids going :) :D :) :D
    - reimplement scrolling bg (like flowers/sidewalk/blades of grass)
    - border and general UI changes
    - BGM music for the main game (currently just reusing the same track for menu and game which I dont like but im not good at making music)
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