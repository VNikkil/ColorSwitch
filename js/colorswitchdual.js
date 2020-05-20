// Creating a Canvas
const canvas1 = document.getElementById("game1");
const canvas2 = document.getElementById("game2");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");

canvas1.width = 550;
canvas1.height = window.innerHeight;
canvas2.width = 550;
canvas2.height = window.innerHeight;

const g1 = canvas1.getContext("2d");
const g2 = canvas2.getContext("2d");

const Ymax = canvas1.height - 31;

// Init Variables
let U1 = 0,
    g = -0.6,
    t1 = 0; // Velocity , gravity of the ball 1
let U2 = 0,
    t2 = 0; //of the ball 2
let Yob1 = 200,
    Yob2 = 200;
isPaused = false;

let z1 = 0,
    z2 = 0;
let speed1 = 0.01,
    speed2 = 0.01;

let posit = [1, 1, 2];
let powerposit = [1, 1, 2];
for (l = 0; l < 98; l++) {
    choice = Math.floor(Math.random() * 9) + 1;
    posit.push(choice);
    powerposit.push(Math.floor(Math.random() * 14) + 1);
}

//sprites
let img = new Image();
img.src = "images/powerups.png";


//Class for the ball
class Ball {
    constructor(Y, color, Radius) {
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

ball1 = new Ball(Ymax - 31, "cyan", 15);
ball2 = new Ball(Ymax - 31, "cyan", 15);

//Press Space to make that circle jump

var spacebar_pressed = false;
var uparrow_pressed = false;
var changed = 0;
var chan = 0;
window.onkeydown = function(event) {
    if (event.keyCode == 32) {
        this.console.log("down");
        spacebar_pressed = true;
        t1 = 0;
    }

    if (event.keyCode == 38) {
        this.uparrow_pressed = true;
        t2 = 0;
    }
    if (event.keyCode == 80) {
        //Add pause resume for Ball2
        isPaused = true;
        z1 = 0;
    }

    if (event.keyCode == 82) {
        if (z1 == 0) {
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
    }

    if (event.keyCode == 38) this.uparrow_pressed = false;
};

//Game 1
i = 0;
j = 0;
animateBG();

function animateBG() {
    if (!isPaused) requestAnimationFrame(animateBG);

    ball1.Yob = Yob1;
    ball2.Yob = Yob2;

    g1.clearRect(0, 0, innerWidth, innerHeight);
    g2.clearRect(0, 0, innerWidth, innerHeight);
    i += ball1.speed;
    j += ball2.speed;

    for (k = 0; k < 50; k++) {
        choice = posit[k];
        switch (choice) {
            case 1:
                powerups(Yob1 - k * 600 - 300, i, g1, ball1, powerposit[2 * k + 1]);
                powerups(Yob2 - k * 600 - 300, j, g2, ball2, powerposit[2 * k + 1]);
                //ColourChanger(Yob1 ,i,g1,ball1);
                Obstacle1(Yob1 - k * 600, i % (2 * Math.PI), 120, g1, ball1);
                Obstacle1(Yob2 - k * 600, j % (2 * Math.PI), 120, g2, ball2);
                powerups(Yob1 - k * 600, i, g1, ball1, powerposit[2 * k + 2]);
                powerups(Yob2 - k * 600, j, g2, ball2, powerposit[2 * k + 2]);
                break;

            case 2:
                powerups(Yob1 - k * 600 + 200, i, g1, ball1, powerposit[2 * k + 1]);
                powerups(Yob2 - k * 600 + 200, j, g2, ball2, powerposit[2 * k + 1]);
                Obstacle2(Yob1 - k * 600, -((i * 100) % (4 * 137.5)), g1, ball1);
                Obstacle2(Yob2 - k * 600, -((j * 100) % (4 * 137.5)), g2, ball2);
                powerups(Yob1 - k * 600 - 200, i, g1, ball1, powerposit[2 * k + 2]);
                powerups(Yob2 - k * 600 - 200, j, g2, ball2, powerposit[2 * k + 2]);
                break;

            case 3:
                powerups(Yob1 - k * 600 + 300, i, g1, ball1, powerposit[2 * k + 1]);
                powerups(Yob2 - k * 600 + 300, j, g2, ball2, powerposit[2 * k + 1]);
                Obstacle3(Yob1 - k * 600, i / 1.2, 60, 100, g1, ball1);
                Obstacle3(Yob2 - k * 600, j / 1.2, 60, 100, g2, ball2);
                powerups(Yob1 - k * 600 - 300, i, g1, ball1, powerposit[2 * k + 2]);
                powerups(Yob2 - k * 600 - 300, j, g2, ball2, powerposit[2 * k + 2]);
                break;

            case 4:
                powerups(Yob1 - k * 600 + 300, i, g1, ball1, powerposit[2 * k + 1]);
                powerups(Yob2 - k * 600 + 300, j, g2, ball2, powerposit[2 * k + 1]);
                Obstacle4(Yob1 - k * 600, i % (2 * Math.PI), g1, ball1);
                Obstacle4(Yob2 - k * 600, j % (2 * Math.PI), g2, ball2);
                powerups(Yob1 - k * 600, i, g1, ball1, powerposit[2 * k + 2]);
                powerups(Yob2 - k * 600, j, g2, ball2, powerposit[2 * k + 2]);
                break;

            case 5:
                Obstacle5(Yob1 - k * 600, i % (2 * Math.PI), g1, ball1);
                Obstacle5(Yob2 - k * 600, j % (2 * Math.PI), g2, ball2);
                powerups(Yob1 - k * 600, i, g1, ball1, powerposit[2 * k + 2]);
                powerups(Yob2 - k * 600, j, g2, ball2, powerposit[2 * k + 2]);
                break;

            case 6:
                Obstacle6(Yob1 - k * 600, i % (2 * Math.PI), 120, g1, ball1);
                Obstacle6(Yob2 - k * 600, j % (2 * Math.PI), 120, g2, ball2);
                powerups(Yob1 - k * 600, i, g1, ball1, powerposit[2 * k + 2]);
                powerups(Yob2 - k * 600, j, g2, ball2, powerposit[2 * k + 2]);
                break;

            case 7:
                Obstacle7(Yob1 - k * 600, (i * 4) % 40, g1, ball1);
                Obstacle7(Yob2 - k * 600, (j * 4) % 40, g2, ball2);
                UltimatePP(Yob1 - k * 600 + 200, i, g1, ball1);
                UltimatePP(Yob2 - k * 600 + 200, j, g2, ball2);
                break;

            case 8:
                Obstacle8(Yob1 - k * 600, i % (2 * Math.PI), 120, g1, ball1);
                Obstacle8(Yob2 - k * 600, j % (2 * Math.PI), 120, g2, ball2);
                powerups(Yob1 - k * 600, i, g1, ball1, powerposit[2 * k + 1]);
                powerups(Yob2 - k * 600, j, g2, ball2, powerposit[2 * k + 1]);
                break;

            case 9:
                Obstacle1(Yob1 - k * 600, i % (2 * Math.PI), 120, g1, ball1);
                Obstacle6(Yob2 - k * 600, j % (2 * Math.PI), 120, g2, ball2);
                powerups(Yob1 - k * 600, i, g1, ball1, powerposit[2 * k + 1]);
                powerups(Yob2 - k * 600, j, g2, ball2, powerposit[2 * k + 1]);
                break;
        }
    }

    g1.beginPath();
    g1.arc(275, ball1.Y, ball1.Radius, 0, 2 * Math.PI, true);
    g1.fillStyle = ball1.color;
    g1.fill();
    shadow(U1, ball1.Y, ball1.Radius, g1, ball1.color);
    g2.beginPath();
    g2.arc(275, ball2.Y, ball2.Radius, 0, 2 * Math.PI, true);
    g2.fillStyle = ball2.color;
    g2.fill();
    shadow(U2, ball2.Y, ball2.Radius, g2, ball2.color);
    if (spacebar_pressed) {
        U1 = 10;
        spacebar_pressed = false;
    }

    if (ball1.Y >= Ymax - 31) {
        ball1.Y = Ymax - 50;
        U1 = 0;
        t1 = 0;

        if (Yob1 > 210)
                Gameover(ball1);
    } else {
        ball1.Y = ball1.Y - U1 * t1 - 0.5 * g * t1 * t1;
        t1 = 0.3;
        U1 = U1 + g * t1;
        //Drawing the bottom danger line
        if(Yob1 > 210)
        {
        g1.beginPath();
        g1.lineWidth=5;
        g1.moveTo(0,Ymax - 31 + ball1.Radius );
        g1.lineTo(550,Ymax - 31 + ball1.Radius);
        g1.strokeStyle = "#CA0B00" ;
        g1.stroke();
        }
    }

    if (ball1.Y < Ymax - 200 && U1 > 0) {
        Yob1 += 1.5;
        ball1.Y += 1.5;
    }
    ///////////////ball2
    if (uparrow_pressed) {
        U2 = 10;
        uparrow_pressed = false;
    }

    if (ball2.Y >= Ymax - 31) {
        ball2.Y = Ymax - 50;
        U2 = 0;
        t2 = 0;
        if (Yob2 > 210)
                Gameover(ball2);
    } else {
        ball2.Y = ball2.Y - U2 * t2 - 0.5 * g * t2 * t2;
        t2 = 0.3;
        U2 = U2 + g * t2;
        //Drawing the bottom danger line
        if(Yob2 > 210)
        {
        g2.beginPath();
        g2.lineWidth=5;
        g2.moveTo(0,Ymax - 31 + ball2.Radius );
        g2.lineTo(550,Ymax - 31 + ball2.Radius);
        g2.strokeStyle = "#CA0B00" ;
        g2.stroke();
        }
    }

    if (ball2.Y < Ymax - 200 && U2 > 0) {
        Yob2 += 1.5;
        ball2.Y += 1.5;
    }

    //score
    g1.beginPath();
    g1.font = "30px Comic Sans MS";
    g1.fillStyle = "red";
    g1.fillText(" " + Math.floor((Yob1 - 200) / 200), 500, 100);

    g2.beginPath();
    g2.font = "30px Comic Sans MS";
    g2.fillStyle = "red";
    g2.fillText(" " + Math.floor((Yob2 - 200) / 200), 500, 100);

    if (ball1.BallTravelled > ball1.Y - Yob1 + 200)
        ball1.BallTravelled = ball1.Y - Yob1 + 200;

    ball1.BallCovered = ball1.Y - Yob1 + 200;

    if (ball2.BallTravelled > ball2.Y - Yob2 + 200)
        ball2.BallTravelled = ball2.Y - Yob2 + 200;

    ball2.BallCovered = ball2.Y - Yob2 + 200;

    ball1.Yob = Yob1;
    ball2.Yob = Yob2;

    if (Math.floor((Yob1 - 200) / 200) > 49) Gameover(ball2);

    if (Math.floor((Yob2 - 200) / 200) > 49) Gameover(ball1);
}

function powerups(Y, i, bg, ball, choice) {
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

function shadow(U, Y, R, bg, color) {
    for (var j = 0; j < 2; j++) {
        Y += U + 3;

        bg.beginPath();
        bg.arc(275, Y, R, 0, 2 * Math.PI, true);
        a = 0.4 - j * 0.2;
        if (color == "cyan") bg.fillStyle = "rgba(0,255,255," + a + ")";
        else if (color == "yellow") bg.fillStyle = "rgba(255,255,0," + a + ")";
        else if (color == "chartreuse") bg.fillStyle = "rgba(127,255,0," + a + ")";
        else bg.fillStyle = "rgba(153,50,204," + a + ")";

        bg.fill();
    }
}

function resume() {
    console.log("Inside the resume");
    if (z1 < 2.913) requestAnimationFrame(resume);

    g1.beginPath();
    g1.clearRect(500, 250, 50, 50);
    g2.beginPath();
    g2.clearRect(500, 250, 50, 50);

    z1 += 0.01;

    g1.beginPath();
    g1.font = "50px Comic Sans MS";
    g1.fillStyle = "red";

    g2.beginPath();
    g2.font = "50px Comic Sans MS";
    g2.fillStyle = "red";
    if (z1 % 3 > 0.973)
        if (z1 % 3 > 2 * 0.973) {
            g1.fillText("1", 500, 300);
            g2.fillText("1", 500, 300);
        } else {
            g1.fillText("2", 500, 300);
            g2.fillText("2", 500, 300);
        }
    else {
        g1.fillText("3", 500, 300);
        g2.fillText("3", 500, 300);
    }
}

function Obstacle1(Y, i, Radius, bg, ball) {
    if (Y < 2000 && Y > -2000) {
        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(275, Y, Radius, i, i + Math.PI / 2, false);
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs1(Y, i, Radius, "cyan", ball);

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(275, Y, Radius, i + Math.PI / 2, i + (2 * Math.PI) / 2, false);
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        CheckCollisionObs1(
            Y,
            (i + Math.PI / 2) % (2 * Math.PI),
            Radius,
            "chartreuse",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(275, Y, Radius, i + (2 * Math.PI) / 2, i + (3 * Math.PI) / 2, false);
        bg.strokeStyle = "yellow";
        bg.stroke();
        CheckCollisionObs1(
            Y,
            (i + Math.PI) % (2 * Math.PI),
            Radius,
            "yellow",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(275, Y, Radius, i + (3 * Math.PI) / 2, i, false);
        bg.strokeStyle = "darkorchid";
        bg.stroke();
        CheckCollisionObs1(
            Y,
            (i + (3 * Math.PI) / 2) % (2 * Math.PI),
            Radius,
            "darkorchid",
            ball
        );
    }
}

function CheckCollisionObs1(Y, j, Radius, ColourToCheck, ball) {
    if (j >= 0 && j <= Math.PI / 2 && ball.ult == 0)
        if (
            (ball.Y + ball.Radius > Y + Radius + 12 &&
                ball.Y - ball.Radius < Y + Radius + 12) ||
            (ball.Y + ball.Radius > Y + Radius - 12 &&
                ball.Y - ball.Radius < Y + Radius - 12)
        )
            if (ball.color != ColourToCheck) Gameover(ball);

    if (j > Math.PI && j < (3 * Math.PI) / 2 && ball.ult == 0)
        if (ball.Y > Y - Radius - 25 && ball.Y < Y - Radius + 25)
            if (ball.color != ColourToCheck) Gameover(ball);
}

function Obstacle2(Y, i, bg, ball) {
    if (Y < 2000 && Y > -2000) {
        bg.beginPath();
        bg.fillStyle = "cyan";
        bg.fillRect(i - 550, Y, 137.5, 30);
        CheckCollisionObs2(Y, i - 720, "cyan", ball);

        bg.beginPath();
        bg.fillStyle = "chartreuse";
        bg.fillRect(i - 3 * 137.5, Y, 137.5, 30);
        CheckCollisionObs2(Y, i - 540, "chartreuse", ball);

        bg.beginPath();
        bg.fillStyle = "yellow";
        bg.fillRect(i - 275, Y, 137.5, 30);
        CheckCollisionObs2(Y, i - 360, "yellow", ball);

        bg.beginPath();
        bg.fillStyle = "darkorchid";
        bg.fillRect(i - 137.5, Y, 137.5, 30);
        CheckCollisionObs2(Y, i - 180, "darkorchid", ball);

        bg.beginPath();
        bg.fillStyle = "cyan";
        bg.fillRect(i, Y, 137.5, 30);
        CheckCollisionObs2(Y, i, "cyan", ball);

        bg.beginPath();
        bg.fillStyle = "chartreuse";
        bg.fillRect(i + 137.5, Y, 137.5, 30);
        CheckCollisionObs2(Y, i + 137.5, "chartreuse", ball);

        bg.beginPath();
        bg.fillStyle = "yellow";
        bg.fillRect(i + 275, Y, 137.5, 30);
        CheckCollisionObs2(Y, i + 275, "yellow", ball);

        bg.beginPath();
        bg.fillStyle = "darkorchid";
        bg.fillRect(i + 412.5, Y, 137.5, 30);
        CheckCollisionObs2(Y, i + 412.5, "darkorchid", ball);

        bg.beginPath();
        bg.fillStyle = "cyan";
        bg.fillRect(i + 4 * 137.5, Y, 137.5, 30);
        CheckCollisionObs2(Y, i + 4 * 137.5, "cyan", ball);

        bg.beginPath();
        bg.fillStyle = "chartreuse";
        bg.fillRect(i + 5 * 137.5, Y, 137.5, 30);
        CheckCollisionObs2(Y, i + 5 * 137.5, "chartreuse", ball);

        bg.beginPath();
        bg.fillStyle = "yellow";
        bg.fillRect(i + 6 * 137.5, Y, 137.5, 30);
        CheckCollisionObs2(Y, i + 6 * 137.5, "yellow", ball);

        bg.beginPath();
        bg.fillStyle = "darkorchid";
        bg.fillRect(i + 7 * 137.5, Y, 137.5, 30);
        CheckCollisionObs2(Y, i + 7 * 137.5, "darkorchid", ball);
    }
}

function CheckCollisionObs2(Y, j, ColourToCheck, ball) {
    if (j > 137.5 && j < 275)
        if (
            (ball.Y - ball.Radius < Y + 30 && ball.Y + ball.Radius > Y + 30) ||
            (ball.Y - ball.Radius > Y - 30 && ball.Y + ball.Radius < Y)
        )
            if (ball.color != ColourToCheck && ball.ult == 0) Gameover(ball);
}

function Obstacle3(Y, i, Radius1, Radius2, bg, ball) {
    if (Y < 2000 && Y > -2000) {
        //console.log("Y =  "+Y +"  , Ball y ="+ ball.Y );
        lineWidth = 12;
        bg.beginPath();
        bg.lineWidth = lineWidth;
        bg.arc(
            275 - Radius1 - lineWidth / 2,
            Y,
            Radius1,
            i,
            i + Math.PI / 2,
            false
        );
        bg.strokeStyle = "cyan";
        bg.stroke();

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(
            275 + Radius2 + lineWidth / 2,
            Y,
            Radius2,
            -i,
            -i + Math.PI / 2,
            false
        );
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        CheckCollisionObs3(Y, -i, Radius2, "chartreuse", ball);
        // CheckCollisionObs1(Y,i,"cyan");

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(
            275 - Radius1 - lineWidth / 2,
            Y,
            Radius1,
            i + Math.PI / 2,
            i + (2 * Math.PI) / 2,
            false
        );
        bg.strokeStyle = "chartreuse";
        bg.stroke();

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(
            275 + Radius2 + lineWidth / 2,
            Y,
            Radius2,
            -i + Math.PI / 2,
            -i + (2 * Math.PI) / 2,
            false
        );
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs3(Y, 2 * Math.PI - i + Math.PI / 2, Radius2, "cyan", ball);
        // CheckCollisionObs1(Y,(i+Math.PI/2)%(2*Math.PI),"chartreuse");

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(
            275 - Radius1 - lineWidth / 2,
            Y,
            Radius1,
            i + (2 * Math.PI) / 2,
            i + (3 * Math.PI) / 2,
            false
        );
        bg.strokeStyle = "yellow";
        bg.stroke();

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(
            275 + Radius2 + lineWidth / 2,
            Y,
            Radius2,
            -i + (2 * Math.PI) / 2,
            -i + (3 * Math.PI) / 2,
            false
        );
        bg.strokeStyle = "darkorchid";
        bg.stroke();
        CheckCollisionObs3(Y, -i + (2 * Math.PI) / 2, Radius2, "darkorchid", ball);
        //CheckCollisionObs1(Y,(i+Math.PI)%(2*Math.PI),"yellow");

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(
            275 - Radius1 - lineWidth / 2,
            Y,
            Radius1,
            i + (3 * Math.PI) / 2,
            i,
            false
        );
        bg.strokeStyle = "darkorchid";
        bg.stroke();

        bg.beginPath();
        bg.lineWidth = 12;
        bg.arc(
            275 + Radius2 + lineWidth / 2,
            Y,
            Radius2,
            -i + (3 * Math.PI) / 2,
            -i,
            false
        );
        bg.strokeStyle = "yellow";
        bg.stroke();
        CheckCollisionObs3(Y, -i + (3 * Math.PI) / 2, Radius2, "yellow", ball);
        // CheckCollisionObs1(Y,(i+3*Math.PI/2)%(2*Math.PI),"darkorchid");
    }
}

function CheckCollisionObs3(Y, j, Radius, ColourToCheck, ball) {
    if (
        275 + Radius + Radius * Math.cos(j) <= 275 + ball.Radius - 10 ||
        (275 + Radius + Radius * Math.cos(j + Math.PI / 2) <=
            275 + ball.Radius + 5 &&
            Y + Radius * Math.sin(j + Math.PI / 2) < Y + 5)
    ) {
        console.log(
            " " +
            ColourToCheck +
            " " +
            Y +
            "  " +
            Radius * Math.sin(j) +
            " ...." +
            ball.Y
        );
        if (
            Y + Radius * Math.sin(j) > ball.Y &&
            ball.Y < Y + Radius * (1 / Math.sqrt(5)) &&
            ball.Y > Y - Radius * (1 / Math.sqrt(5))
        ) {
            //&& ball.Y < Y + Radius && ball.Y > Y - Radius*Math.cos(Math.PI/4))
            console.log(" " + ColourToCheck + ".......");
            if (ball.color != ColourToCheck && ball.ult == 0) Gameover(ball);
        }
    }
}

function Obstacle4(Y, i, bg, ball) {
    R = 120;

    if (Y < 2000 && Y > -2000) {
        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(275 - R, Y);
        bg.lineTo(275 - R + R * Math.cos(i), Y + R * Math.sin(i));
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs4(
            275 - R + R * Math.cos(i),
            Y + R * Math.sin(i),
            "cyan",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(275 + R, Y);
        bg.lineTo(275 + R + R * Math.cos(-i), Y + R * Math.sin(-i));
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        //bg.arc(240 + i,Y + Math.sqrt(R*R - i*i),15,0,2*Math.PI,true);
        //bg.fillStyle = "cyan";
        //bg.fill();
        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(275 - R, Y);
        bg.lineTo(
            275 - R + R * Math.cos(i + Math.PI / 2),
            Y + R * Math.sin(i + Math.PI / 2)
        );
        bg.strokeStyle = "yellow";
        bg.stroke();
        CheckCollisionObs4(
            275 - R + R * Math.cos(i + Math.PI / 2),
            Y + R * Math.sin(i + Math.PI / 2),
            "yellow",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(275 + R, Y);
        bg.lineTo(
            275 + R + R * Math.cos(-i + Math.PI / 2),
            Y + R * Math.sin(-i + Math.PI / 2)
        );
        bg.strokeStyle = "yellow";
        bg.stroke();

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(275 - R, Y);
        bg.lineTo(
            275 - R + R * Math.cos(i + Math.PI),
            Y + R * Math.sin(i + Math.PI)
        );
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        CheckCollisionObs4(
            240 + R * Math.cos(i + Math.PI),
            Y + R * Math.sin(i + Math.PI),
            "chartreuse",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(275 + R, Y);
        bg.lineTo(
            275 + R + R * Math.cos(-i + Math.PI),
            Y + R * Math.sin(-i + Math.PI)
        );
        bg.strokeStyle = "cyan";
        bg.stroke();

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(275 - R, Y);
        bg.lineTo(
            275 - R + R * Math.cos(i - Math.PI / 2),
            Y + R * Math.sin(i - Math.PI / 2)
        );
        bg.strokeStyle = "darkorchid";
        bg.stroke();
        CheckCollisionObs4(
            275 - R + R * Math.cos(i - Math.PI / 2),
            Y + R * Math.sin(i - Math.PI / 2),
            "darkorchid",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(275 + R, Y);
        bg.lineTo(
            275 + R + R * Math.cos(-i - Math.PI / 2),
            Y + R * Math.sin(-i - Math.PI / 2)
        );
        bg.strokeStyle = "darkorchid";
        bg.stroke();

        bg.beginPath();
        bg.arc(275 - R, Y, 15, 0, 2 * Math.PI, true);
        bg.fillStyle = "pink";
        bg.fill();

        bg.beginPath();
        bg.arc(275 + R, Y, 15, 0, 2 * Math.PI, true);
        bg.fillStyle = "pink";
        bg.fill();
    }
}

function CheckCollisionObs4(X, Y, ColourToCheck, ball) {
    if (X <= 275 && X >= 275 - (ball.Radius + 1)) {
        if (Y >= ball.Y - ball.Radius && Y <= ball.Y + ball.Radius)
            if (ball.color != ColourToCheck && ball.ult == 0) Gameover(ball);
    }
}

function Obstacle5(Y, i, bg, ball) {
    if (Y < 2000 && Y > -2000) {
        Obstacle1(Y, i + Math.PI / 4, 160, bg, ball);

        Radius = 120;
        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(
            275,
            Y,
            Radius,
            -i + Math.PI / 4,
            -i + Math.PI / 4 + Math.PI / 2,
            false
        );
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs1(Y, -i + Math.PI / 4, Radius, "cyan", ball);

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(
            275,
            Y,
            Radius,
            -i + Math.PI / 4 + Math.PI / 2,
            -i + Math.PI / 4 + (2 * Math.PI) / 2,
            false
        );
        bg.strokeStyle = "darkorchid";
        bg.stroke();
        CheckCollisionObs1(
            Y,
            (-i + Math.PI / 4 + Math.PI / 2) % (2 * Math.PI),
            Radius,
            "darkorchid",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(
            275,
            Y,
            Radius,
            -i + Math.PI / 4 + (2 * Math.PI) / 2,
            -i + Math.PI / 4 + (3 * Math.PI) / 2,
            false
        );
        bg.strokeStyle = "yellow";
        bg.stroke();
        CheckCollisionObs1(
            Y,
            (i + Math.PI) % (2 * Math.PI),
            Radius,
            "yellow",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(
            275,
            Y,
            Radius,
            -i + Math.PI / 4 + (3 * Math.PI) / 2,
            -i + Math.PI / 4,
            false
        );
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        CheckCollisionObs1(
            Y,
            (-i + Math.PI / 4 + (3 * Math.PI) / 2) % (2 * Math.PI),
            Radius,
            "chartreuse",
            ball
        );
    }
}

function Obstacle6(Y, i, Radius, bg, ball) {
    if (Y < 2000 && Y > -2000) {
        Obstacle6_Arc(Y, i, Radius, "cyan", 30, bg, ball);
        Obstacle6_Arc(Y, i + Math.PI / 2, Radius, "chartreuse", 30, bg, ball);
        Obstacle6_Arc(Y, i + Math.PI, Radius, "yellow", 30, bg, ball);
        Obstacle6_Arc(Y, i - Math.PI / 2, Radius, "darkorchid", 30, bg, ball);
    }
}

function Obstacle6_Arc(Y, i, Radius, Colour, pos, bg, ball) {
    bg.beginPath();
    bg.arc(
        275 + Radius * Math.cos(i),
        Y + Radius * Math.sin(i),
        20,
        0,
        2 * Math.PI,
        true
    );
    Check2CircleColl(
        275 + Radius * Math.cos(i),
        Y + Radius * Math.sin(i),
        20,
        275,
        ball.Y,
        ball.Radius,
        Colour,
        ball
    );

    Radius += pos;
    bg.moveTo(
        275 + Radius * Math.cos(i + Math.PI / 8),
        Y + Radius * Math.sin(i + Math.PI / 8)
    );
    bg.arc(
        275 + Radius * Math.cos(i + Math.PI / 8),
        Y + Radius * Math.sin(i + Math.PI / 8),
        20,
        0,
        2 * Math.PI,
        true
    );
    Check2CircleColl(
        275 + Radius * Math.cos(i + Math.PI / 8),
        Y + Radius * Math.sin(i + Math.PI / 8),
        20,
        275,
        ball.Y,
        ball.Radius,
        Colour,
        ball
    );

    Radius += pos;
    bg.moveTo(
        275 + Radius * Math.cos(i + Math.PI / 4),
        Y + Radius * Math.sin(i + Math.PI / 4)
    );
    bg.arc(
        275 + Radius * Math.cos(i + Math.PI / 4),
        Y + Radius * Math.sin(i + Math.PI / 4),
        20,
        0,
        2 * Math.PI,
        true
    );
    Check2CircleColl(
        275 + Radius * Math.cos(i + Math.PI / 4),
        Y + Radius * Math.sin(i + Math.PI / 4),
        20,
        275,
        ball.Y,
        ball.Radius,
        Colour,
        ball
    );

    Radius += pos;
    bg.moveTo(
        275 + Radius * Math.cos(i + (3 * Math.PI) / 8),
        Y + Radius * Math.sin(i + (3 * Math.PI) / 8)
    );
    bg.arc(
        275 + Radius * Math.cos(i + (3 * Math.PI) / 8),
        Y + Radius * Math.sin(i + (3 * Math.PI) / 8),
        20,
        0,
        2 * Math.PI,
        true
    );
    Check2CircleColl(
        275 + Radius * Math.cos(i + (3 * Math.PI) / 8),
        Y + Radius * Math.sin(i + (3 * Math.PI) / 8),
        20,
        275,
        ball.Y,
        ball.Radius,
        Colour,
        ball
    );

    bg.fillStyle = Colour;
    bg.fill();
}

function Check2CircleColl(X1, Y1, R1, X2, Y2, R2, ColourToCheck, ball) {
    //Obs6 Collision checker
    console.log(
        " dist : " + Math.sqrt((X2 - X1) * (X2 - X1) + (Y2 - Y1) * (Y2 - Y1))
    );
    if (Math.sqrt((X2 - X1) * (X2 - X1) + (Y2 - Y1) * (Y2 - Y1)) < R1 + R2)
        if (ball.color != ColourToCheck && ball.ult == 0) Gameover();
}

function Obstacle7(Y, i, bg, ball) {
    if (Y < 2000 && Y > -2000) {
        bg.beginPath();
        bg.lineWidth = 40;
        bg.moveTo(100, Y + 260);
        bg.lineTo(565 - 85, Y + 270);
        bg.moveTo(225 - 85, Y + 310);
        bg.lineTo(395 - 85, Y);
        bg.moveTo(315 - 85, Y + 10);
        bg.lineTo(525 - 85, Y + 310);

        if (i > 10)
            if (i > 20)
                if (i > 30) {
                    bg.strokeStyle = "darkorchid";
                    colorrr = "darkorchid";
                } else {
                    bg.strokeStyle = "yellow";
                    colorrr = "yellow";
                }
        else {
            bg.strokeStyle = "chartreuse";
            colorrr = "chartreuse";
        } else {
            bg.strokeStyle = "cyan";
            colorrr = "cyan";
        }
        bg.stroke();

        if (ball.Y - ball.Radius < Y + 285 && ball.Y + ball.Radius > Y + 245)
            if (ball.color != colorrr && ball.ult == 0) Gameover(ball);
    }
}

function Obstacle8(Y, i, Radius, bg, ball) {
    if (Y < 2000 && Y > -2000) {
        if (i > Math.PI) Radius = Radius + 10 * (2 * Math.PI - i);
        else Radius = Radius + 10 * i;

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(275, Y, Radius, i, i + Math.PI / 2, false);
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs1(Y, i, Radius, "cyan", ball);

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(275, Y, Radius, i + Math.PI / 2, i + (2 * Math.PI) / 2, false);
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        CheckCollisionObs1(
            Y,
            (i + Math.PI / 2) % (2 * Math.PI),
            Radius,
            "chartreuse",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(275, Y, Radius, i + (2 * Math.PI) / 2, i + (3 * Math.PI) / 2, false);
        bg.strokeStyle = "yellow";
        bg.stroke();
        CheckCollisionObs1(
            Y,
            (i + Math.PI) % (2 * Math.PI),
            Radius,
            "yellow",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(275, Y, Radius, i + (3 * Math.PI) / 2, i, false);
        bg.strokeStyle = "darkorchid";
        bg.stroke();
        CheckCollisionObs1(
            Y,
            (i + (3 * Math.PI) / 2) % (2 * Math.PI),
            Radius,
            "darkorchid",
            ball
        );
    }
}

function ColourChanger(Y, i, bg, ball) {
    if (Y > -2000 && Y < 720) {
        if (ball.Y > Y || 1) {
            console.log(" bt=  " + ball.BallTravelled + " " + Y - ball.Yob + 200);
            if (ball.BallTravelled > Y - ball.Yob + 200)
                bg.drawImage(img, 26, 58, 72, 74, 275 - 25, Y - 25, 50, 50);

            if (i % 0.4 > 0.1)
                if (i % 0.4 > 0.2)
                    if (i % 0.4 > 0.3) colorr = "darkorchid";
                    else colorr = "yellow";
            else colorr = "chartreuse";
            else colorr = "cyan";

            if (
                Y > ball.Y - ball.Radius &&
                Y < ball.Y + ball.Radius &&
                ball.BallCovered == ball.BallTravelled
            ) {
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

function UltimatePP(Y, i, bg, ball) {
    if (Y > -2000 && Y < 2000) {
        if (
            ball.Y > Y &&
            ball.ult == 0 &&
            ball.BallTravelled > Y - ball.Yob + 200
        ) {
            bg.drawImage(img, 691, 56, 97, 97, 275 - 25, Y - 25, 50, 50);
            if (ball.Y - ball.Radius < Y && ball.Y + ball.Radius > Y) {
                ball.ult = 1;
                if (ball.Y + ball.Radius > Y - 25) ball.time = 0;
            }
        }

        if (Y > ball.Y + ball.Radius && ball.ult == 1) {
            if (i % 0.4 > 0.1)
                if (i % 0.4 > 0.2)
                    if (i % 0.4 > 0.3) ball.color = "darkorchid";
                    else ball.color = "yellow";
            else ball.color = "chartreuse";
            else ball.color = "cyan";
        }

        if (ball.time > 10) ball.ult = 0;

        if (ball.ult == 1) {
            bg.beginPath();
            if (ball.time > 7) {
                if (ball.time > 8) {
                    if (ball.time > 9) {
                        if (ball.time > 9.8) bg.clearRect(500, 300, 50, 50);
                        else bg.fillText("1", 500, 350);
                    } else bg.fillText("2", 500, 350);
                } else bg.fillText("3", 500, 350);
            }
            bg.fillStyle = ball.color;
            bg.fill();
        }

        ball.time += 0.002;
    }
}

function RadiusInc(Y, bg, ball) {
    if (Y > -2000 && Y < 2000 && ball.Radius != 25) {
        bg.drawImage(img, 164, 61, 82, 77, 275 - 25, Y - 25, 50, 50);
        if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) ball.Radius = 25;
    }
}

function RadiusDec(Y, bg, ball) {
    if (Y > -2000 && Y < 2000 && ball.Radius != 10) {
        bg.drawImage(img, 561, 62, 85, 87, 275 - 25, Y - 25, 50, 50);
        if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) ball.Radius = 10;
    }
}

function SpeedInc(Y, bg, ball) {
    if (Y > -2000 && Y < 2000 && Math.abs(ball.speed) != 0.02) {
        bg.drawImage(img, 314, 62, 78, 77, 275 - 25, Y - 25, 50, 50);
        if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) ball.speed = 0.02;
    }
}

function SpeedDec(Y, bg, ball) {
    if (Y > -2000 && Y < 2000) {
        if (Math.abs(ball.speed) != 0.007) {
            bg.drawImage(img, 440, 67, 76, 76, 275 - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius)
                ball.speed = 0.007;
        }
    }
}

function Clockwise(Y, bg, ball) {
    if (Y > -2000 && Y < 2000) {
        if (ball.speed > 0) {
            bg.drawImage(img, 163, 202, 107, 85, 275 - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) {
                ball.speed = -ball.speed;
            }
        }
    }
}

function AntiClockwise(Y, bg, ball) {
    if (Y < 2000 && Y > -2000) {
        if (ball.speed < 0) {
            bg.drawImage(img, 33, 208, 96, 78, 275 - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) {
                ball.speed = -ball.speed;
            }
        }
    }
}

function Normal(Y, bg, ball) {
    if (Y < 700 && Y > -2000) {
        if (ball.speed != 0.01 || ball.Radius != 15) {
            bg.drawImage(img, 317, 201, 87, 85, 275 - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) {
                ball.speed = 0.01;
                ball.Radius = 15;
            }
        }
    }
}

function Gameover(ball) {
    if (ball == ball1) alert("Player 2 Won !!!");
    else alert("Player 1 Won !!! ");

    U1 = 0;
    t1 = 0;
    U2 = 0;
    t2 = 0;
    ball1.Y = Ymax - 31;
    ball2.Y = Ymax - 31;
    Yob1 = 200;
    Yob2 = 200;
    ball1.ult = 0;
    ball2.ult = 0;
    ball1.Radius = 15;
    ball2.Radius = 15;
    ball1.speed = 0.01;
    ball2.speed = 0.01;
    j = 0;
    i = 0;
    ball1.BallTravelled = 1000;
    ball2.BallTravelled = 1000;
}
