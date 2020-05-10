const ground = new Image(),
    food = new Image(),
    cvs = document.getElementById("cvs"),
    ctx = cvs.getContext("2d"),
    box = 32;

var score = 0, 
    gameManager, 
    foodPosition = {
        x: Math.floor(Math.random() * 17 + 1)  * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    },
    snake = [{
        x: 9 * box,
        y: 10 * box
    }], dir;

ground.src = "ground.png";
food.src = "food.png";

document.body.onkeydown = (event) => {
    if (event.keyCode === 37 && dir !== "x:1") dir = "x:-1";
    else if (event.keyCode === 38 && dir !== "y:1") dir = "y:-1";
    else if (event.keyCode === 39 && dir !== "x:-1") dir = "x:1";
    else if (event.keyCode === 40 && dir !== "y:-1") dir = "y:1";
};

function draw() {
    ctx.drawImage(ground, 0, 0);

    for (var i = snake.length - 1; i > -1; i--) {
        var rect = snake[i];
        ctx.fillStyle = snake.indexOf(rect) === 0 ? "green" : "red";
        ctx.fillRect(rect.x, rect.y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);
    var sX = snake[0].x, sY = snake[0].y;

    if (sX === foodPosition.x && sY === foodPosition.y) {
        score++;

        foodPosition = {
            x: Math.floor(Math.random() * 17 + 1)  * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else snake.pop();

    if (dir && dir.split(":")[0] === "x") sX += box * +dir.split(":")[1];
    else if (dir && dir.split(":")[0] === "y") sY += box * +dir.split(":")[1];

    if (sX === 0 && dir === "x:-1") sX = 17 * box;
    if (sY === box * 2 && dir === "y:-1") sY = 17 * box;
    if (sX === 18 * box && dir === "x:1") sX = box;
    if (sY === 18 * box && dir === "y:1") sY = box * 3;

    snake.unshift({x: sX, y: sY});

    ctx.drawImage(food, foodPosition.x, foodPosition.y);
}

food.onload = () => gameManager = setInterval(draw, 100);