const score = document.getElementById("score");

// Creating a Canvas
const canvas = document.querySelector("canvas");
canvas.width = 720;
canvas.height = window.innerHeight;
const bg = canvas.getContext('2d');
const Ymax = canvas.height - 31;

let U = 0,
    g = -0.6,
    t = 0; // Velocity , gravity of the ball
let Yob = 200;
isPaused = false;
let z = 0;
let speed = 0.01;

let ult = 0;


let img = new Image();
img.src = 'images/powerups.png';

let spaceship = new Image();
spaceship.src = 'images/spaceship.png';

let shiprel = new Image();
shiprel.src = 'images/shipreleasing.png';

let posit = [2, 3];
let powerposit = [1, 2];
for (l = 0; l < 98; l++) {
    choice = Math.floor(Math.random() * 9) + 1;
    posit.push(choice);
    powerposit.push(Math.floor(Math.random() * 14) + 1);
}

let BallCovered;
let MaxTravelled = 1000,
    BallTravelled = 1000,
    PrevBallTravelled = 0;

if (localStorage.getItem("MaxTravelled"))
    MaxTravelled = localStorage.getItem("MaxTravelled");

//Class for the ball
class Ball {
    constructor(Y, color, Radius) {
        this.Y = Y;
        this.color = color;
        this.Radius = Radius;
    }

    get Yaxis() {
        return this.Y;
    }
    set Yaxis(Y) {
        this.Y = Y;
    }

    get Rads() {
        return this.Radius;
    }

    set Rads(Rads) {
        this.Radius = Rads;
    }

    set colour(color) {
        this.color = color;
    }
    get colour() {
        return this.color;
    }


}
ball = new Ball(Ymax - 31, "cyan", 15);

//Press Space to make that circle jump
let spacebar_pressed = false;
let time = 0;
window.onkeydown = function(event) {
    if (event.keyCode == 32) {
        this.console.log("down");
        spacebar_pressed = true;
        t = 0;
    };

    if (event.keyCode == 80) {
        isPaused = true;
        z = 0;
    }

    if (event.keyCode == 82) {
        if (z == 0) {
            isPaused = false;
            setTimeout(animateBG, 2000);
            resume();
        }
    }
};
window.onkeyup = function() {
    if (event.keyCode == 32) {
        spacebar_pressed = false;
        this.console.log("up");
    };
};

i = 0;
x = 0;
Yimg = -200;
move = 1;
temp = 0;

intro();

function intro() {
    if (x < 10)
        requestAnimationFrame(intro);

    else
        animateBG();

    bg.clearRect(0, 0, innerWidth, innerHeight);
    if (Yimg < canvas.height / 2 - 150)
        bg.drawImage(spaceship, 0, 0, 713, 350, 220, Yimg, 280, 150);

    else {
        console.log(" inside");
        move = 0;
        temp++;
        bg.drawImage(shiprel, 5, 27, 630, 592, 220, canvas.height / 2 - 100, 280, 250);
        if (temp > 200)
            move = -1;
    }
    if (temp > 50) {
        bg.beginPath();
        bg.arc(360, 350 + temp * 1.5, 15, 0, 2 * Math.PI, true);
        bg.fillStyle = "cyan";
        bg.fill();
    }
    Yimg += move;
    x += 0.01;
}

k = 0;

//The Main Canvas Function
function animateBG() {

    if (!(isPaused))
        requestAnimationFrame(animateBG);
    bg.clearRect(0, 0, innerWidth, innerHeight);
    i += speed;

    // Draws the line for the prev travelled
    if (PrevBallTravelled != 0) {
        bg.beginPath();
        bg.lineWidth = 5;
        bg.moveTo(0, PrevBallTravelled + Yob - 200);
        bg.lineTo(110, PrevBallTravelled + Yob - 200);
        bg.moveTo(130, PrevBallTravelled + Yob - 200);
        bg.lineTo(230, PrevBallTravelled + Yob - 200);
        bg.moveTo(250, PrevBallTravelled + Yob - 200);
        bg.lineTo(350, PrevBallTravelled + Yob - 200);
        bg.moveTo(370, PrevBallTravelled + Yob - 200);
        bg.lineTo(470, PrevBallTravelled + Yob - 200);
        bg.moveTo(490, PrevBallTravelled + Yob - 200);
        bg.lineTo(590, PrevBallTravelled + Yob - 200);
        bg.moveTo(610, PrevBallTravelled + Yob - 200);
        bg.lineTo(720, PrevBallTravelled + Yob - 200);
        bg.strokeStyle = "rgba(255,255,255,1)";
        bg.stroke();
    }

    
    //Draws the first 9 Obstacles onto the canvas
    Obstacle1(Yob, i % (2 * Math.PI), 120);
    ColourChanger(Yob, i);
    //UltimatePP(Yob ,i );
    ColourChanger(Yob - 280, i);
    Obstacle2(Yob - 450, -((i * 100) % (4 * 180)));
    RadiusDec(Yob - 520);
    Obstacle3(Yob - 800, i / 1.2, 60, 100);
    Clockwise(Yob - 900);
    ColourChanger(Yob - 1100,i);
    Obstacle4(Yob - 1300, i % (2 * Math.PI));
    ColourChanger(Yob - 1500,i);
    AntiClockwise(Yob - 1900);
    Obstacle5(Yob - 1900, i % (2 * Math.PI));
    SpeedDec(Yob - 2300);
    Obstacle6(Yob - 2700, i % (2 * Math.PI), 120); //800
    UltimatePP(Yob - 3200, i);
    RadiusInc(Yob - 2700);
    Obstacle7(Yob - 3400, (i * 4) % 40); // 700
    Obstacle8(Yob - 3800, i % (2 * Math.PI), 120);
    Obstacle1(Yob - 4300, i % (2 * Math.PI), 120);
    Obstacle6(Yob - 4300, i % (2 * Math.PI), 120);
    RadiusDec(Yob - 4300);

    //Draws the Obstacle randomly onto the canvas
    for (k = 0; k < 50; k++) {
        choice = posit[k];
        switch (choice) {
            case 1:
                powerups(Yob - 5000 - k * 600 + 300, i, powerposit[2 * k + 1]);
                Obstacle1(Yob - 5000 - k * 600, i % (2 * Math.PI), 120);
                powerups(Yob - 5000 - k * 600, i, powerposit[2 * k + 2]);
                break;

            case 2:
                powerups(Yob - 5000 - k * 600 + 200, i, powerposit[2 * k + 1]);
                Obstacle2(Yob - 5000 - k * 600, -((i * 100) % (4 * 180)));
                powerups(Yob - 5000 - k * 600 - 200, i, powerposit[2 * k + 2]);
                break;

            case 3:
                powerups(Yob - 5000 - k * 600 + 300, i, powerposit[2 * k + 1]);
                Obstacle3(Yob - 5000 - k * 600, i / 1.2, 60, 100);
                powerups(Yob - 5000 - k * 600 - 300, i, powerposit[2 * k + 2]);
                break;

            case 4:
                powerups(Yob - 5000 - k * 600 + 300, i, powerposit[2 * k + 1]);
                Obstacle4(Yob - 5000 - k * 600, i % (2 * Math.PI));
                powerups(Yob - 5000 - k * 600, i, powerposit[2 * k + 2]);
                break;

            case 5:
                Obstacle5(Yob - 5000 - k * 600, i % (2 * Math.PI));
                powerups(Yob - 5000 - k * 600, i, powerposit[2 * k + 2]);
                break;

            case 6:
                Obstacle6(Yob - 5000 - k * 600, i % (2 * Math.PI), 120);
                powerups(Yob - 5000 - k * 600, i, powerposit[2 * k + 2]);
                break;

            case 7:
                Obstacle7(Yob - 5000 - k * 600, (i * 4) % 40);
                UltimatePP(Yob - 5000 - k * 600 + 200, i, 6);
                break;

            case 8:
                Obstacle8(Yob - 5000 - k * 600, i % (2 * Math.PI), 120);
                powerups(Yob - 5000 - k * 600, i, powerposit[2 * k + 1]);
                break;

            case 9:
                Obstacle1(Yob - 5000 - k * 600, i % (2 * Math.PI), 120);
                Obstacle6(Yob - 5000 - k * 600, i % (2 * Math.PI), 120);
                powerups(Yob - 5000 - k * 600, i, powerposit[2 * k + 1]);
                break;

        }
    }

    //Draws the ball onto the canvas
    bg.beginPath();
    bg.arc(360, ball.Y, ball.Radius, 0, 2 * Math.PI, true);
    bg.fillStyle = ball.color;
    bg.fill();

    // For bouncing the ball
    if (spacebar_pressed) {
        U = 10;
        spacebar_pressed = false;
    }

    if (ball.Y >= Ymax - 31) {
        ball.Y = Ymax - 50;
        U = 0;
        t = 0;

        if (Yob > 210)
                Gameover();  

    } else {
        ball.Y = ball.Y - U * t - (0.5) * g * t * t;
        t = 0.3;
        U = U + g * t;
        //draws the danger bottom line of the game
        if(Yob > 210)
        {
        bg.beginPath();
        bg.lineWidth=5;
        bg.moveTo(0,Ymax - 31 + ball.Radius );
        bg.lineTo(720,Ymax - 31 + ball.Radius);
        bg.strokeStyle = "#CA0B00" ;
        bg.stroke();
        }
    }

    if (ball.Y < Ymax - 200 && U > 0) {
        Yob += 1.5;
        ball.Y += 1.5;
    }

    //    Score
    if (BallTravelled > ball.Y - Yob + 200)
        BallTravelled = ball.Y - Yob + 200;

    BallCovered = ball.Y - Yob + 200;

    bg.beginPath();
    bg.font = "50px Comic Sans MS";
    bg.fillStyle = "red";
    bg.fillText(" " + Math.floor((Ymax + 31 - BallTravelled) / 400), 650, 50);
    shadow(U, ball.Y, ball.Radius);
    bg.globalAlpha = 1;

    if (MaxTravelled > BallTravelled)
        MaxTravelled = BallTravelled;

    score.innerHTML = Math.floor((Ymax + 31 - MaxTravelled) / 400).toString();

    window.localStorage.setItem("MaxTravelled", MaxTravelled);                           // Stores the highscore in local storage

}



function powerups(Y, i, choice) {
    switch (choice) {
        case 1:
            ColourChanger(Y, i);
            break;

        case 2:
            SpeedInc(Y);
            break;

        case 3:
            SpeedDec(Y);
            break;

        case 4:
            RadiusInc(Y);
            break;

        case 5:
            RadiusDec(Y);
            break;

        case 6:
            UltimatePP(Y);
            break;
        case 7:
            UltimatePP(Y);
            break;

        case 8:
            Normal(Y);
            break;

        case 9:
            Clockwise(Y);
            break;

        case 10:
            AntiClockwise(Y);
            break;

        case 11:
            ColourChanger(Y, i);
            break;

        default:
            Normal(Y);
            break;
    }
}


function shadow(U, Y, R) {
    for (var j = 0; j < 2; j++) {
        Y += U + 3;

        bg.beginPath();
        bg.arc(360, Y, R, 0, 2 * Math.PI, true);
        a = 0.4 - j * 0.2;
        if (ball.color == "cyan")
            bg.fillStyle = "rgba(0,255,255," + a + ")";
        else if (ball.color == "yellow")
            bg.fillStyle = "rgba(255,255,0," + a + ")";
        else if (ball.color == "chartreuse")
            bg.fillStyle = "rgba(127,255,0," + a + ")";
        else
            bg.fillStyle = "rgba(153,50,204," + a + ")";

        bg.fill();

    }
}

function resume() {

    if (z < 2.913)
        requestAnimationFrame(resume);

    bg.beginPath();
    bg.fillStyle = "cyan";
    bg.clearRect(550, 150, 50, 50);

    z += 0.01;

    bg.beginPath();
    bg.font = "50px Comic Sans MS";
    bg.fillStyle = "red";
    if (z % 3 > 0.973)
        if (z % 3 > 2 * 0.973)
            bg.fillText("1", 550, 200);
        else
            bg.fillText("2", 550, 200);
    else
        bg.fillText("3", 550, 200);

}


function Obstacle1(Y, i, Radius) {
    if (Y < 2000 && Y > -2000) {
        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(360, Y, Radius, i, i + Math.PI / 2, false);
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs1(Y, i, Radius, "cyan");

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(360, Y, Radius, i + Math.PI / 2, i + 2 * Math.PI / 2, false);
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        CheckCollisionObs1(Y, (i + Math.PI / 2) % (2 * Math.PI), Radius, "chartreuse");

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(360, Y, Radius, i + 2 * Math.PI / 2, i + 3 * Math.PI / 2, false);
        bg.strokeStyle = "yellow";
        bg.stroke();
        CheckCollisionObs1(Y, (i + Math.PI) % (2 * Math.PI), Radius, "yellow");

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(360, Y, Radius, i + 3 * Math.PI / 2, i, false);
        bg.strokeStyle = "darkorchid";
        bg.stroke();
        CheckCollisionObs1(Y, (i + 3 * Math.PI / 2) % (2 * Math.PI), Radius, "darkorchid");
    }
}

function CheckCollisionObs1(Y, j, Radius, ColourToCheck) {
    if (j >= 0 && j <= Math.PI / 2)
        if ((ball.Y + ball.Radius > Y + Radius + 12 && ball.Y - ball.Radius < Y + Radius + 12) ||
            (ball.Y + ball.Radius > Y + Radius - 12 && ball.Y - ball.Radius < Y + Radius - 12))
            if (ball.color != ColourToCheck && ult == 0)
                Gameover();

    if (j > Math.PI && j < 3 * Math.PI / 2)
        if (ball.Y > Y - Radius - 25 && ball.Y < Y - Radius + 25)
            if (ball.color != ColourToCheck && ult == 0)
                Gameover();
}

function Obstacle2(Y, i) {
    if (Y < 2000 && Y > -2000) {
        bg.beginPath();
        bg.fillStyle = "cyan";
        bg.fillRect(i - 720, Y, 180, 30);
        CheckCollisionObs2(Y, i - 720, "cyan");

        bg.beginPath();
        bg.fillStyle = "chartreuse";
        bg.fillRect(i - 540, Y, 180, 30);
        CheckCollisionObs2(Y, i - 540, "chartreuse");

        bg.beginPath();
        bg.fillStyle = "yellow";
        bg.fillRect(i - 360, Y, 180, 30);
        CheckCollisionObs2(Y, i - 360, "yellow");

        bg.beginPath();
        bg.fillStyle = "darkorchid";
        bg.fillRect(i - 180, Y, 180, 30);
        CheckCollisionObs2(Y, i - 180, "darkorchid");
        bg.beginPath();
        bg.fillStyle = "cyan";
        bg.fillRect(i, Y, 180, 30);
        CheckCollisionObs2(Y, i, "cyan");

        bg.beginPath();
        bg.fillStyle = "chartreuse";
        bg.fillRect(i + 180, Y, 180, 30);
        CheckCollisionObs2(Y, i + 180, "chartreuse");

        bg.beginPath();
        bg.fillStyle = "yellow";
        bg.fillRect(i + 360, Y, 180, 30);
        CheckCollisionObs2(Y, i + 360, "yellow");

        bg.beginPath();
        bg.fillStyle = "darkorchid";
        bg.fillRect(i + 540, Y, 180, 30);
        CheckCollisionObs2(Y, i + 540, "darkorchid");

        bg.beginPath();
        bg.fillStyle = "cyan";
        bg.fillRect(i + 4 * 180, Y, 180, 30);
        CheckCollisionObs2(Y, i + 4 * 180, "cyan");

        bg.beginPath();
        bg.fillStyle = "chartreuse";
        bg.fillRect(i + 5 * 180, Y, 180, 30);
        CheckCollisionObs2(Y, i + 5 * 180, "chartreuse");

        bg.beginPath();
        bg.fillStyle = "yellow";
        bg.fillRect(i + 6 * 180, Y, 180, 30);
        CheckCollisionObs2(Y, i + 6 * 180, "yellow");

        bg.beginPath();
        bg.fillStyle = "darkorchid";
        bg.fillRect(i + 7 * 180, Y, 180, 30);
        CheckCollisionObs2(Y, i + 7 * 180, "darkorchid");
    }

}

function CheckCollisionObs2(Y, j, ColourToCheck) {
    if (j > 180 && j < 360)
        if (ball.Y - ball.Radius < Y + 20 && ball.Y + ball.Radius > Y + 20 || ball.Y - ball.Radius > Y - 20 && ball.Y + ball.Radius < Y)
            if (ball.color != ColourToCheck && ult == 0)
                Gameover();
}

function Obstacle3(Y, i, Radius1, Radius2) {
    if (Y > -2000 && Y < 2000) {
        lineWidth = 12;
        bg.beginPath();
        bg.lineWidth = lineWidth;
        bg.arc(360 - Radius1 - lineWidth / 2, Y, Radius1, i, i + Math.PI / 2, false);
        bg.strokeStyle = "cyan";
        bg.stroke();

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(360 + Radius2 + lineWidth / 2, Y, Radius2, -i, -i + Math.PI / 2, false);
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        CheckCollisionObs3(Y, -i, Radius2, "chartreuse");
        // CheckCollisionObs1(Y,i,"cyan");

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(360 - Radius1 - lineWidth / 2, Y, Radius1, i + Math.PI / 2, i + 2 * Math.PI / 2, false);
        bg.strokeStyle = "chartreuse";
        bg.stroke();

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(360 + Radius2 + lineWidth / 2, Y, Radius2, -i + Math.PI / 2, -i + 2 * Math.PI / 2, false);
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs3(Y, 2 * Math.PI - i + Math.PI / 2, Radius2, "cyan");
        // CheckCollisionObs1(Y,(i+Math.PI/2)%(2*Math.PI),"chartreuse");


        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(360 - Radius1 - lineWidth / 2, Y, Radius1, i + 2 * Math.PI / 2, i + 3 * Math.PI / 2, false);
        bg.strokeStyle = "yellow";
        bg.stroke();

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(360 + Radius2 + lineWidth / 2, Y, Radius2, -i + 2 * Math.PI / 2, -i + 3 * Math.PI / 2, false);
        bg.strokeStyle = "darkorchid";
        bg.stroke();
        CheckCollisionObs3(Y, -i + 2 * Math.PI / 2, Radius2, "darkorchid");
        //CheckCollisionObs1(Y,(i+Math.PI)%(2*Math.PI),"yellow");

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(360 - Radius1 - lineWidth / 2, Y, Radius1, i + 3 * Math.PI / 2, i, false);
        bg.strokeStyle = "darkorchid";
        bg.stroke();

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(360 + Radius2 + lineWidth / 2, Y, Radius2, -i + 3 * Math.PI / 2, -i, false);
        bg.strokeStyle = "yellow";
        bg.stroke();
        CheckCollisionObs3(Y, -i + 3 * Math.PI / 2, Radius2, "yellow");
        // CheckCollisionObs1(Y,(i+3*Math.PI/2)%(2*Math.PI),"darkorchid");
    }
}

function CheckCollisionObs3(Y, j, Radius, ColourToCheck) {

    if (360 + Radius + Radius * Math.cos(j) <= 360 + ball.Radius - 10 || ((360 + Radius + Radius * Math.cos(j + Math.PI / 2) <= 360 + ball.Radius + 5) && (Y + Radius * Math.sin(j + Math.PI / 2) < Y + 5))) {

        if (Y + Radius * Math.sin(j) > ball.Y && ball.Y < Y + Radius * (1 / Math.sqrt(5)) && ball.Y > Y - Radius * (1 / Math.sqrt(5))) //&& ball.Y < Y + Radius && ball.Y > Y - Radius*Math.cos(Math.PI/4))
        {

            if (ball.color != ColourToCheck && ult == 0)
                Gameover();
        }
    }
}

function Obstacle4(Y, i) {
    if (Y > -2000 && Y < 2000) {
        R = 120;

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(240, Y);
        bg.lineTo(240 + R * Math.cos(i), Y + R * Math.sin(i));
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs4(240 + R * Math.cos(i), Y + R * Math.sin(i), "cyan");

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(480, Y);
        bg.lineTo(480 + R * Math.cos(-i), Y + R * Math.sin(-i));
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        //bg.arc(240 + i,Y + Math.sqrt(R*R - i*i),15,0,2*Math.PI,true);
        //bg.fillStyle = "cyan";
        //bg.fill();
        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(240, Y);
        bg.lineTo(240 + R * Math.cos(i + Math.PI / 2), Y + R * Math.sin(i + Math.PI / 2));
        bg.strokeStyle = "yellow";
        bg.stroke();
        CheckCollisionObs4(240 + R * Math.cos(i + Math.PI / 2), Y + R * Math.sin(i + Math.PI / 2), "yellow");

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(480, Y);
        bg.lineTo(480 + R * Math.cos(-i + Math.PI / 2), Y + R * Math.sin(-i + Math.PI / 2));
        bg.strokeStyle = "yellow";
        bg.stroke();


        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(240, Y);
        bg.lineTo(240 + R * Math.cos(i + Math.PI), Y + R * Math.sin(i + Math.PI));
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        CheckCollisionObs4(240 + R * Math.cos(i + Math.PI), Y + R * Math.sin(i + Math.PI), "chartreuse");

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(480, Y);
        bg.lineTo(480 + R * Math.cos(-i + Math.PI), Y + R * Math.sin(-i + Math.PI));
        bg.strokeStyle = "cyan";
        bg.stroke();



        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(240, Y);
        bg.lineTo(240 + R * Math.cos(i - Math.PI / 2), Y + R * Math.sin(i - Math.PI / 2));
        bg.strokeStyle = "darkorchid";
        bg.stroke();
        CheckCollisionObs4(240 + R * Math.cos(i - Math.PI / 2), Y + R * Math.sin(i - Math.PI / 2), "darkorchid");

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(480, Y);
        bg.lineTo(480 + R * Math.cos(-i - Math.PI / 2), Y + R * Math.sin(-i - Math.PI / 2));
        bg.strokeStyle = "darkorchid";
        bg.stroke();

        bg.beginPath();
        bg.arc(240, Y, 15, 0, 2 * Math.PI, true);
        bg.fillStyle = "pink";
        bg.fill();

        bg.beginPath();
        bg.arc(480, Y, 15, 0, 2 * Math.PI, true);
        bg.fillStyle = "pink";
        bg.fill();
    }
}

function CheckCollisionObs4(X, Y, ColourToCheck) {
    if (X <= 360 && X >= 360 - (ball.Radius + 1)) {
        if (Y >= ball.Y - ball.Radius && Y <= ball.Y + ball.Radius)
            if (ball.color != ColourToCheck && ult == 0)
                Gameover();
    }
}

function Obstacle5(Y, i) {
    if (Y > -2000 && Y < 2000) {
        Obstacle1(Y, i + Math.PI / 4, 160);

        Radius = 100;
        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(360, Y, Radius, -i + Math.PI / 4, -i + Math.PI / 4 + Math.PI / 2, false);
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs1(Y, (-i + Math.PI / 4) % (2 * Math.PI), Radius, "cyan");

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(360, Y, Radius, -i + Math.PI / 4 + Math.PI / 2, -i + Math.PI / 4 + 2 * Math.PI / 2, false);
        bg.strokeStyle = "darkorchid";
        bg.stroke();
        CheckCollisionObs1(Y, (-i + Math.PI / 4 + Math.PI / 2) % (2 * Math.PI), Radius, "darkorchid");

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(360, Y, Radius, -i + Math.PI / 4 + 2 * Math.PI / 2, -i + Math.PI / 4 + 3 * Math.PI / 2, false);
        bg.strokeStyle = "yellow";
        bg.stroke();
        CheckCollisionObs1(Y, (-i + Math.PI / 4 + 2 * Math.PI / 2) % (2 * Math.PI), Radius, "yellow");

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(360, Y, Radius, -i + Math.PI / 4 + 3 * Math.PI / 2, -i + Math.PI / 4, false);
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        CheckCollisionObs1(Y, (-i + Math.PI / 4 + 3 * Math.PI / 2) % (2 * Math.PI), Radius, "chartreuse");
    }
}

function Obstacle6(Y, i, Radius) {
    if (Y > -2000 & Y < 2000) {
        Obstacle6_Arc(Y, i, Radius, "cyan", 30);
        Obstacle6_Arc(Y, i + Math.PI / 2, Radius, "chartreuse", 30);
        Obstacle6_Arc(Y, i + Math.PI, Radius, "yellow", 30);
        Obstacle6_Arc(Y, i - Math.PI / 2, Radius, "darkorchid", 30);
    }
}


function Obstacle6_Arc(Y, i, Radius, Colour, pos) {
    if (Y > -2000 && Y < 2000) {
        bg.beginPath();
        bg.arc(360 + Radius * Math.cos(i), Y + Radius * Math.sin(i), 20, 0, 2 * Math.PI, true);
        Check2CircleColl(360 + Radius * Math.cos(i), Y + Radius * Math.sin(i), 20, 360, ball.Y, ball.Radius, Colour);

        Radius += pos;
        bg.moveTo(360 + Radius * Math.cos(i + Math.PI / 8), Y + Radius * Math.sin(i + Math.PI / 8));
        bg.arc(360 + Radius * Math.cos(i + Math.PI / 8), Y + Radius * Math.sin(i + Math.PI / 8), 20, 0, 2 * Math.PI, true);
        Check2CircleColl(360 + Radius * Math.cos(i + Math.PI / 8), Y + Radius * Math.sin(i + Math.PI / 8), 20, 360, ball.Y, ball.Radius, Colour);


        Radius += pos;
        bg.moveTo(360 + Radius * Math.cos(i + Math.PI / 4), Y + Radius * Math.sin(i + Math.PI / 4));
        bg.arc(360 + Radius * Math.cos(i + Math.PI / 4), Y + Radius * Math.sin(i + Math.PI / 4), 20, 0, 2 * Math.PI, true);
        Check2CircleColl(360 + Radius * Math.cos(i + Math.PI / 4), Y + Radius * Math.sin(i + Math.PI / 4), 20, 360, ball.Y, ball.Radius, Colour);

        Radius += pos;
        bg.moveTo(360 + Radius * Math.cos(i + 3 * Math.PI / 8), Y + Radius * Math.sin(i + 3 * Math.PI / 8));
        bg.arc(360 + Radius * Math.cos(i + 3 * Math.PI / 8), Y + Radius * Math.sin(i + 3 * Math.PI / 8), 20, 0, 2 * Math.PI, true);
        Check2CircleColl(360 + Radius * Math.cos(i + 3 * Math.PI / 8), Y + Radius * Math.sin(i + 3 * Math.PI / 8), 20, 360, ball.Y, ball.Radius, Colour);

        bg.fillStyle = Colour;
        bg.fill();
    }
}

function Check2CircleColl(X1, Y1, R1, X2, Y2, R2, ColourToCheck) //Obs6 Collision checker
{

    if (Math.sqrt((X2 - X1) * (X2 - X1) + (Y2 - Y1) * (Y2 - Y1)) < R1 + R2)
        if (ball.color != ColourToCheck && ult == 0)
            Gameover();
}

function Obstacle7(Y, i) {
    if (Y > -2000 && Y < 2000) {
        bg.beginPath();
        bg.lineWidth = 40;
        bg.moveTo(185, Y + 260);
        bg.lineTo(565, Y + 270);
        bg.moveTo(225, Y + 310);
        bg.lineTo(395, Y);
        bg.moveTo(315, Y + 10);
        bg.lineTo(525, Y + 310);



        if (i > 10)
            if (i > 20)
                if (i > 30) {
                    bg.strokeStyle = "darkorchid";
                    colorrr = "darkorchid";
                }
        else {
            bg.strokeStyle = "yellow";
            colorrr = "yellow";
        } else {
            bg.strokeStyle = "chartreuse";
            colorrr = "chartreuse";
        } else {
            bg.strokeStyle = "cyan";
            colorrr = "cyan";
        }
        bg.stroke();

        if (ball.Y - ball.Radius < Y + 285 && ball.Y + ball.Radius > Y + 245 || Check2CircleColl(360, Y + 63.82, 60, 360, ball.Y, ball.Radius, colorrr))

            if (ball.color != colorrr && ult == 0)
                Gameover();

    }
}

function Obstacle8(Y, i, Radius) {
    if (Y > -2000 && Y < 2000) {
        if (i > Math.PI)
            Radius = Radius + 10 * (2 * Math.PI - i);

        else
            Radius = Radius + 10 * i;

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(360, Y, Radius, i, i + Math.PI / 2, false);
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs1(Y, i, Radius, "cyan");

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(360, Y, Radius, i + Math.PI / 2, i + 2 * Math.PI / 2, false);
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        CheckCollisionObs1(Y, (i + Math.PI / 2) % (2 * Math.PI), Radius, "chartreuse");

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(360, Y, Radius, i + 2 * Math.PI / 2, i + 3 * Math.PI / 2, false);
        bg.strokeStyle = "yellow";
        bg.stroke();
        CheckCollisionObs1(Y, (i + Math.PI) % (2 * Math.PI), Radius, "yellow");

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(360, Y, Radius, i + 3 * Math.PI / 2, i, false);
        bg.strokeStyle = "darkorchid";
        bg.stroke();
        CheckCollisionObs1(Y, (i + 3 * Math.PI / 2) % (2 * Math.PI), Radius, "darkorchid");
    }
}

function ColourChanger(Y, i) {
    if (Y > -2000 && Y < 720) {
        if (ball.Y > Y || 1)

        {
            if (BallTravelled > Y - Yob + 200)
                bg.drawImage(img, 26, 58, 72, 74, 360 - 25, Y - 25, 50, 50);



            if ((i % 0.4) > 0.1)
                if ((i % 0.4) > 0.2)
                    if ((i % 0.4) > 0.3)
                        colorr = "darkorchid";
                    else
                        colorr = "yellow";
            else
                colorr = "chartreuse";
            else
                colorr = "cyan";



            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius && BallCovered == BallTravelled) {
               if(ball.color != colorr)
                ball.color = colorr;

                else
                {
                    switch(colorr)
                    {
                        case "cyan": ball.color = "darkorchid";
                                     break;
                        case "yellow": ball.color = "chartreuse";
                                     break;
                        case "chartreuse": ball.color = "yellow";
                                     break;
                        case "darkorchid": ball.color = "cyan";
                                     break;                          

                    }
                }
               
            }

        }
    }
}

function UltimatePP(Y, i) {
    if (Y > -2000 && Y < 2000) {


        if (ball.Y > Y && ult == 0 && BallTravelled > Y - Yob + 200) {
            bg.drawImage(img, 691, 56, 97, 97, 360 - 25, Y - 25, 50, 50);
            if (ball.Y - ball.Radius < Y && ball.Y + ball.Radius > Y) {
                ult = 1;
                if (ball.Y + ball.Radius > Y - 25)
                    time = 0;
            }
        }

        if (Y > ball.Y + ball.Radius && ult == 1) {
            if ((i % 0.4) > 0.1)
                if ((i % 0.4) > 0.2)
                    if ((i % 0.4) > 0.3)
                        ball.color = "darkorchid";
                    else
                        ball.color = "yellow";
            else
                ball.color = "chartreuse";
            else
                ball.color = "cyan";
        }

        if (time > 10)
            ult = 0;

        if (ult == 1) {
            bg.beginPath();
            if (time > 4)
                if (time > 6) {
                    if (time > 8)
                        bg.fillText("1", 650, 350);
                    else
                        bg.fillText("2", 650, 350);
                }

            else
                bg.fillText("3", 650, 350);

            bg.fillStyle = "lightred";
            bg.fill();
        }

        console.log(time);
        time += 0.01;
    }


}


function RadiusInc(Y) {
    if (Y > -2000 && Y < 2000) {
        if (ball.Radius != 25 && ball.Y > Y && BallTravelled > Y - Yob + 200)
            bg.drawImage(img, 164, 61, 82, 77, 360 - 25, Y - 25, 50, 50);
        if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius)
            ball.Radius = 25;
    }
}

function RadiusDec(Y) {
    if (Y > -2000 && Y < 2000) {
        if (ball.Radius != 10 && ball.Y > Y && BallTravelled > Y - Yob + 200)
            bg.drawImage(img, 561, 62, 85, 87, 360 - 25, Y - 25, 50, 50);
        if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius)
            ball.Radius = 10;
    }
}

function SpeedInc(Y) {
    if (Y > -2000 && Y < 2000) {
        if (Math.abs(speed) != 0.02 && BallTravelled > Y - Yob + 200) {
            bg.drawImage(img, 314, 62, 78, 77, 360 - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius)
                speed = 0.02;
        }
    }
}

function SpeedDec(Y) {
    if (Y > -2000 && Y < 2000) {
        if (Math.abs(speed) != 0.007 && BallTravelled > Y - Yob + 200) {
            bg.drawImage(img, 440, 67, 76, 76, 360 - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius)
                speed = 0.007;
        }
    }
}

function Clockwise(Y) {
    if (Y > -2000 && Y < 2000) {
        if (speed > 0 && BallTravelled > Y - Yob + 200) {
            bg.drawImage(img, 163, 202, 107, 85, 360 - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) {

                speed = -speed;
            }
        }
    }
}

function AntiClockwise(Y) {
    if (Y < 2000 && Y > -2000) {
        if (speed < 0 && BallTravelled > Y - Yob + 200) {
            bg.drawImage(img, 33, 208, 96, 78, 360 - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) {
                speed = -speed;
            }
        }
    }
}

function Normal(Y) {
    if (Y < 650 && Y > -2000) {
        if (speed != 0.01 || ball.Radius != 15 && BallTravelled > Y - Yob + 200) {
            bg.drawImage(img, 317, 201, 87, 85, 360 - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) {
                speed = 0.01;
                ball.Radius = 15;
            }
        }
    }
}


function Gameover() {
    alert("Game over ");
    U = 0;
    t = 0;
    ball.Y = Ymax - 31;
    Yob = 200;
    ult = 0;
    ball.Radius = 15;
    speed = 0.01;
    i = 0;
    PrevBallTravelled = BallTravelled;
    BallTravelled = 1000;
    k = 0;
    changed = 0;
}
