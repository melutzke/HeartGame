function draw_game() {
	ctx = canvas.getContext("2d");
	ctx.drawImage(background, Math.round(platform_x_movement*(0.5)%background.width-background.width), 0);
	ctx.drawImage(background, Math.round(platform_x_movement*(0.5)%background.width), 0);
	ctx.drawImage(background, Math.round(platform_x_movement*(0.5)%background.width+background.width), 0);

	ctx.drawImage(background2, Math.round(platform_x_movement*(0.8)%background.width-background.width), 0);
	ctx.drawImage(background2, Math.round(platform_x_movement*(0.8)%background.width), 0);
	ctx.drawImage(background2, Math.round(platform_x_movement*(0.8)%background.width+background.width), 0);

		////////////////////////////////////////////////////////////////////////////////////////// DRAW EACH INDIVIDUAL TILE WHERE IT GOES
		for(var i = 0; i<map.length; i++){
			for(var k = 0; k<map[i].length; k++){
				if(imageMap[i][k] != null) ctx.drawImage(imageMap[i][k], k*blocksize+Math.floor(platform_x_movement), Math.floor(i*blocksize), blocksize, blocksize);
			}
		}

		////////////////////////////////////////////////////////////////////////////////////////// DRAW EACH COLLECTABLE
		for(var i = 0; i<collectable.length; i++){
			// handle booze collectables
			if(!collectable[i].hidden){
				ctx.drawImage(Cell.image, collectable[i].x+Math.floor(platform_x_movement), Math.floor(collectable[i].y));
			}
		}
	
		////////////////////////////////////////////////////////////////////////////////////////// DRAW DAT BUCKY
	drawObject(CurrPlayer, ctx);

		////////////////////////////////////////////////////////////////////////////////////////// DRAW UI
	drawUI(ctx);

		////////////////////////////////////////////////////////////////////////////////////////// DRAW BUTTON
	Button_Gameplay_Reset.draw();
	Button_Gameplay_Options.draw();

	//**************************************************************************************************** Buttons
	if(Button_Gameplay_Reset.clicked()){
		PlayerGame.resetGame();
	}

	if(Button_Gameplay_Options.clicked()){
		PlayerGame.state = GAMESTATE_OPTIONS;
	}
		////////////////////////////////////////////////////////////////////////////////////////// DRAW SEXY GRID
	if(grid){
		blocksWidth = map[0].length;
		blocksHeight = map.length;
		for(var i = 0; i*blocksize<=blocksWidth*blocksize; i++){
			ctx.stokeStyle = "rgb(0,0,0)";
			ctx.beginPath();
			ctx.moveTo(0,i*blocksize);
			ctx.lineTo(blocksWidth*blocksize,i*blocksize);
			ctx.stroke();

			ctx.stokeStyle = "rgb(0,0,0)";
			ctx.beginPath();
			ctx.moveTo(i*blocksize+platform_x_movement%blocksize,0);
			ctx.lineTo(i*blocksize+platform_x_movement%blocksize,blocksHeight*blocksize);
			ctx.stroke();

			ctx.stokeStyle = "rgb(0,0,0)";
		}
	}
}

	////////////////////////////////////////////////////////////////////////////////////////// DRAW EVERYTHING
function draw_world() {  

	var canvas = document.getElementById("draw_canvas");

	if (PlayerGame.state == GAMESTATE_GAMEPLAY) {
		draw_game();
				////////////////////////////////////////////////////////////////////////////////////////// SPLASH SCREEN IF-BLOCK

	} else if(PlayerGame.state == GAMESTATE_OPTIONS){

		ctx.drawImage(optionsScreen, 0, 0);
		Button_Options_Start.draw();

		if(Button_Options_Start.clicked()){
			PlayerGame.resetGame();              //reset the game so that you don't start a game at your previous progress/death
			PlayerGame.state = GAMESTATE_START;
		}

	} 

	else if(PlayerGame.state == GAMESTATE_START){
		ctx.drawImage(startScreen, 0, 0);
		Button_Start_Options.draw();
		Button_Start_Credits.draw();
		Button_Start_Play.draw();


		if(Button_Start_Play.clicked()){
			PlayerGame.state = GAMESTATE_GAMEPLAY;
					
		}	
		
		
		if(Button_Start_Credits.clicked())
		{
			PlayerGame.state = GAMESTATE_CREDITS;	
		}
		

		if(Button_Start_Options.clicked()){
			PlayerGame.state = GAMESTATE_OPTIONS;
					
		}	

	}else if(PlayerGame.state == GAMESTATE_CREDITS){
		ctx.drawImage(creditScreen1, 0, 0);
		//left side
		
		ctx.drawImage(creditNameMitchell, 50, 50, 200, 100);
	    ctx.drawImage(creditNameAlex,     50, 150, 200, 100);
		ctx.drawImage(creditNameNick,     50, 250, 200, 100);
		//right side
        ctx.drawImage(creditNameJason, 350, 125, 200, 100);
        ctx.drawImage(creditNameJesse, 350, 300, 200, 100);

  
		MatrixEffect();
		IntToAscii(750, 200);
		
		
		
		
		
			                ctx.font = 'bold 40px Calibri';
				    ctx.fillStyle = "rgb(255, 255, 255)";
				    ctx.strokeStyle = 'white';
		            ctx.lineWidth   = 10;
	                ctx.fillText(aMitchellM, 50, 50);
		
		
		
		
		
		
		
		
		
		
		
		
		
		Button_Credits_MainMenu.draw();

		if(Button_Credits_MainMenu.clicked()){
			PlayerGame.state = GAMESTATE_START;
		}
		
		
	}
//end function draw_world()
}



function MatrixEffect(){


           ctx.drawImage(alphabetSoup[iArrayPosition], 750, 530);
           //iArrayPosition++;
           
           
           //if(iArrayPosition >= 3){
           	
           //    iArrayPosition = 0;
           //}
           
           //ctx.fillStyle = "rgb(0, 0, 0)";
           //ctx.fillText("sdf", 370, 130);

      
}




function IntToAscii(iXStartPosition, iYStartPosition){
	
		//var iXTextPosition = 0;
        //var iYTextPosition = 0;
		
		var x = String.fromCharCode(iCounter);
		
		ctx.font = 'bold 40px Calibri';
		ctx.fillStyle = "rgb(255, 255, 255)";

		ctx.strokeStyle = 'white';
		ctx.lineWidth   = 10;
	    ctx.fillText(x, iXStartPosition, iYStartPosition);
				
	    //ctx.drawImage(creditNameMitchell, 50, 50, 200, 100);
	    //ctx.drawImage(creditNameAlex,     50, 150, 200, 100);
		//ctx.drawImage(creditNameNick,     50, 250, 200, 100);
		
		
		if(bMitchellM == 0){
		    //iStringPosition = sMitchellM.length;
			
			//change to a while
			if(iStringPosition < sMitchellM.length){

				if(x == sMitchellM.charAt(iStringPosition)){
					
					ctx.font = 'bold 40px Calibri';
				    ctx.fillStyle = "rgb(255, 255, 255)";
				    ctx.strokeStyle = 'white';
		            ctx.lineWidth   = 10;
	                ctx.fillText(x, iXTextPosition, iYTextPosition);
	                
	                
	                
	                aMitchellM[iStringPosition] = x;         
	                
	                iXTextPosition += 40;
	                iCounter = 32;
	                iStringPosition++;
	                
	                
	                ctx.font = 'bold 40px Calibri';
				    ctx.fillStyle = "rgb(255, 255, 255)";
				    ctx.strokeStyle = 'white';
		            ctx.lineWidth   = 10;
	                ctx.fillText(aMitchellM, 50, 50);
	                
				}
				
				else if(iCounter != sMitchellM.charAt(iStringPosition)){
					iCounter++;
				}
				
				
			}
			
			
		}
		
		if(bJasonA == 0){
			
		}
		
		if(bAlexS == 0){
			
		}
		
		if(bNickH == 0){
			
		}
		
		if(bJesseK == 0)
		{
		
		   iCounter++;
		}
		
		
		
		
		//if(iCounter <= iCounterMax)
		//{
		//	iCounter = iCounterMin;
		//}
	
}

