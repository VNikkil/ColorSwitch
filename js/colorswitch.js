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
        this.X = 360;
        this.Y = Y;
        this.color = color;
        this.Radius = Radius;
        this.ult = 0;
        this.speed = 0.01;
        this.BallTravelled = 1000;
        this.BallCovered = 1000;
        this.Yob;
        this.time = 0;
    }

    get Yaxis() {
        return this.Y;
    }
    set Yaxis(Y) {
        this.Y = Y;
    }

    get tim() {
        return this.time;
    }
    set tim(time) {
        this.time = time;
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

    get Ults() {
        return this.ult;
    }

    set Ults(ult) {
        this.ult = ult;
    }

    get spd() {
        return this.speed;
    }

    set spd(spd) {
        this.speed = spd;
    }

    get Bt() {
        return this.BallTravelled;
    }

    set Bt(Bt) {
        this.BallTravelled = Bt;
    }

    get BC() {
        return this.BallCovered;
    }

    set BC(BC) {
        this.BallCovered = BC;
    }

    get yobb() {
        return this.Yob;
    }

    set yobb(yobb) {
        this.Yob = yobb;
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
    i = parseFloat(i) + parseFloat(ball.speed);
   
    ball.Yob = Yob;

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
    Obstacle1(Yob, i % (2 * Math.PI), 120,bg,ball);
    ColourChanger(Yob, i,bg,ball);
    //UltimatePP(Yob ,i );
    ColourChanger(Yob - 280, i,bg,ball);
    Obstacle2(Yob - 450, -((i * 100) % (4 * 180)),bg,ball);
    RadiusDec(Yob - 520,bg,ball);
   //UltimatePP(Yob - 520,i,bg,ball);
    Obstacle3(Yob - 800, i / 1.2, 60, 100,bg,ball);
    Clockwise(Yob - 900,bg,ball);
    //UltimatePP(Yob - 900);
    ColourChanger(Yob - 1100,i,bg,ball);
    //UltimatePP(Yob - 1200,i,bg,ball);
    Obstacle4(Yob - 1300, i % (2 * Math.PI),bg,ball);
    ColourChanger(Yob - 1500,i,bg,ball);
    AntiClockwise(Yob - 1900,bg,ball);
    //UltimatePP(Yob - 1900,i,bg,ball);
    //UltimatePP(Yob - 2300,i,bg,ball);
    Obstacle5(Yob - 1900, i % (2 * Math.PI),bg,ball);
    SpeedDec(Yob - 2300,bg,ball);
    //UltimatePP(Yob - 520);
    Obstacle6(Yob - 2700, i % (2 * Math.PI), 120,bg,ball); //800
    UltimatePP(Yob - 3200, i,bg,ball);
    RadiusInc(Yob - 2700,bg,ball);
    Obstacle7(Yob - 3400, (i * 4) % 40,bg,ball); // 700
    Obstacle8(Yob - 3800, i % (2 * Math.PI), 120,bg,ball);
    Obstacle1(Yob - 4300, i % (2 * Math.PI), 120,bg,ball);
    Obstacle6(Yob - 4300, i % (2 * Math.PI), 120,bg,ball);
    RadiusDec(Yob - 4300,bg,ball);

    //Draws the Obstacle randomly onto the canvas
    for (k = 0; k < 50; k++) {
        choice = posit[k];
        switch (choice) {
            case 1:
                powerups(Yob - 5000 - k * 600 + 300, i, powerposit[2 * k + 1],bg,ball);
                Obstacle1(Yob - 5000 - k * 600, i % (2 * Math.PI), 120,bg,ball);
                powerups(Yob - 5000 - k * 600, i, powerposit[2 * k + 2],bg,ball);
                break;

            case 2:
                powerups(Yob - 5000 - k * 600 + 200, i, powerposit[2 * k + 1],bg,ball);
                Obstacle2(Yob - 5000 - k * 600, -((i * 100) % (4 * 180)),bg,ball);
                powerups(Yob - 5000 - k * 600 - 200, i, powerposit[2 * k + 2],bg,ball);
                break;

            case 3:
                powerups(Yob - 5000 - k * 600 + 300, i, powerposit[2 * k + 1],bg,ball);
                Obstacle3(Yob - 5000 - k * 600, i / 1.2, 60, 100,bg,ball);
                powerups(Yob - 5000 - k * 600 - 300, i, powerposit[2 * k + 2],bg,ball);
                break;

            case 4:
                powerups(Yob - 5000 - k * 600 + 300, i, powerposit[2 * k + 1],bg,ball);
                Obstacle4(Yob - 5000 - k * 600, i % (2 * Math.PI),bg,ball);
                powerups(Yob - 5000 - k * 600, i, powerposit[2 * k + 2],bg,ball);
                break;

            case 5:
                Obstacle5(Yob - 5000 - k * 600, i % (2 * Math.PI),bg,ball);
                powerups(Yob - 5000 - k * 600, i, powerposit[2 * k + 2],bg,ball);
                break;

            case 6:
                Obstacle6(Yob - 5000 - k * 600, i % (2 * Math.PI), 120,bg,ball);
                powerups(Yob - 5000 - k * 600, i, powerposit[2 * k + 2],bg,ball);
                break;

            case 7:
                Obstacle7(Yob - 5000 - k * 600, (i * 4) % 40,bg,ball);
                UltimatePP(Yob - 5000 - k * 600 + 200, i, 6,bg,ball);
                break;

            case 8:
                Obstacle8(Yob - 5000 - k * 600, i % (2 * Math.PI), 120,bg,ball);
                powerups(Yob - 5000 - k * 600, i, powerposit[2 * k + 1],bg,ball);
                break;

            case 9:
                Obstacle1(Yob - 5000 - k * 600, i % (2 * Math.PI), 120,bg,ball);
                Obstacle6(Yob - 5000 - k * 600, i % (2 * Math.PI), 120,bg,ball);
                powerups(Yob - 5000 - k * 600, i, powerposit[2 * k + 1],bg,ball);
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
    if (ball.BallTravelled > ball.Y - Yob + 200)
        ball.BallTravelled = ball.Y - Yob + 200;

    ball.BallCovered = ball.Y - Yob + 200;

    bg.beginPath();
    bg.font = "50px Comic Sans MS";
    bg.fillStyle = "red";
    bg.fillText(" " + Math.floor((Ymax + 31 - ball.BallTravelled) / 400), 650, 50);
    shadow(U, ball.Y, ball.Radius);
    bg.globalAlpha = 1;

    if (MaxTravelled > ball.BallTravelled)
        MaxTravelled = ball.BallTravelled;

    score.innerHTML = Math.floor((Ymax + 31 - MaxTravelled) / 400).toString();

    window.localStorage.setItem("MaxTravelled", MaxTravelled);                           // Stores the highscore in local storage

}



function powerups(Y, i, choice,bg, ball) {
    switch (choice) {
        case 1:
            ColourChanger(Y, i, bg, ball);
            break;

        case 2:
            SpeedInc(Y, bg, ball);
            break;

        case 3:
            SpeedDec(Y, bg, ball);
            break;

        case 4:
            RadiusInc(Y, bg, ball);
            break;

        case 5:
            RadiusDec(Y, bg, ball);
            break;

        case 6:
            UltimatePP(Y, i, bg, ball);
            break;
        case 7:
            UltimatePP(Y, i, bg, ball);
            break;

        case 8:
            Normal(Y, bg, ball);
            break;

        case 9:
            Clockwise(Y, bg, ball);
            break;

        case 10:
            AntiClockwise(Y, bg, ball);
            break;

        case 11:
            ColourChanger(Y, i, bg, ball);
            break;

        default:
            Normal(Y, bg, ball);
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


function Gameover() {
    alert("Game over ");
    U = 0;
    t = 0;
    ball.Y = Ymax - 31;
    Yob = 200;
    ball.Yob = 200;
    ball.ult = 0;
    ball.Radius = 15;
    ball.speed = 0.01;
    i = 0;
    PrevBallTravelled = ball.BallTravelled;
    ball.BallTravelled = 1000;
    k = 0;
}
