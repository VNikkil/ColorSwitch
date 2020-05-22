var changed = 0;

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

function Obstacle1(Y, i, Radius, bg, ball) {
    if (Y < 2000 && Y > -2000) {
        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(ball.X, Y, Radius, i, i + Math.PI / 2, false);
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs1(Y, i, Radius, "cyan", ball);

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(ball.X, Y, Radius, i + Math.PI / 2, i + (2 * Math.PI) / 2, false);
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
        bg.arc(ball.X, Y, Radius, i + (2 * Math.PI) / 2, i + (3 * Math.PI) / 2, false);
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
        bg.arc(ball.X, Y, Radius, i + (3 * Math.PI) / 2, i, false);
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
        bg.fillRect(i - 2*ball.X, Y, ball.X /2, 30);
        CheckCollisionObs2(Y, i - 2*ball.X, "cyan", ball);

        bg.beginPath();
        bg.fillStyle = "chartreuse";
        bg.fillRect(i - 3 *  ball.X /2, Y,ball.X /2, 30);
        CheckCollisionObs2(Y, i - 3*ball.X/2, "chartreuse", ball);

        bg.beginPath();
        bg.fillStyle = "yellow";
        bg.fillRect(i - ball.X , Y,  ball.X /2, 30);
        CheckCollisionObs2(Y, i - ball.X, "yellow", ball);

        bg.beginPath();
        bg.fillStyle = "darkorchid";
        bg.fillRect(i -  ball.X /2, Y, ball.X /2, 30);
        CheckCollisionObs2(Y, i -  ball.X /2, "darkorchid", ball);

        bg.beginPath();
        bg.fillStyle = "cyan";
        bg.fillRect(i, Y, ball.X /2, 30);
        CheckCollisionObs2(Y, i, "cyan", ball);

        bg.beginPath();
        bg.fillStyle = "chartreuse";
        bg.fillRect(i +  ball.X /2, Y,  ball.X /2, 30);
        CheckCollisionObs2(Y, i +  ball.X /2, "chartreuse", ball);

        bg.beginPath();
        bg.fillStyle = "yellow";
        bg.fillRect(i +  ball.X , Y, ball.X /2, 30);
        CheckCollisionObs2(Y, i +  ball.X , "yellow", ball);

        bg.beginPath();
        bg.fillStyle = "darkorchid";
        bg.fillRect(i + 3*ball.X/2 , Y,  ball.X /2, 30);
        CheckCollisionObs2(Y, i + 3*ball.X/2, "darkorchid", ball);

        bg.beginPath();
        bg.fillStyle = "cyan";
        bg.fillRect(i + 4 *  ball.X /2, Y,  ball.X /2, 30);
        CheckCollisionObs2(Y, i + 4 * ball.X /2, "cyan", ball);

        bg.beginPath();
        bg.fillStyle = "chartreuse";
        bg.fillRect(i + 5 * ball.X /2, Y,  ball.X /2, 30);
        CheckCollisionObs2(Y, i + 5 * ball.X /2, "chartreuse", ball);

        bg.beginPath();
        bg.fillStyle = "yellow";
        bg.fillRect(i + 6 * ball.X /2, Y,  ball.X /2, 30);
        CheckCollisionObs2(Y, i + 6 * ball.X /2, "yellow", ball);

        bg.beginPath();
        bg.fillStyle = "darkorchid";
        bg.fillRect(i + 7 *  ball.X /2, Y,  ball.X /2, 30);
        CheckCollisionObs2(Y, i + 7 * ball.X /2, "darkorchid", ball);
    }
}

function CheckCollisionObs2(Y, j, ColourToCheck, ball) {
    if (j >  ball.X /2 && j < ball.X )
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
            ball.X  - Radius1 - lineWidth / 2,
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
            ball.X  + Radius2 + lineWidth / 2,
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
            ball.X - Radius1 - lineWidth / 2,
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
            ball.X + Radius2 + lineWidth / 2,
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
            ball.X - Radius1 - lineWidth / 2,
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
            ball.X + Radius2 + lineWidth / 2,
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
            ball.X - Radius1 - lineWidth / 2,
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
            ball.X + Radius2 + lineWidth / 2,
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
        ball.X + Radius + Radius * Math.cos(j) <=  ball.X + ball.Radius - 10 ||
        ( ball.X + Radius + Radius * Math.cos(j + Math.PI / 2) <=
        ball.X + ball.Radius + 5 &&
            Y + Radius * Math.sin(j + Math.PI / 2) < Y + 5)
    ) {
        
        if (
            Y + Radius * Math.sin(j) > ball.Y &&
            ball.Y < Y + Radius * (1 / Math.sqrt(5)) &&
            ball.Y > Y - Radius * (1 / Math.sqrt(5))
        ) {
            //&& ball.Y < Y + Radius && ball.Y > Y - Radius*Math.cos(Math.PI/4))
            if (ball.color != ColourToCheck && ball.ult == 0) Gameover(ball);
        }
    }
}

function Obstacle4(Y, i, bg, ball) {
    R = 120;

    if (Y < 2000 && Y > -2000) {
        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo( ball.X - R, Y);
        bg.lineTo( ball.X - R + R * Math.cos(i), Y + R * Math.sin(i));
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs4(
            ball.X - R + R * Math.cos(i),
            Y + R * Math.sin(i),
            "cyan",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo( ball.X + R, Y);
        bg.lineTo( ball.X + R + R * Math.cos(-i), Y + R * Math.sin(-i));
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        //bg.arc(240 + i,Y + Math.sqrt(R*R - i*i),15,0,2*Math.PI,true);
        //bg.fillStyle = "cyan";
        //bg.fill();
        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo( ball.X - R, Y);
        bg.lineTo(
            ball.X - R + R * Math.cos(i + Math.PI / 2),
            Y + R * Math.sin(i + Math.PI / 2)
        );
        bg.strokeStyle = "yellow";
        bg.stroke();
        CheckCollisionObs4(
            ball.X - R + R * Math.cos(i + Math.PI / 2),
            Y + R * Math.sin(i + Math.PI / 2),
            "yellow",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo( ball.X + R, Y);
        bg.lineTo(
            ball.X + R + R * Math.cos(-i + Math.PI / 2),
            Y + R * Math.sin(-i + Math.PI / 2)
        );
        bg.strokeStyle = "yellow";
        bg.stroke();

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo( ball.X - R, Y);
        bg.lineTo(
            ball.X - R + R * Math.cos(i + Math.PI),
            Y + R * Math.sin(i + Math.PI)
        );
        bg.strokeStyle = "chartreuse";
        bg.stroke();
        CheckCollisionObs4(
            ball.X - R + R * Math.cos(i + Math.PI),
            Y + R * Math.sin(i + Math.PI),
            "chartreuse",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo(ball.X + R, Y);
        bg.lineTo(
            ball.X + R + R * Math.cos(-i + Math.PI),
            Y + R * Math.sin(-i + Math.PI)
        );
        bg.strokeStyle = "cyan";
        bg.stroke();

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo( ball.X - R, Y);
        bg.lineTo(
            ball.X - R + R * Math.cos(i - Math.PI / 2),
            Y + R * Math.sin(i - Math.PI / 2)
        );
        bg.strokeStyle = "darkorchid";
        bg.stroke();
        CheckCollisionObs4(
            ball.X - R + R * Math.cos(i - Math.PI / 2),
            Y + R * Math.sin(i - Math.PI / 2),
            "darkorchid",
            ball
        );

        bg.beginPath();
        bg.lineWidth = 30;
        bg.moveTo( ball.X + R, Y);
        bg.lineTo(
            ball.X + R + R * Math.cos(-i - Math.PI / 2),
            Y + R * Math.sin(-i - Math.PI / 2)
        );
        bg.strokeStyle = "darkorchid";
        bg.stroke();

        bg.beginPath();
        bg.arc( ball.X - R, Y, 15, 0, 2 * Math.PI, true);
        bg.fillStyle = "pink";
        bg.fill();

        bg.beginPath();
        bg.arc( ball.X + R, Y, 15, 0, 2 * Math.PI, true);
        bg.fillStyle = "pink";
        bg.fill();
    }
}

function CheckCollisionObs4(X, Y, ColourToCheck, ball) {
    if (X <=  ball.X && X >=  ball.X - (ball.Radius + 1)) {
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
            ball.X,
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
            ball.X,
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
            ball.X,
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
            ball.X,
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
        ball.X + Radius * Math.cos(i),
        Y + Radius * Math.sin(i),
        20,
        0,
        2 * Math.PI,
        true
    );
    Check2CircleColl(
        ball.X + Radius * Math.cos(i),
        Y + Radius * Math.sin(i),
        20,
        ball.X,
        ball.Y,
        ball.Radius,
        Colour,
        ball
    );

    Radius += pos;
    bg.moveTo(
        ball.X + Radius * Math.cos(i + Math.PI / 8),
        Y + Radius * Math.sin(i + Math.PI / 8)
    );
    bg.arc(
        ball.X + Radius * Math.cos(i + Math.PI / 8),
        Y + Radius * Math.sin(i + Math.PI / 8),
        20,
        0,
        2 * Math.PI,
        true
    );
    Check2CircleColl(
        ball.X + Radius * Math.cos(i + Math.PI / 8),
        Y + Radius * Math.sin(i + Math.PI / 8),
        20,
        ball.X,
        ball.Y,
        ball.Radius,
        Colour,
        ball
    );

    Radius += pos;
    bg.moveTo(
        ball.X + Radius * Math.cos(i + Math.PI / 4),
        Y + Radius * Math.sin(i + Math.PI / 4)
    );
    bg.arc(
        ball.X + Radius * Math.cos(i + Math.PI / 4),
        Y + Radius * Math.sin(i + Math.PI / 4),
        20,
        0,
        2 * Math.PI,
        true
    );
    Check2CircleColl(
        ball.X + Radius * Math.cos(i + Math.PI / 4),
        Y + Radius * Math.sin(i + Math.PI / 4),
        20,
        ball.X,
        ball.Y,
        ball.Radius,
        Colour,
        ball
    );

    Radius += pos;
    bg.moveTo(
        ball.X + Radius * Math.cos(i + (3 * Math.PI) / 8),
        Y + Radius * Math.sin(i + (3 * Math.PI) / 8)
    );
    bg.arc(
        ball.X + Radius * Math.cos(i + (3 * Math.PI) / 8),
        Y + Radius * Math.sin(i + (3 * Math.PI) / 8),
        20,
        0,
        2 * Math.PI,
        true
    );
    Check2CircleColl(
        ball.X + Radius * Math.cos(i + (3 * Math.PI) / 8),
        Y + Radius * Math.sin(i + (3 * Math.PI) / 8),
        20,
        ball.X,
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
    
    if (Math.sqrt((X2 - X1) * (X2 - X1) + (Y2 - Y1) * (Y2 - Y1)) < R1 + R2)
        if (ball.color != ColourToCheck && ball.ult == 0) Gameover();
}

function Obstacle7(Y, i, bg, ball) {
    if (Y < 2000 && Y > -2000) {
        bg.beginPath();
        bg.lineWidth = 40;
        bg.moveTo(185 - 360 + ball.X, Y + 260);
        bg.lineTo(565 - 360 + ball.X, Y + 270);
        bg.moveTo(225 - 360 + ball.X, Y + 310);
        bg.lineTo(395 - 360 + ball.X, Y);
        bg.moveTo(315 - 360 + ball.X, Y + 10);
        bg.lineTo(525 - 360 + ball.X, Y + 310);

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

        if (ball.Y - ball.Radius < Y + 285 && ball.Y + ball.Radius > Y + 245 || Check2CircleColl(ball.X, Y + 63.82, 60, ball.X, ball.Y, ball.Radius, colorrr,ball))

        if (ball.color != colorrr && ball.ult == 0)
            Gameover();
    }
}

function Obstacle8(Y, i, Radius, bg, ball) {
    if (Y < 2000 && Y > -2000) {
        if (i > Math.PI) Radius = Radius + 10 * (2 * Math.PI - i);
        else Radius = Radius + 10 * i;

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(ball.X, Y, Radius, i, i + Math.PI / 2, false);
        bg.strokeStyle = "cyan";
        bg.stroke();
        CheckCollisionObs1(Y, i, Radius, "cyan", ball);

        bg.beginPath();
        bg.lineWidth = 25;
        bg.arc(ball.X, Y, Radius, i + Math.PI / 2, i + (2 * Math.PI) / 2, false);
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
        bg.arc(ball.X, Y, Radius, i + (2 * Math.PI) / 2, i + (3 * Math.PI) / 2, false);
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
        bg.arc(ball.X, Y, Radius, i + (3 * Math.PI) / 2, i, false);
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
            if (ball.BallTravelled > Y - ball.Yob + 200)
                bg.drawImage(img, 26, 58, 72, 74, ball.X - 25, Y - 25, 50, 50);

                tem = Math.floor(Math.random()*4)+1;

                switch(tem)
                {
                    case 1: colorr="cyan";
                            break;
                    case 2: colorr ="darkorchid";
                            break;
                   case 3:  colorr = "chartreuse";
                            break;
                    case 4: colorr ="yellow";
                            break;              
            }
            if (
                Y > ball.Y - ball.Radius &&
                Y < ball.Y + ball.Radius &&
                ball.BallCovered == ball.BallTravelled 
            ) {
               
                if(changed == 0)
                { 
                    changed = 1;
                    console.log("inside");
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
                        case "chartreuse": ball.color = "cyan";
                                     break;
                        case "darkorchid": ball.color = "yellow";
                                     break;                          

                    }
                }
               }
            }

            else if(Y > ball.Y + ball.Radius + 5 )
            changed = 0;

          
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
            bg.drawImage(img, 691, 56, 97, 97, ball.X - 25, Y - 25, 50, 50);
            if (ball.Y - ball.Radius < Y && ball.Y + ball.Radius > Y) {
                ball.ult = 1;
                if (ball.Y + ball.Radius > Y - 25) ball.time = 0;
            }
        }

        if (Y > ball.Y + ball.Radius && ball.ult == 1) {
            
            tem = Math.floor(Math.random()*4)+1;

            switch(tem)
            {
                case 1: ball.color="cyan";
                        break;
                case 2: ball.color ="darkorchid";
                        break;
               case 3: ball.color = "chartreuse";
                        break;
                case 4: ball.color ="yellow";
                        break;              
        }
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
        bg.drawImage(img, 164, 61, 82, 77, ball.X - 25, Y - 25, 50, 50);
        if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) ball.Radius = 25;
    }
}

function RadiusDec(Y, bg, ball) {
    if (Y > -2000 && Y < 2000 && ball.Radius != 10) {
        bg.drawImage(img, 561, 62, 85, 87, ball.X - 25, Y - 25, 50, 50);
        if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) ball.Radius = 10;
    }
}

function SpeedInc(Y, bg, ball) {
    if (Y > -2000 && Y < 2000 && Math.abs(ball.speed) != 0.02) {
        bg.drawImage(img, 314, 62, 78, 77, ball.X - 25, Y - 25, 50, 50);
        if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) ball.speed = 0.02;
    }
}

function SpeedDec(Y, bg, ball) {
    if (Y > -2000 && Y < 2000) {
        if (Math.abs(ball.speed) != 0.007) {
            bg.drawImage(img, 440, 67, 76, 76, ball.X - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius)
                ball.speed = 0.007;
        }
    }
}

function Clockwise(Y, bg, ball) {
    if (Y > -2000 && Y < 2000) {
        if (ball.speed > 0) {
            bg.drawImage(img, 163, 202, 107, 85, ball.X - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) {
                ball.speed = -ball.speed;
            }
        }
    }
}

function AntiClockwise(Y, bg, ball) {
    if (Y < 2000 && Y > -2000) {
        if (ball.speed < 0) {
            bg.drawImage(img, 33, 208, 96, 78, ball.X - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) {
                ball.speed = -ball.speed;
            }
        }
    }
}

function Normal(Y, bg, ball) {
    if (Y < 700 && Y > -2000) {
        if (ball.speed != 0.01 || ball.Radius != 15) {
            bg.drawImage(img, 317, 201, 87, 85, ball.X - 25, Y - 25, 50, 50);
            if (Y > ball.Y - ball.Radius && Y < ball.Y + ball.Radius) {
                ball.speed = 0.01;
                ball.Radius = 15;
            }
        }
    }
}
