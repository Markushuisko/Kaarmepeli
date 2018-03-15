/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var game_added = false;
var game_state = false;
jQuery("#play-game").click(function () {
//    var canvas_element = jQuery("#canvas");
//    jQuery("")
    if (!game_added) {
        jQuery("#canvas-wrapper").prepend('<canvas id="canvas" width="500" height="500"></canvas>');
        jQuery("#play-game").html("Pause Game");
        game_added = true;
        game_state = true;
        jQuery("#canvas").focus();
        play_snake();

    }

});
//jQuery(document).ready(function (jQuery) {
//Canvas stuff
function play_snake() {
    var canvas = jQuery("#canvas");
    var ctx = canvas.getContext("2d");
    var w = jQuery("#canvas").width();
    var h = jQuery("#canvas").height();

    //Lets save the cell width in a variable for easy control
    var cw = 10;
    var d;
    var food;
    var poison1;
    var poison2;
    var score;
    var minx;
    var miny;
    var maxx;
    var maxy;
    var life;
    var wall_arrayv;
    var wall_arrayh;
    //Lets create the snake now
    var snake_array; //an array of cells to make up the snake
    canvas.setAttribute("tabindex", 0);
    canvas.addEventListener('keydown', handleKeydown, true);
    function handleKeydown(event) {
        event.preventDefault();
//        alert("fdghjk");
        var key = event.which;
        if (key == "32")
            pause();
        else if (key == "80")
            play();
        else if (key == "82") {
            init();
            play();
        } else if (key == "37" && d != "right")
            d = "left";
        else if (key == "38" && d != "down")
            d = "up";
        else if (key == "39" && d != "left")
            d = "right";
        else if (key == "40" && d != "up")
            d = "down";

    }
    jQuery("#play-game").click(function () {
        if (game_state) {
            game_state = false;
            jQuery("#play-game").html("Play Game");
            pause();

        }else{
            jQuery("#canvas").focus();
            game_state = true;
            jQuery("#play-game").html("Pause Game");
            play();

        }
        console.log("asdjkl");
    });
    play();
//    jQuery(document).keydown(function (e) {
////        if (jQuery("#canvas-wrapper").is(':focus')) {
////            e.preventDefault();
//            var key = e.which;
//            if (key == "32")
//                pause();
//            else if (key == "80")
//                play();
//            else if (key == "82") {
//                init();
//                play();
//            }
//            //The snake is now keyboard controllable
////        }
//    })

//    this.play = function()
//    {
//        if (typeof Game_Interval != "undefined")
//            clearInterval(Game_Interval);
//        Game_Interval = setInterval(paint, 80);
//        allowPressKeys = true;
//    }
    function play()
    {
        if (typeof Game_Interval != "undefined")
            clearInterval(Game_Interval);
        Game_Interval = setInterval(paint, 80);
        allowPressKeys = true;
    }

    function pause()
    {
        clearInterval(Game_Interval);
        allowPressKeys = false;
    }

    function init()
    {
        d = "right"; //default direction
        create_wall_vertical();
        create_wall_horizontal();
        create_snake();
        create_food(); //Now we can see the food particle
        create_poison1();
        create_poison2();
        //finally lets display the score
        score = 0;
        life = 3;

        //Lets move the snake now using a timer which will trigger the paint function
        //every 60ms
//        if (typeof game_loop != "undefined")
//            clearInterval(game_loop);
//        game_loop = setInterval(paint, 80);
    }
    init();

    function create_wall_vertical() {
        var length = 10;
        wall_arrayv = []; //Empty array to start with
        randomy = Math.round(getRandomArbitrary_y(1, 40));
        randomx = Math.round(getRandomArbitrary_x(1, 50));
        if (randomx < 25) {
            randomx = 0;
        }
        else {
            randomx = 49;
        }
        wall_arrayv.push({x: randomx, y: randomy});
        wall = wall_arrayv.pop();

        for (var i = length - 1; i >= 0; i--)
        {
            //This will create a horizontal snake starting from the top left
            wall_arrayv.push({x: wall.x, y: wall.y + i});
        }
    }
    function create_wall_horizontal() {
        var length = 10;
        wall_arrayh = []; //Empty array to start with
        randomx = Math.round(getRandomArbitrary_y(1, 40));
        randomy = Math.round(getRandomArbitrary_x(1, 50));
        if (randomy < 25) {
            randomy = 0;
        }
        else {
            randomy = 49;
        }
        wall_arrayh.push({x: randomx, y: 49});
        wall = wall_arrayh.pop();

        for (var i = length - 1; i >= 0; i--)
        {
            //This will create a horizontal snake starting from the top left
            wall_arrayh.push({x: wall.x + i, y: wall.y});
        }
    }
    function create_snake()
    {
        var length = 5; //Length of the snake
        snake_array = []; //Empty array to start with
        for (var i = length - 1; i >= 0; i--)
        {
            //This will create a horizontal snake starting from the top left
            snake_array.push({x: i, y: 0});
        }
    }

    //Lets create the food now
    function create_food()
    {
        food = {
            x: Math.round(Math.random() * (w - 20) / cw),
            y: Math.round(Math.random() * (h - 20) / cw),
        };

        //This will create a cell with x/y between 0-44
        //Because there are 45(450/10) positions accross the rows and columns
    }

    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    function create_poison1()
    {
        if (food.x >= 48) {
            minx = 47 + 1;
            maxx = 47 + 2;
            miny = food.y + 1;
            maxy = food.y + 2;
        }
        else if (food.y >= 48) {
            minx = food.x + 1;
            maxx = food.x + 2;
            miny = 47 + 1;
            maxy = 47 + 2;
        }
        else {
            minx = food.x + 1;
            maxx = food.x + 2;
            miny = food.y + 1;
            maxy = food.y + 2;
        }
        minx = food.x + 1;
        maxx = food.x + 2;
        miny = food.y + 1;
        maxy = food.y + 2;
        poison1 = {
            x: Math.round(getRandomArbitrary_x(minx, maxx)),
            y: Math.round(getRandomArbitrary_y(miny, maxy)),
        };
    }
    function create_poison2()
    {
        if (food.x <= 1) {
            minx = 2 - 1;
            maxx = 2 - 2;
            miny = food.y - 2;
            maxy = food.y - 1;
        }
        else if (food.y <= 1) {
            minx = food.x - 1;
            maxx = food.x - 2;
            miny = 2 - 2;
            maxy = 2 - 1;
        }
        else {
            minx = food.x - 2;
            maxx = food.x - 1;
            miny = food.y - 2;
            maxy = food.y - 1;
        }

        poison2 = {
            x: Math.round(getRandomArbitrary_x(minx, maxx)),
            y: Math.round(getRandomArbitrary_y(miny, maxy)),
        };

    }

    function getRandomArbitrary_x(min, max) {
        return Math.random() * (max - min) + min;
    }
    function getRandomArbitrary_y(min, max) {
        return Math.random() * (max - min) + min;
    }

    //Lets paint the snake now
    function paint()
    {
        //To avoid the snake trail we need to paint the BG on every frame
        //Lets paint the canvas now
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);

        //The movement code for the snake to come here.
        //The logic is simple
        //Pop out the tail cell and place it infront of the head cell
        var nx = snake_array[0].x;
        var ny = snake_array[0].y;
        //These were the position of the head cell.
        //We will increment it to get the new head position
        //Lets add proper direction based movement now
        if (d == "right")
            nx++;
        else if (d == "left")
            nx--;
        else if (d == "up")
            ny--;
        else if (d == "down")
            ny++;

        if (nx == -1) //If Snake hits Wall then resetting the head position
        {                //We can write exit conditon here instead of resetting the position.
            nx = w / cw - 1;
        } else if (nx == w / cw)
        {
            nx = 0;
        }
        if (ny == -1)
        {
            ny = h / cw - 1;
        }
        else if (ny == h / cw)
        {
            ny = 0;
        }

        //Lets add the game over clauses now
        //This will restart the game if the snake hits the wall
        //Lets add the code for body collision
        //Now if the head of the snake bumps into its body, the game will restart
        if (check_collision(nx, ny, snake_array) || life == 0 || check_collision(nx, ny, wall_arrayv) || check_collision(nx, ny, wall_arrayh))
        {
            //restart game
            alert("Game Over Your score is " + score);
            init();
            play();
            //Lets organize the code a bit now.
            return;
        }
        //Lets write the code to make the snake eat the food
        //The logic is simple
        //If the new head position matches with that of the food,
        //Create a new head instead of moving the tail
        if (nx == food.x && ny == food.y)
        {
            var tail = {x: nx, y: ny};
            score++;
            //Create new food
            create_food();
            create_poison1();
            create_poison2();
        }
        else if ((nx == poison1.x && ny == poison1.y) || (nx == poison2.x && ny == poison2.y))
        {
            var tail = snake_array.pop();
            tail = snake_array.pop();
            tail.x = nx;
            tail.y = ny;
            life--;
            //Create new food
            create_food();
            create_poison1();
            create_poison2();

        }
        else
        {
            var tail = snake_array.pop(); //pops out the last cell

            tail.x = nx;
            tail.y = ny;
        }
        //The snake can now eat the food.

        snake_array.unshift(tail); //puts back the tail as the first cell

        for (var i = 0; i < snake_array.length; i++)
        {
            var c = snake_array[i];
            //Lets paint 10px wide cells
            paint_cell(c.x, c.y);
        }
        for (var i = 0; i < wall_arrayv.length; i++)
        {
            var c = wall_arrayv[i];
            //Lets paint 10px wide cells
            paint_cell_wall(c.x, c.y);
        }

        for (var i = 0; i < wall_arrayh.length; i++)
        {
            var c = wall_arrayh[i];
            //Lets paint 10px wide cells
            paint_cell_wall(c.x, c.y);
        }

        //Lets paint the food
        paint_cell(food.x, food.y);
        paint_cell_poison(poison1.x, poison1.y);
        paint_cell_poison(poison2.x, poison2.y);
        //Lets paint the score
        var score_text = "Score: " + score;
        var life_text = "Life:" + life;
        ctx.fillText(score_text, 5, h - 5);
        ctx.fillText(life_text, w - 50, h - 5);
    }

    //Lets first create a generic function to paint cells
    function paint_cell_wall(x, y) {
        ctx.fillStyle = "black";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = "black";
        ctx.strokeRect(x * cw, y * cw, cw, cw);
    }

    function paint_cell(x, y) {
        ctx.fillStyle = "blue";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x * cw, y * cw, cw, cw);
    }
    function paint_cell_poison(x, y)
    {
        ctx.fillStyle = "red";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x * cw, y * cw, cw, cw);
    }
    function check_collision(x, y, array)
    {
        //This function will check if the provided x/y coordinates exist
        //in an array of cells or not
        for (var i = 0; i < array.length; i++)
        {
            if (array[i].x == x && array[i].y == y)
                return true;
        }
        return false;
    }

    //Lets add the keyboard controls now
//    jQuery(document).keydown(function (e) {
//        var key = e.which;
//        //We will add another clause to prevent reverse gear
//        if (key == "37" && d != "right")
//            d = "left";
//        else if (key == "38" && d != "down")
//            d = "up";
//        else if (key == "39" && d != "left")
//            d = "right";
//        else if (key == "40" && d != "up")
//            d = "down";
//
//        //The snake is now keyboard controllable
//    });
}
//});
