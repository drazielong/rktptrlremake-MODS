//Rosie Longo
//Popsicle Patrol
//April 18, 2021
//17 hours so far
//Reskinned the game to be popsicle shooting game and not space (60 points)
//added original background music to menu and to main game thanks to garageband ha...... (5 points)
//all sfx + music created by me using my mouth or a sound creator tool
//randomized explosion (eating) sfx (10 points)
//randomized timing for kids respawning because why not
//added a powerup that is earned by shooting a faster sprite -- the powerup shoots faster and is larger than the base popsicle + is worth 1000 points. the player keeps it until game over (20 points)
//new title screen AND rules screen (10 points)
//added timer on screen (10 points)
//changed the background to have an animated sprite (got rid of scrolling bg for now)

/*
    WIP stuff/things I might get around to doing:
    - kids animations as they slide by? On the rules screen you can see the idea I had for that, but I couldn't work it out.
        - They dont even need arms I would take an armless sprite of the kids going :) :D :) :D
    - reimplement scrolling bg (like flowers/sidewalk/blades of grass)
    - border and general UI changes
    - maybe as cleanup, rename shit in these files to not say "spaceship" n stuff anymore
    - intro animation before the game lets you play? This is such a stretch goal thing but I kinda want to do it for funsies
        - when the little piano tune plays at the beginning of play scene, display an animation thats like "ICE CREAM!!! ... GO" 
        - then the timer starts and the kids appear
        - this requires the game to loop the middle of the song so that it doesnt restart with the intro again
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