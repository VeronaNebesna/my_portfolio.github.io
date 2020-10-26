
let canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

//---------- description balls

function randomAngle (min, max){
    return Math.floor(Math.random() * (max-min +1))
}

let balls=[]
let x_random;
let y_random;
let dxy =0.2
let countOfDots = 200;

for(let i=0; i<countOfDots;  i++){
    let ball_items={
        x: randomCord(0, canvas.width),    // положення у просторі
        y:randomCord(0, canvas.height), 
        dxy: dxy,  //положення у просторі
        angle:randomCord(0, 2*Math.PI),     
        radius:1,
        color:"white",
    };
    balls.push(ball_items)
}
 function randomCord(min, max){
     return min + Math.random()*(max -min+1)
 }

function drawBalls (){
    for(let ball_items of balls){
        ctx.beginPath();
        ctx.arc(ball_items.x, ball_items.y, ball_items.radius, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle=ball_items.color
        ctx.fill();
    }
}

let distance=70;
function drawLines(){
    for (let i = 0; i<countOfDots-1; i++){
        for(let j=i+1; j<countOfDots; j++){
            let dotX=balls[i];
            let dotY=balls[j];
            let distanceDots = getDistance(dotX,dotY);
                if(distanceDots <= distance){
                    ctx.strokeStyle= "white";
                    ctx.moveTo(dotX.x, dotX.y);
                    ctx.lineWidth=0.01
                    ctx.lineTo(dotY.x, dotY.y);
                    ctx.stroke();
                }
            }
    }
}

function getDistance(a,b){
    return ((a.x-b.x)**2 + (a.y-b.y)**2)**0.5
}

//----------------------------------- MAIN FUNCTION--------------------

function draw(){
    requestAnimationFrame(draw);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawLines();
    drawBalls();
    for(let ball_item of balls){
            ball_item.x += ball_item.dxy * Math.sin(ball_item.angle);
            ball_item.y += ball_item.dxy* Math.cos(ball_item.angle);
        if(ball_item.radius + ball_item.x > canvas.width){
            ball_item.x = canvas.width - ball_item.x
        }
         if(ball_item.radius + ball_item.x <0){
            ball_item.x = canvas.width + ball_item.x
        }
        if(ball_item.radius + ball_item.y > canvas.height){
            ball_item.y = canvas.height - ball_item.y
        }
         if(ball_item.radius + ball_item.y < 0){
            ball_item.y = canvas.height + ball_item.y
        }
    }
   
}
requestAnimationFrame(draw);

// // animate jquery
// $(".div_for_canvas").click(function(){
//     $(this).animate({
//         opacity:0,       
//     },1000, "linear")
// } )


$(".navigation").click(function(){
    $(this).toggleClass("active");
    if($(".navigation").hasClass("active")){
        $(".menu").removeClass("hidden");
        $(".menu").addClass("active_menu")

    }else{
        $(".menu").removeClass("active_menu");
        $(".menu").addClass("hidden")
    }
})

$(document).ready(function(){
    $("nav li a").click(function () { 
    elementClick = $(this).attr("href");
    destination = $(elementClick).offset().top;
    $("body,html").animate({scrollTop: destination 
}, 800); 
}) }) 

