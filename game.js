// Suzdavame promenlivi
let myX = 30, myY = 500, podX = 0, podY = 570;
let zakachenLiSum = false, gorivo = 50, pipaLiZemqta = true, poziciqIgrach = "Idle", posokaPogled = 'r', indexIgrach = 0, ticks = 0;
let vragTempX = randomInteger(100) + 500, vragTempY = -25, vragX, vragY, gameOverbool = false, tajmerGorivo = 0, tajmerGorivo2 = 0;
let grassX, grasstempX = 600, paraX, paraTempX = 1000, ticksPara = 0, brTochki = 0;
let stenaX, stenaTempX = 300;
function init() {
    // Kodut tuk se izpulnqva vednuj v nachaloto 
}
function update() {
    // Kodut tuk se izpulnqva (okolo) 100 puti v sekunda
    //myX = myX + (mouseX - myX) / 10;
    //myY = myY + (mouseY - myY) / 10

    ticks++;
    ticks %= 10;
    vragX = podX + vragTempX;
    vragY = podY + vragTempY;
    grassX = podX + grasstempX;
    stenaX = podX + stenaTempX;


    paraX = podX + paraTempX;
    if(ticksPara > 8){
        ticksPara = 0;
    };

    if(paraX < -50){
        paraTempX = randomInteger(300) + 1000 - podX;
    };

    if(areColliding(vragX, vragY, 50, 40, paraX, podY - 50, 60, 80)){
        paraTempX = randomInteger(300) + 1000 - podX;
    };

    if(areColliding(myX, myY, 60, 80, paraX, podY - 50, 60, 80)){
        paraTempX = randomInteger(300) + 1000 - podX;
        brTochki++;
    };

    if(ticks == 0 || ticks == 10){
        ticksPara++;
        ticksPara %= 4;
    };



    if(gorivo > 50){
        gorivo = 50;
    };

    if(gorivo < 0){
        gorivo = 0;
    }

    if(podX >= 0){
        podX = -1;
    };
    
    if(pipaLiZemqta == true){
        if(tajmerGorivo >= 30){
            gorivo = 50;
        }else{
            tajmerGorivo++;
        }
    }else{
        tajmerGorivo = 0;
    }

    if(isKeyPressed[83] && gorivo > 0){
        gorivo--; 
        if(myY <= 292){
            myY = 288;
            podY += 4;
        }else{
            myY -= 4;
        }
    }else{
        if(myY >= 503){
            myY = 507;
            podY -= 4;
        }else{
            myY += 4;
        }
    };

    if(podY <= 570){
        podY = 571;
    };

    if(zakachenLiSum == false && gameOverbool ==  false){
        tajmerGorivo2 = 0;
        if(isKeyPressed[65] == false && isKeyPressed[68] == false){
            indexIgrach = 0;
            poziciqIgrach = "Idle";
        }

        if(isKeyPressed[65]){
            if(myX >= 397){
                myX = 400;
                podX -= 3;
            }else{
                myX += 3;
            }
            posokaPogled = 'r';
            if(ticks == 0 || ticks == 5){
                indexIgrach++;
                indexIgrach %= 3;
            }
            poziciqIgrach = "Walk";
        };
    
        if(isKeyPressed[68]){
            if(myX <= 2){
                myX = -1;
            }else{
                myX -= 3;
            }
            posokaPogled = 'l';
            if(ticks == 0 || ticks == 5){
                indexIgrach++;
                indexIgrach %= 3;
            }
            poziciqIgrach = "Walk";
        };

        if(isKeyPressed[65] && isKeyPressed[68]){
            if(posokaPogled = 'r'){
                poziciqIgrach = "Idle";
            }else{
                poziciqIgrach = "Idle";
            }
        }
    }else{
        myY -= 3;
         if(tajmerGorivo2 >= 30){
             gorivo = 50;
         }else{
            tajmerGorivo2++;
         }
    };
    
    if(areColliding(myX, myY, 60, 80, stenaX, podY - 430, 5, 500)){
        zakachenLiSum = true;
    }else{
        zakachenLiSum = false;
    };

    if(areColliding(myX, myY, 60, 80, podX, podY, 100000000, 100)){
        pipaLiZemqta = true;
    }else{
        pipaLiZemqta = false;
    }

    if(pipaLiZemqta == false){
        poziciqIgrach = "Jump";
    }

    if(zakachenLiSum == true){
        poziciqIgrach="Climb";
    }

    if((myX + 60 >= vragX && myX <= vragX + 50) && (myY + 80 >= vragY -2 && myY + 80 <= vragY + 2)){
        console.log("dead2")
        vragTempX = randomInteger(300) + 1000 - podX;
        brTochki += 2;
        gorivo = 50;
    };

    if(areColliding(vragX, vragY, 50, 40, grassX, podY - 45, 110, 60)){
        vragTempX = randomInteger(300) + 1000 - podX;
    };

    if(stenaX < -50 || areColliding(stenaX, podY - 430, 5, 500, grassX, podY - 45, 110, 60) || areColliding(stenaX, podY - 430, 5, 500, grassX + 110, podY - 95, 60, 110) || areColliding(stenaX, podY - 430, 5, 500, vragX, vragY, 50, 40)){
        stenaTempX = randomInteger(800) + 1000 - podX;
    };

}
function draw() {
    // Tuk naprogramirai kakvo da se risuva
    if(grassX < -125){
        grasstempX = randomInteger(500) + 900 - podX;
    }
    if(vragX < -50){
        vragTempX = randomInteger(300) + 1000 - podX;
    }
    if(poziciqIgrach == "Walk"){
        if(posokaPogled == 'r'){
            drawImage(marioWalk[indexIgrach], myX, myY, 60, 80);
        }
        if(posokaPogled == 'l'){
            drawImage(marioWalkFlipped[indexIgrach], myX, myY, 60, 80);
        }
    }else if(poziciqIgrach == "Idle"){
        if(posokaPogled == 'r'){
            drawImage(marioIdle, myX, myY, 60, 80);
        }
        if(posokaPogled == 'l'){
            drawImage(marioIdleFlipped, myX, myY, 60, 80);
        }
    }else if(poziciqIgrach == "Climb"){
        if(posokaPogled == 'r'){
            drawImage(marioClimb, myX, myY, 60, 80);
        }
        if(posokaPogled == 'l'){
            drawImage(marioClimbFlipped, myX, myY, 60, 80);
        }
    }else if(poziciqIgrach == "Jump"){
        if(posokaPogled == 'r'){
            drawImage(marioJump, myX, myY, 60, 80);
        }
        if(posokaPogled == 'l'){
            drawImage(marioJumpFlipped, myX, myY, 60, 80);
        }
    }
    drawImage(groundGrass, podX, podY, 100000000000000, 100);
    drawImage(box, stenaX, podY - 430, 5, 500);
    /*drawImage(paddle, 3, 3, 110, 24);
    drawImage(box, 8, 5, gorivo*2, 20);*/
    drawImage(jelly[3], vragX, vragY, 50, 40)
    drawImage(grass, grassX, podY - 45, 110, 60);
    
    if((myX + 60 >= vragX && myX <= vragX + 50) && (myY <= vragY + 40 && myY + 80 >= vragY + 2)){
        gameOverbool = true;
    };

    drawImage(coin[ticksPara], paraX, podY - 50, 60, 80);
    drawImage(cactus, grassX + 110, podY - 95, 60, 110);






    if(gameOverbool){
        drawImage(gameOver, 0, 0, 800, 600);
    };

    context.font = "20px Arial"
    context.fillStyle = "black"
    context.fillText("Points: " + brTochki, 90, 100, 400, 10);

}
function mouseup() {
    // Pri klik s lqw buton - pokaji koordinatite na mishkata
    console.log("Mouse clicked at", mouseX, mouseY);
}
function keyup(key) {
    // Pechatai koda na natisnatiq klavish
    console.log("Pressed", key);

}

