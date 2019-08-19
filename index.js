(function() {
   
    asteroid_img = new Image();
    asteroid_img.src = "./asteroid.jpg"
    points_img = new Image();
    points_img.src = "./crate.jpg"
    player_img = new Image();
    player_img.src = "./playerright.png"
    speed_img = new Image();
    speed_img.src = "./speed.jpg"
    shield_img = new Image();
    shield_img.src = "./shield.jpg"
    small_img = new Image();
    small_img.src = "./small.jpg"
    
    playerright_img = new Image();
    playerright_img.src = "./playerright.png"
    playerleft_img = new Image();
    playerleft_img.src = "./playerleft.png"
    playerup_img = new Image();
    playerup_img.src = "./playerup.png"
    playerdown_img = new Image();
    playerdown_img.src = "./playerdown.png"
    playerupright_img = new Image();
    playerupright_img.src = "./playerupright.png"
    playerupleft_img = new Image();
    playerupleft_img.src = "./playerupleft.png"
    playerdownleft_img = new Image();
    playerdownleft_img.src = "./playerdownleft.png"
    playerdownright_img = new Image();
    playerdownright_img.src = "./playerdownright.png"
     
    playerrightgreen_img = new Image();
    playerrightgreen_img.src = "./playerrightgreen.png"
    playerleftgreen_img = new Image();
    playerleftgreen_img.src = "./playerleftgreen.png"
    playerupgreen_img = new Image();
    playerupgreen_img.src = "./playerupgreen.png"
    playerdowngreen_img = new Image();
    playerdowngreen_img.src = "./playerdowngreen.png"
    playeruprightgreen_img = new Image();
    playeruprightgreen_img.src = "./playeruprightgreen.png"
    playerupleftgreen_img = new Image();
    playerupleftgreen_img.src = "./playerupleftgreen.png"
    playerdownleftgreen_img = new Image();
    playerdownleftgreen_img.src = "./playerdownleftgreen.png"
    playerdownrightgreen_img = new Image();
    playerdownrightgreen_img.src = "./playerdownrightgreen.png"
     
    playerrightred_img = new Image();
    playerrightred_img.src = "./playerrightred.png"
    playerleftred_img = new Image();
    playerleftred_img.src = "./playerleftred.png"
    playerupred_img = new Image();
    playerupred_img.src = "./playerupred.png"
    playerdownred_img = new Image();
    playerdownred_img.src = "./playerdownred.png"
    playeruprightred_img = new Image();
    playeruprightred_img.src = "./playeruprightred.png"
    playerupleftred_img = new Image();
    playerupleftred_img.src = "./playerupleftred.png"
    playerdownleftred_img = new Image();
    playerdownleftred_img.src = "./playerdownleftred.png"
    playerdownrightred_img = new Image();
    playerdownrightred_img.src = "./playerdownrightred.png"
    
    playerrightblue_img = new Image();
    playerrightblue_img.src = "./playerrightblue.png"
    playerleftblue_img = new Image();
    playerleftblue_img.src = "./playerleftblue.png"
    playerupblue_img = new Image();
    playerupblue_img.src = "./playerupblue.png"
    playerdownblue_img = new Image();
    playerdownblue_img.src = "./playerdownblue.png"
    playeruprightblue_img = new Image();
    playeruprightblue_img.src = "./playeruprightblue.png"
    playerupleftblue_img = new Image();
    playerupleftblue_img.src = "./playerupleftblue.png"
    playerdownleftblue_img = new Image();
    playerdownleftblue_img.src = "./playerdownleftblue.png"
    playerdownrightblue_img = new Image();
    playerdownrightblue_img.src = "./playerdownrightblue.png"
    
    var canvas;
    var context;
    var width;
    var height;
    
    var interval_id;
    var request;
    
    var powers = [];
    var ps = [];
    var stars = [];
    var points = [];
    var player = {
        x : 0,
        y : 360,
        size : 20
    };
    var score = 0;
    var timer = 0;
    var powertimer = 0;
    var asteroidmax = 0;
    var asteroidmin = 0;
    
    var shield = false;
    var speed = false;
    var moveLeft = false;
    var moveRight = false;
    var moveUp = false;
    var moveDown = false;
    var pause = false;
    
    document.addEventListener('DOMContentLoaded', intro, false);
    document.addEventListener('keydown', init, false)

    function init(event) { 
	document.removeEventListener('keydown', init, false)
	var p_elements = document.querySelector("p")
	p_elements.innerHTML = "Press SPACEBAR to pause/unpause"
	document.addEventListener("keydown", activate, false)
        document.addEventListener("keyup", deactivate, false)
	interval_id = window.setInterval(draw, 33);
    }
    
    function intro() {
	canvas = document.querySelector('canvas');
	context = canvas.getContext('2d');
	width = canvas.width;
	height = canvas.height;
	
	context.textAlign="center"
	context.fillStyle = "yellow";
	context.font ="48px Arial";
	context.fillText("WELCOME TO SUPPLY RUN", (width/2), 80);
	context.fillStyle = "white"
	context.font ="32px Arial";
	context.fillText("This is you", 100, 150);
	player_img.onload = () => {
		context.drawImage(player_img, 100, 200, 75, 75);
	}
	context.fillText("These are asteroids (bad)", 1000, 150);
	asteroid_img.onload = () => {
		context.drawImage(asteroid_img, 1000, 200, 80, 80);
	}
	context.fillText("These are supply crates", 190, 350);
	points_img.onload = () => {
		context.drawImage(points_img, 100, 380, 75, 75);
	}
	context.fillText("Power ups:", 100, 600);
	context.fillText("Asteroid Shield", 400, 700);
	context.fillText("Speed Boost", 700, 700);
	context.fillText("Shrink-o-matic", 1000, 700);
	shield_img.onload = () => {
		context.drawImage(shield_img, 300, 570, 75,75);
	}
	speed_img.onload = () => {
		context.drawImage(speed_img, 600, 570, 75,75);
	}
	small_img.onload = () => {
		context.drawImage(small_img, 900, 570, 75,75);
	}
	playerrightgreen_img.onload = () => {
		context.drawImage(playerrightgreen_img, 430, 570, 75,75);
	}
	playerrightred_img.onload = () => {
		context.drawImage(playerrightred_img, 730, 570, 75, 75);
	}
	playerrightblue_img.onload = () => {
		context.drawImage(playerrightblue_img, 1030, 600, 25, 25);
	}
	context.font="28px Arial"
	context.fillText("Pick up as many of these as you can and then get to the other side of the screen", 520, 500);
	context.font="24px Arial"
	context.fillText("But don't get too greedy! The more crates you pick up the faster and bigger the asteroids get", 512, 530)
	context.fillText("Use the arrow keys or WASD to move", 980, 350)
    }
    
    function draw() {
	updateSpeed()
	context.clearRect(0, 0, width, height);
	drawScore()
	
	timer += 33
	if (powertimer > 0) {
	  powertimer -= 33
	}
	else {
	  powertimer = 0;
	  speed = false;
	  shield = false;
	  small = false;
	}
	
    if (stars.length < 60) {
	    var star = {
		x : getRandomNumber(0, width),
		y : getRandomNumber(0, height),
		size : 2,
		xChange : -1,
		yChange : 0
	    };
	    stars.push(star);
	}
        context.fillStyle = "white";
        for (var i = 0; i < stars.length; i += 1) {
	    context.fillRect(stars[i].x, stars[i].y, stars[i].size, stars[i].size);
        } 
        
	if (ps.length < 20) {
            var p = {
                x : width, 
                y : getRandomNumber(0, height), 
                size : 20,
                xChange : getRandomNumber(asteroidmax, asteroidmin), 
                yChange : 0 
            };
            ps.push(p);
        }
        context.fillStyle = 'yellow';
        for (var i = 0; i < ps.length; i += 1) {
	    context.fillRect(ps[i].x, ps[i].y, ps[i].size, ps[i].size);
            context.drawImage(asteroid_img, ps[i].x, ps[i].y, ps[i].size, ps[i].size);
        }
        
    if (points.length < 3) {
	    var point = {
		x : getRandomNumber(25, width-200),
		y : getRandomNumber(25, height-25),
		size : 20
	    };
	    points.push(point);
	}
	context.fillStyle = "white";
	for (var i = 0; i < points.length; i += 1) {
	    context.drawImage(points_img, points[i].x, points[i].y, points[i].size, points[i].size);
	}
	
	if ((powers.length < 1) && (timer % 33000 === 0)) {
	  var power = {
	    x : getRandomNumber(25, width-200),
	    y : getRandomNumber(25, height-25),
	    size : 15,
	    colour : (["speed", "shield", "small"][Math.floor(Math.random() * 3)])
	  }
	  powers.push(power);
	}
	for (var i = 0; i < powers.length; i += 1) {
	  if (powers[i].colour === "speed") {
	    context.fillStyle = "red";
	    powers[i].img = speed_img;
	  }
	  else if (powers[i].colour === "shield") {
	    context.fillStyle = "green";
	    powers[i].img = shield_img;
	  }
	  else if (powers[i].colour === "small") {
	    context.fillStyle = "blue";
	    powers[i].img = small_img;
	  }
	  for (var i = 0; i < powers.length; i += 1) {
	    context.fillRect(powers[i].x, powers[i].y, powers[i].size, powers[i].size);
	    context.drawImage(powers[i].img, powers[i].x, powers[i].y, powers[i].size, powers[i].size);
	  }  
	}
	for (var i = 0; i < powers.length; i += 1) {
	  if (collides(powers[i])) {
	    powertimer = 4950
	    if (powers[i].colour === "speed") {
	      speed = true;
	      powers = [];
	    }
	    else if (powers[i].colour === "shield") {
	      shield = true;
	      powers = [];
	    }
	    else if (powers[i].colour === "small") {
	      small = true;
	      powers = [];
	    }
	  }
	}
	
	if (small) {
	  player.size = 7;
	}
	else {
	  player.size = 20;
	}
        context.fillStyle ='cyan';
        context.drawImage(player_img, player.x, player.y, player.size, player.size);
        if (player.x + player.size >= width) {
	    //hiScore();
            clearInterval(interval_id);
	    context.fillStyle = "yellow"
	    context.font = "48px Arial"
            context.fillText('YOU WIN! YOUR SCORE IS ' +score ,width/2,height/2);
	    context.textAlign="center"
	    context.fillText('PRESS ENTER TO PLAY AGAIN',width/2,(height/2)+100)
	    context.textAlign="center"
        }
        
        if (player.x <= 0) {
	    moveLeft = false;
	}
	if (player.y <= 0) {
	    moveUp = false;
	}
	if (player.y + player.size >= height) {
	    moveDown = false;
	}
	
    for (var i = 0; i < ps.length; i += 1) {
        if ((collides(ps[i])) && (shield === false)) {
			window.setInterval(explode, 100);
			for (var i = 0; i < ps.length; i += 1) {
				ps[i].xChange = 0;
			}
            clearInterval(interval_id);
			context.fillStyle = "yellow"
			context.font = "48px Arial"
            context.fillText('YOU LOSE! YOU LOST ' + score + ' SUPPLY CRATES',width/2,height/2);
			context.textAlign="center"
			context.fillText('PRESS ENTER TO PLAY AGAIN',width/2,(height/2)+100)
			context.textAlign="center"
        }
    }
        
    for (var i = 0; i < points.length; i += 1) {
	    if (collides(points[i])) {
	      context.clearRect(points[i].x, points[i].y, points[i].size, points[i].size);
	      points[i].x = getRandomNumber(25, width-200)
	      points[i].y = getRandomNumber(25, height-25)
	      score += 1
	      drawScore()
	    }
	}
	
        for (var i = 0; i < stars.length; i += 1) {
            stars[i].x = stars[i].x + stars[i].xChange;
            stars[i].y = stars[i].y + stars[i].yChange;
            if (stars[i].x <= -stars[i].size) {
                stars[i].x = width;
		stars[i].y = getRandomNumber(0, height)
            }
        }
        
    if (pause) {
	    moveDown = false;
	    moveLeft = false;
	    moveRight = false;
	    moveUp = false;
	    for (var i = 0; i < ps.length; i += 1) {
	      ps[i].xChange = 0
	    }
	    for (var i = 0; i < stars.length; i += 1) {
	      stars[i].xChange = 0
	    }
	    context.font = "32px Arial"
	    context.fillStyle = "white"
	    context.fillText("PAUSED", 1100, 45)
	}
	else {
	    for (var i = 0; i < ps.length; i += 1) {
            ps[i].x = ps[i].x + ps[i].xChange;
            ps[i].y = ps[i].y + ps[i].yChange;
	    if (ps[i].xChange === 0) {
		    ps[i].xChange = getRandomNumber(asteroidmax, asteroidmin)
		}
            if (ps[i].x <= -ps[i].size) {
                ps[i].x = width;
		ps[i].y = getRandomNumber(0, height)
		ps[i].xChange = getRandomNumber(asteroidmax, asteroidmin)	
            }
        }
	    for (var i = 0; i < stars.length; i += 1) {
	      stars[i].xChange = -1
	    }
	}
	
	
	if (moveRight && small) {
            player.x += 5.5;
	    player_img = playerrightblue_img
        }
        if (moveUp && small) {
            player.y -= 5.5;
	    player_img = playerupblue_img
        }
        if (moveDown && small) {
            player.y += 5.5;
	    player_img = playerdownblue_img
        }
        if (moveLeft && small) {
	    player.x -= 5.5;
	    player_img = playerleftblue_img
	}
	if (moveRight && moveUp && small) {
	    player_img = playeruprightblue_img
	}
	if (moveRight && moveDown && small) {
	    player_img = playerdownrightblue_img
	}
	if (moveLeft && moveUp && small) {
	    player_img = playerupleftblue_img
	}
	if (moveLeft && moveDown && small) {
	    player_img = playerdownleftblue_img
	}
	
	
	if (moveRight && speed) {
            player.x += 8;
	    player_img = playerrightred_img
        }
        if (moveUp && speed) {
            player.y -= 8;
	    player_img = playerupred_img
        }
        if (moveDown && speed) {
            player.y += 8;
	    player_img = playerdownred_img
        }
        if (moveLeft && speed) {
	    player.x -= 8;
	    player_img = playerleftred_img
	}
	if (moveRight && moveUp && speed) {
	    player_img = playeruprightred_img
	}
	if (moveRight && moveDown && speed) {
	    player_img = playerdownrightred_img
	}
	if (moveLeft && moveUp && speed) {
	    player_img = playerupleftred_img
	}
	if (moveLeft && moveDown && speed) {
	    player_img = playerdownleftred_img
	}
	
	
	if (moveRight && shield) {
	    player.x += 4.5
	    player_img = playerrightgreen_img
        }
        if (moveUp && shield) {
	    player.y -= 4.5 
	    player_img = playerupgreen_img
        }
        if (moveDown && shield) {
	    player.y += 4.5
	    player_img = playerdowngreen_img
        }
        if (moveLeft && shield) {
	    player.x -= 4.5
	    player_img = playerleftgreen_img
	}
	if (moveRight && moveUp && shield) {
	    player_img = playeruprightgreen_img
	}
	if (moveRight && moveDown && shield) {
	    player_img = playerdownrightgreen_img
	}
	if (moveLeft && moveUp && shield) {
	    player_img = playerupleftgreen_img
	}
	if (moveLeft && moveDown && shield) {
	    player_img = playerdownleftgreen_img
	}
	
	
        if (moveRight && !(shield || speed || small)) {
            player.x += 4.5;
	    player_img = playerright_img
        }
        if (moveUp && !(shield || speed || small)) {
            player.y -= 4.5;
	    player_img = playerup_img
        }
        if (moveDown && !(shield || speed || small)) {
            player.y += 4.5;
	    player_img = playerdown_img
        }
        if (moveLeft && !(shield || speed || small)) {
	    player.x -= 4.5;
	    player_img = playerleft_img
	}
	if (moveRight && moveUp && !(shield || speed || small)) {
	    player_img = playerupright_img
	}
	if (moveRight && moveDown && !(shield || speed || small)) {
	    player_img = playerdownright_img
	}
	if (moveLeft && moveUp && !(shield || speed || small)) {
	    player_img = playerupleft_img
	}
	if (moveLeft && moveDown && !(shield || speed || small)) {
	    player_img = playerdownleft_img
	}
    
    }
    
    function hiScore() {
	var url = 'store_score.py?score=' + score;
	request = new XMLHttpRequest();
	request.addEventListener('readystatechange', handle_response, false);
	request.open('GET', url, true);
	request.send(null);
    }
    
    function handle_response() {
	if (request.readyState === 4) {
	  if (request.status === 200) {
	     if (request.responseText.trim() === "success") {
	       console.log("success")
	     } else if (request.responseText.trim() === "problem") {
	       console.log("failure")
	     } else if (request.responseText.trim() === "prob") {
	       console.log("fail")
	     } else if (request.responseText.trim() === "log in") {
	       console.log("log in")
	     } else if (request.responseText.trim() === "error") {
	       console.log("error")
	     }
	  }
	}
    }
    
    function explode() {
        var minsize = 5;
		var maxsize = 15;
		var x = getRandomNumber(player.x - player.size, player.x + player.size);
		var y = getRandomNumber(player.y - player.size, player.y + player.size);
		var radius = getRandomNumber(minsize, maxsize);
		var colours = ['#FFA318', '#525252'];
		var colour = colours[Math.floor(Math.random()*colours.length)];
		
		context.beginPath();
		context.arc(x, y, radius, 0, 2*Math.PI, true);
		context.closePath();
		context.fillStyle = colour;
		context.fill() ;
    }
    
    function updateSpeed() {
	if (score < 5) {
	  asteroidmax = -12;
	  asteroidmin = -7;
	}
	else if ((score >= 10) && (score < 20)) {
	  for (var i = 0; i < ps.length; i += 1) {
	    ps[i].size = 23
	  }
	}
	else if ((score >= 5) && (score < 20)) {
	  asteroidmax = -15;
	  asteroidmin = -8;
	}
	else if ((score >= 20) && (score < 30)) {
	  asteroidmax = -17;
	  asteroidmin = -9;
	}
	else if (score >= 30) {
	  asteroidmax = -20;
	  asteroidmin = -10;
	}
    }
    
    function drawScore() {
	context.font = "16px Arial";
	context.fillStyle = "yellow";
	context.fillText("Supply Crates: " +score, 68, 20);
    }
    
    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    
    function collides(p) {
        if (player.x + player.size < p.x ||
            p.x + p.size < player.x ||
            player.y > p.y + p.size ||
            p.y > player.y + player.size) {
            return false;
        } else {
            return true;
        }
    }
    
    function activate(event) {
	var keyCode = event.keyCode;
	if (keyCode === 38 || keyCode === 87) {
	  moveUp = true;
	} else if (keyCode === 39 || keyCode === 68) {
	  moveRight = true;
	} else if (keyCode === 40 || keyCode === 83) {
	  moveDown = true;
	} else if (keyCode === 37 || keyCode === 65) {
	  moveLeft = true;
	} else if (keyCode === 32) {
	  if (pause === true) {
	    pause = false;
	  } else if (pause === false) {
	    pause = true;
	  }
	} else if (keyCode === 13) {
	  location.reload();
	}
    }
    
    function deactivate(event) {
	var keyCode = event.keyCode;
	if (keyCode === 38 || keyCode === 87) {
	  moveUp = false;
	} else if (keyCode === 39 || keyCode === 68) {
	  moveRight = false;
	} else if (keyCode === 40 || keyCode === 83) {
	  moveDown = false;
	} else if (keyCode === 37 || keyCode === 65) {
	  moveLeft = false;
	}
    }
})();