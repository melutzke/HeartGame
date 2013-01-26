var GAMESTATE_START = 0;
var GAMESTATE_GAMEPLAY = 1;
var GAMESTATE_OPTIONS = 2;
var GAMESTATE_CREDITS = 3;

var canvas; 
var ControllerUse = false;
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
var gamepadSupport = true;

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

var gamepad = new Gamepad();

var creditScreen1      = new Image();
var creditScreen2      = new Image();
var creditNameAlex     = new Image();
var creditNameNick     = new Image();
var creditNameMitchell = new Image();
var creditNameJason    = new Image();
var creditNameJesse    = new Image();

creditScreen1.src =         "./Images/test_background.jpg";
//creditScreen2.src      =    "./Images/"
creditNameAlex.src     =    "./Images/AlexSohailey.png";
creditNameNick.src     =    "./Images/NickHizzle.png";
creditNameMitchell.src =    "./Images/MitchDeezy.png";
creditNameJason.src    =    "./Images/JasonUltraKra.png";
creditNameJesse.src    =    "./Images/JesseKrize.png";

char_right_jump.src = 		"./Images/cellman_jumping.png";
char_left_jump.src = 		"./Images/bucky_left_jump.gif";
char_right.src = 			"./Images/cellman_running.png";
char_left.src = 			"./Images/bucky_left.gif";
char_right_second.src = 	"./Images/cellman_running2.png";
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
	Grass.image = new Image();
	Grass.image.src = "./Images/grass_tile.png";

	Dirt = new Platform();
	Dirt.image = new Image();
	Dirt.image.src = "./Images/ground_tile.png";

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
	Button_Start_Play = new Button(916, 280, 120, 50, "Play Game", ctx, true);
	Button_Start_Options = new Button(856, 355, 180, 50, "Options", ctx, true);
	Button_Start_Credits = new Button(876, 430, 160, 50, "Credz", ctx, true);

	//GAMESTATE_GAMEPLAY
	Button_Gameplay_Reset = new Button(1000, 10, 120, 30, "Reset Game", ctx, false);
	Button_Gameplay_Options = new Button(850, 10, 100, 30, "Options", ctx, false);

	//GAMESTATE_OPTIONS
	Button_Options_Start = new Button(550, 500, 100, 30, "Main Menu", ctx, false);

	//GAMESTATE_CREDITS
	Button_Credits_MainMenu = new Button(500, 500, 100, 30, "Main Menu", ctx, false);

	imageMap = new Array(map.length);

	for(i = 0; i<map.length; i++){
		imageMap[i] = new Array(map[0].length);
	}

	

	for(var i = 0; i<map.length; i++){
		for(var k = 0; k<map[i].length; k++){


				if(map[i][k]==1){
					imageMap[i][k] = Dirt.image;
				}
				// handle blue platforms
				if(map[i][k]==2){
					imageMap[i][k] = Block.image;
				}
				// handle spikes and their tiling
				if(map[i][k]==4){
					imageMap[i][k] = Spike.image;
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
