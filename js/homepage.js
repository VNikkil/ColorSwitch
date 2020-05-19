//Creating the logo for the homepage

var canvas = document.querySelector("canvas");
canvas.width = 720;
canvas.height = window.innerHeight/2 +50;
var bg = canvas.getContext('2d'); 

var Y1 = 50,U1=10,g = -1.6,t1=0,Y2 = 50,U2 =10,t2 = 0;
let imgclr = new Image();
imgclr.src = 'images/CLR.png';

let imgo = new Image();
imgo.src = 'images/O.png';

let imgswitch = new Image();
imgswitch.src = 'images/SWITCH.png';



animateBG();
function animateBG(){
    requestAnimationFrame(animateBG);
    
    bg.clearRect(0,0,canvas.width,canvas.height);
    bg.drawImage(imgclr, 4, 219, 605, 154,50,50,550,140);
    bg.drawImage(imgo, 223, 253, 119, 121,180,Y1,100,100);
    bg.drawImage(imgswitch,40,208,548,104,150,260,550,140);
    bg.drawImage(imgo, 223, 253, 119, 121,380,Y2,100,100);
    shadow(U1,Y1,50,230);
    shadow(U2,Y2,50,430);
    if(Y1 >=  180)
    {
        Y1 = 179;
        U1=Math.random() * 20 + 10;
        t1=0;
    }  

    else{
        Y1 = Y1 - U1*t1 - (0.5)*g*t1*t1 ;
        t1 = 0.3;
        U1 = U1 + g*t1;
    }

    if(Y2 >=  180)
    {
        Y2 = 179;
        U2=Math.random() * 20 + 10;
        t2=0;
    }  

    else{
        Y2= Y2 - U2*t2 - (0.5)*g*t2*t2 ;
        t2 = 0.3;
        U2 = U2 + g*t2;
    }

}

function shadow(U,Y,R,X)
{
    for(var j=0;j<1;j++)
    {
        Y += U+40;
      
        bg.beginPath();
        bg.arc(X,Y,R,0,2*Math.PI,true);
        a = 0.5 - j*0.2;
        bg.fillStyle = "rgba(255,255,0," +a+")";
        bg.fill();
         
    }
}
