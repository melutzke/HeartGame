var GAMESTATE_START = 0;
var GAMESTATE_GAMEPLAY = 1;
var GAMESTATE_OPTIONS = 2;
var GAMESTATE_CREDITS = 3;


var canvas;

var background = new Image();
var background2 = new Image();
var blocksize = 50;
var collectable_count = 0;
var char_left = new Image();
var char_left_jump = new Image();
var char_left_second = new Image();
var char_right = new Image();
var char_right_jump = new Image();
var char_right_second = new Image();
var x_check;
var y_check;
var collectable = new Array();
var grav_const = 1;

var debug = true;
var grid = false;

var fpsWave = 60;
var gameHeight = 600;
var gameWidth = 1200;
var lastfps = 0;
var num_collisions = 0;
var platform_x_movement = 0;
var platforms = new Array();
var platform_update = 0;
var thisFrameFPS = 0;
var windowActive = true;
var startScreen   = new Image();
var optionsScreen = new Image();

var creditScreen1      = new Image();
var creditScreen2      = new Image();
var creditNameAlex     = new Image();
var creditNameNick     = new Image();
var creditNameMitchell = new Image();
var creditNameJason    = new Image();
var creditNameJesse    = new Image();

var a = new Image();
var b = new Image();
var c = new Image();
		
		a.src = "./Images/a.png";
		b.src = "./Images/b.png";
		c.src = "./Images/c.png";
			
		var alphabetSoup = new Array();
		alphabetSoup[0] = a;
		alphabetSoup[1] = b;
		alphabetSoup[2] = c;


var sMitchellM = "MITCHELL LUTZKE";
var sAlexS     = "ALEX SOHAIL";
var sNickH     = "NICK HEINDL";
var sJasonA    = "JASON ALTEKRUSE";
var sJesseK    = "JESSE KRIZENESKY";


var aMitchellM = new Array();
var aAlexS     = new Array();
var aNickH     = new Array();
var aJasonA    = new Array();
var aJesseK    = new Array();



var iStringPosition = 0;



var bJesseK    = 1;
var bNickH     = 1;
var bMitchellM = 0;
var bAlexS     = 1;
var bJasonA    = 1;



var iXTextPosition = 50;
var iYTextPosition = 100;

var iCounter = 33;
var iCounterMin = 33;
var iCounterMax = 126;
var iArrayPosition = 0;

creditScreen1.src =         "./Images/test_background.jpg";
//creditScreen2.src      =    "./Images/"
creditNameAlex.src     =    "./Images/AlexSohailey.png";
creditNameNick.src     =    "./Images/NickHizzle.png";
creditNameMitchell.src =    "./Images/MitchDeezy.png";
creditNameJason.src    =    "./Images/JasonUltraKra.png";
creditNameJesse.src    =    "./Images/JesseKrize.png";

char_right_jump.src = 		"./Images/bucky_right_jump.gif";
char_left_jump.src = 		"./Images/bucky_left_jump.gif";
char_right.src = 			"./Images/bucky_right.gif";
char_left.src = 			"./Images/bucky_left.gif";
char_right_second.src = 	"./Images/bucky_right_second.gif";
char_left_second.src = 		"./Images/bucky_left_second.gif";
background.src = 			"./Images/test_background1.jpg";
startScreen.src = 			"./Images/start_screen.fw.png";

optionsScreen.src = 		"./Images/options_screen.fw.png";
background2.src = 			"./Images/test_background2.png";

	// nice little piece of code that uses a browser's native
	// request animation frame function if it exists. If it doesn't,
	// it reverts back to setTimeout

(function() {
    var lastTime = 0;
    //var vendors = ['ms', 'moz', 'webkit', 'o'];
    var vendors = ['pie'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[vendors[x]+
          'CancelRequestAnimationFrame'];
    } 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            //var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
            	var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              16);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}())

	////////////////////////////////////////////////////////////////////////////////////////// SETTING THINGS UP INITIALLY
function begin_game() {


	Controller = new Control();

gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
    // a new gamepad connected
});

gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
    // gamepad disconnected
});

gamepad.bind(Gamepad.Event.UNSUPPORTED, function(device) {
    // an unsupported gamepad connected (add new mapping)
});


gamepad.bind(Gamepad.Event.TICK, function(gamepads) {
    // gamepads were updated (around 60 times a second)

	for (control in gamepads[0].state) {
		//value = gamepads[i].state[control];
		
		if(gamepads[0].state['A']){
			ControllerUse = true;
			Controller.space = true;
		} else if(gamepadSupport && ControllerUse){
			Controller.space = false;
		}

		if(gamepads[0].state['X']){
			ControllerUse = true;
			Controller.shift = true;
		} else if(gamepadSupport && ControllerUse) {
			Controller.shift = false;
		}

		if(gamepads[0].state['DPAD_LEFT']){
			ControllerUse = true;
			Controller.left = true;
		} else if(gamepadSupport && ControllerUse) {
			Controller.left = false;
		}

		if(gamepads[0].state['DPAD_RIGHT']){
			ControllerUse = true;
			Controller.right = true;
		} else if(gamepadSupport && ControllerUse) {
			Controller.right = false;
		}

		if(gamepads[0].state['DPAD_UP']){
			ControllerUse = true;
			Controller.up = true;
		} else if(gamepadSupport && ControllerUse) {
			Controller.up = false;
		}

		if(gamepads[0].state['DPAD_DOWN']){
			ControllerUse = true;
			Controller.down = true;
		} else if(gamepadSupport && ControllerUse) {
			Controller.down = false;
		}
	}



});

if (!gamepad.init()) {
    gamepadSupport = false;
}



console.log(gamepad);



	canvas = document.getElementById("draw_canvas");
	ctx = canvas.getContext("2d");

	Controller = new Control();
	PlayerGame = new Game(ctx, gameWidth, gameHeight, 10);		// (context, x_boundary, y_boundary, ms_delay)
	PlayerGame.clearColor = "rgb(135,206,235)";
	CurrPlayer = new Player(50, 300);				// (x-position, y-position)

	Grass = new Platform();
	Grass.imageArray = new Array();
	Grass.imageArray[0] = new Image();
	Grass.imageArray[0].src = "./Images/grass_tile.png";
	Grass.imageArray[1] = new Image();
	Grass.imageArray[1].src = "./Images/grass_tile2.png";

	Dirt = new Platform();
	Dirt.imageArray = new Array();
	Dirt.imageArray[0] = new Image();
	Dirt.imageArray[0].src = "./Images/ground_tile.png";
	Dirt.imageArray[1] = new Image();
	Dirt.imageArray[1].src = "./Images/ground_tile2.png";

	Block = new Platform();
	Block2 = new Platform();
	Block3 = new Platform();
	Cell = new Item();

	Spike = new Platform();
	SpikeColumn = new Platform();
	Cell.image.src = "./Images/redbloodcell.png";

	//Block.image.src = "platform_placeholder.gif";
	Block.image.src 	  = "./Images/platform.png";
	Block2.image.src 	  = "./Images/platform_only.png";
	Block3.image.src 	  = "./Images/platform_underneath.png";
	Spike.image.src 	  = "./Images/spike_pit.png";	
	SpikeColumn.image.src = "./Images/spike_lower.png";

	CurrPlayer.image.src  = "./Images/bucky_small.gif";
	scorebar = new Image();
	scorebar.src = "./Images/scorebar.jpg";

	//Syntax for buttons --> What Gamestate it is at _ What Gamestate it is going to
	//GAMESTATE_START
	Button_Start_Play = new Button(900, 280, 120, 50, "Play", ctx, false, "#000000");
	Button_Start_Options = new Button(900, 355, 180, 50, "Options", ctx, false,"#000000");
	Button_Start_Credits = new Button(900, 430, 160, 50, "Credz", ctx, false,"#000000");

	//GAMESTATE_GAMEPLAY
	Button_Gameplay_Reset = new Button(900, 10, 120, 30, "Reset", ctx, false,"#FFFFFF");
	Button_Gameplay_Options = new Button(1000, 10, 100, 30, "Options", ctx, false,"#FFFFFF");

	//GAMESTATE_OPTIONS
	Button_Options_Start = new Button(550, 500, 100, 30, "Menu", ctx, false, "#000000");

	//GAMESTATE_CREDITS
	Button_Credits_MainMenu = new Button(500, 500, 100, 30, "Menu", ctx, false,"#000000");

	imageMap = new Array(map.length);

	for(i = 0; i<map.length; i++){
		imageMap[i] = new Array(map[0].length);
	}

	

	for(var i = 0; i<map.length; i++){
		for(var k = 0; k<map[i].length; k++){
			


			// This fucking terrible mess draws the tiles, it looks like shit due to auto-tiling. If we dont
			// do tiling this will literally be like 4 if statements


				if(map[i][k]==1){
					if(i-1>=0){
						if(map[i-1][k]==1){
							imageMap[i][k] = Dirt.imageArray[Math.floor(Math.random()*Dirt.imageArray.length)]
						} else {
							imageMap[i][k] = Grass.imageArray[Math.floor(Math.random()*Grass.imageArray.length)];
						}
					} else {
						imageMap[i][k] = Grass.imageArray[Math.floor(Math.random()*Grass.imageArray.length)];
					}
				}
				// handle blue platforms
				if(map[i][k]==2){
					if(i-1>0 && i+1<map.length){
						if(map[i-1][k]==2 || map[i+1][k]==2){
							if(map[i-1][k] != 2){
								imageMap[i][k] = Block.image;
							} else {
								imageMap[i][k] = Block3.image;
							}
						} else {
							imageMap[i][k] = Block2.image;
						}
					} else {
						imageMap[i][k] = Block3.image;
					}
				}
				// handle spikes and their tiling
				if(map[i][k]==4){
					if(i-1>=0){
						if(map[i-1][k]==4){
							imageMap[i][k] = SpikeColumn.image;
						} else {
							imageMap[i][k] = Spike.image;
						}
					} else {
						imageMap[i][k] = Spike.image;
					}
				}
			
		if(imageMap[i][k] == undefined) imageMap[i][k] = null;
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////// SEND COLLECTABLES TO AN ARRAY FROM MAP FILE
	for(var i = 0; i<map.length; i++){
		for(var k = 0; k<map[i].length; k++){
			if(map[i][k]!=0 && map[i][k]!=3 && map[i][k] != 5){
				platforms.push(new Platform(k*blocksize, i*blocksize, map[i][k]));
			}
			if(map[i][k]==3){
				collectable.push(new Item(k*blocksize, i*blocksize));
			}
		}
	}
	frame();
}
