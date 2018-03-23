// var game_added = false;
// var game_state = false;
// jQuery("#play-game").click(function () {
//
//     if (!game_added) {
//         jQuery("#canvas-wrapper").prepend('<canvas id="canvas" width="500" height="500"></canvas>');
//         jQuery("#play-game").html("Pause Game");
//         game_added = true;
//         game_state = true;
//         jQuery("#canvas").focus();
//         play_snake();
//
//     }
// });

$(document).ready(function () {
  play_snake();
});


function play_snake() {
    var canvas = jQuery("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = jQuery("#canvas").width();
    var h = jQuery("#canvas").height();

    var cw = 10;
    var d;
    var food;
    var poison1;
    var poison2;
    var poison3;
    var poison4;
    var score;
    var minx;
    var miny;
    var maxx;
    var maxy;
    var life;
    var wall_arrayv;
    var wall_arrayh;
    var snake_array;

    var monsterImage = new Image();
      monsterImage.onload = function() {
        ctx.drawImage(monsterImage, 250, 280);
      };
      monsterImage.src = "hero.png";

    function rand() {
      return Math.floor(Math.random()*b + a);
    }

    var monster = {};
      monster.height = 32;
      monster.width = 30;
      monster.x = 100;
      monster.y = 100;


    var render = function () {
            //ctx.clearRect (0, 0, canvas.width, canvas.height);
            ctx.drawImage(monsterImage, monster.x, monster.y);
    };

    var main = function() {
      render();
    };

    var moveMonster = function() {

        monster.x += monster.xDirection;
        monster.y += monster.yDirection;
        updateMonsterDirection (monster);
       resetObjectLocation (monster);
    };



    var updateMonsterDirection = function() {
        monster.xDirection = ((Math.random() < 0.5)? -1 : 1) * Math.random() * monster.speed;
        monster.yDirection = ((Math.random() < 0.5)? -1 : 1) * Math.random() * monster.speed;

    };

    var resetObjectLocation = function(object) {
        if(object.y < 0) {
            object.y = 0;
        }
        if(object.x < 0) {
            object.x = 0;
        }
        if (object.y > (canvas.height - object.height)) {
            object.y = canvas.height - object.height;
        }
        if (object.x > (canvas.width - object.width)) {
            object.x = canvas.width - object.width;
        }
    }

      monster.speed = 15;
      monster.xDirection = monster.speed;
      monster.yDirection = monster.speed;

      var slayMonster = function() {
        if((hero.x <= (monster.x + 32)) && (monster.x <= (hero.x + 32)) && (hero.y <= (monster.y + 32)) && (monster.y <= (hero.y + 32))) {
      ++hero.monstersSlain;
      spawnMonster();
      }
    };

      var isTouching = function(a, b) {
        var ret = false;
        if((a.x <= (b.x + b.width)) && (b.x <= (a.x + b.width)) && (a.y <= (b.y + b.height)) && (b.y <= (a.y + b.height))) {
          ret = true;
        }
        return ret;
      };
  /*    var enemyList = {};

      getDistanceBetweenEntity = function (entity1, enity2) {
        var vx = entity1.x - entity2.x;
        var vy = entity1.y - entity2.y;
        return Math.sqrt(vx*vx+vy*vy);
      }

      testCollisionEntity = function (entity1, entity2) {
        var rect1 = {
            x:entity1.x-entity1.width/2,
            y:entity1.y-entity1.height/2,
            width: entity1.width,
            height: entity1.height,
        }
        var rect2 = {
            x:entity2.x-entity2.width/2,
            y:entity2.y-entity2.height/2,
            width: entity2.width,
            height: entity2.height,
        }
        return testCollisionRectRect(rect1,rect2);
    }

    monster = function (id,x,y,spdX,spdY,width,height) {
        var monster = {
            x:x,
            spdX:spdX,
            y:y,
            spdY:spdY,
            name:'E',
            id:id,
            width:width,
            height:height,
            color:'red',
        };
        enemyList[id] = monster;
    }

    updateEntity = function () {
        updateEntityPosition(something);
        drawmonster(something)
      }

    updateEntityPosition = function () {
        something.x += something.spdX;
        something.y += something.spdY;

        if(something.x < 0 || something.x > WIDTH) {
            something.spdX = -something.spdY;
        }
      }

    testCollisionRectRect = function(rect1,rect2) {
        return rect1.x <= rect2.x+rect2.width
          && rect2.x <= rect1.x+rect1.width
          && rect1.y <= rect2.y + rect2.height
          && rect2.y <= rect1.y + rect1.height;
        }

    drawEntity = function(something) {
        ctx.save();
        ctx.fillStyle = something.color;
        ctx.fillRect(something.x-something.width/2,something.y-something.height/2,something.width,something.height);
        ctx.restore();
    } */




    canvas.setAttribute("tabindex", 0);
    canvas.addEventListener('keydown', handleKeydown, true);
    function handleKeydown(event) {
        event.preventDefault();

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

            if (
  		hero.x <= (monster.x + 32)
  		&& monster.x <= (hero.x + 32)
  		&& hero.y <= (monster.y + 32)
  		&& monster.y <= (hero.y + 32)
  	) {
  		++monstersCaught;
  		reset();
  	}
    }

    jQuery("#play-game").click(function () {
        if (game_state) {
            game_state = false;
            jQuery("#play-game").html("Play Game");
            pause();

        } else {
            jQuery("#canvas").focus();
            game_state = true;
            jQuery("#play-game").html("Pause Game");
            play();

        }
    });

    play();

    function play() {
      /*  if (typeof Game_Interval != "undefined")
            clearInterval(Game_Interval);
        Game_Interval = setInterval(paint, 380);
        allowPressKeys = true; */
        if (typeof game_loop != "undefined")
           clearInterval(game_loop);
        game_loop = setInterval(paint, 80);

    }

    function pause() {
        clearInterval(game_loop);
        allowPressKeys = false;
    }

    function init() {
        d = "right";
        create_wall_vertical();
        create_wall_horizontal();
        create_snake();
        create_food();
        create_poison1();
        create_poison2();
        create_poison3();
        create_poison4();

        score = 0;
        life = 3;

        //Lets move the snake now using a timer which will trigger the paint function
        // 1 minuutin timer, nyt ei ole käytössä
      /*  if (typeof game_loop != "undefined")
           clearInterval(game_loop);
        game_loop = setInterval(paint, 80); */
    }
    init();

      // Pystysuora
    function create_wall_vertical() {
        var length = 10;
        wall_arrayv = [];
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
            wall_arrayv.push({x: wall.x, y: wall.y + i});
        }
    }

      //vaakasuora
    function create_wall_horizontal() {
        var length = 10;
        wall_arrayh = [];
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

        for (var i = length - 1; i >= 0; i--) {
            wall_arrayh.push({x: wall.x + i, y: wall.y});
        }
    }
    function create_snake() {
        var length = 5; //Käärmeen pituus
        snake_array = [];
        for (var i = length - 1; i >= 0; i--)
        {
            snake_array.push({x: i, y: 0, c: i, v: 0});
        }
    }

    //Ruoka



    function create_food() {
        food = {
            x: Math.round(Math.random() * (w - 20) / cw),
            y: Math.round(Math.random() * (h - 20) / cw),
        };
    }

    function create_poison1() {
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
        maxx = food.x + 5;
        miny = food.y + 2;
        maxy = food.y + 5;
        poison1 = {
            x: Math.round(Math.random() * (w - 10) / cw),
            y: Math.round(Math.random() * (h - 20) / cw),
        };

    }

    function create_poison2() {
        if (food.x <= 1) {
            minx = 2 - 1;
            maxx = 2 - 2;
            miny = food.y - 2;
            maxy = food.y - 1;
        }
        else if (food.y <= 1) {
            minx = food.x - 2;
            maxx = food.x - 3;
            miny = 4 - 2;
            maxy = 4 - 2;
        }
        else {
            minx = food.x - 4;
            maxx = food.x - 3;
            miny = food.y - 2;
            maxy = food.y - 4;
        }

        poison2 = {
            x: Math.round(Math.random() * (h - 30) / cw),
            y: Math.round(Math.random() * (h - 25) / cw),
        };
    }

    function create_poison3() {
        if (food.x <= 1) {
            minx = 2 - 1;
            maxx = 2 - 2;
            miny = food.y - 2;
            maxy = food.y - 1;
        }
        else if (food.y <= 1) {
            minx = food.x - 2;
            maxx = food.x - 3;
            miny = 4 - 2;
            maxy = 4 - 2;
        }
        else {
            minx = food.x - 4;
            maxx = food.x - 3;
            miny = food.y - 2;
            maxy = food.y - 4;
        }

        poison3 = {
            x: Math.round(Math.random() * (h - 30) / cw),
            y: Math.round(Math.random() * (h - 25) / cw),
        };
    }

    function create_poison4() {
        if (food.x <= 1) {
            minx = 2 - 1;
            maxx = 2 - 2;
            miny = food.y - 2;
            maxy = food.y - 1;
        }
        else if (food.y <= 1) {
            minx = food.x - 2;
            maxx = food.x - 3;
            miny = 4 - 2;
            maxy = 4 - 2;
        }
        else {
            minx = food.x - 4;
            maxx = food.x - 3;
            miny = food.y - 2;
            maxy = food.y - 4;
        }

        poison4 = {
            x: Math.round(Math.random() * (h - 30) / cw),
            y: Math.round(Math.random() * (h - 25) / cw),
        };
    }

    function getRandomArbitrary_x(min, max) {
        return Math.random() * (max - min) + min;
    }
    function getRandomArbitrary_y(min, max) {
        return Math.random() * (max - min) + min;
    }

    //Käärmeen painttaus
    function paint() {


        ctx.fillStyle = "#e6e6ff";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);

        var nx = snake_array[0].x;
        var ny = snake_array[0].y;
        var nc = snake_array[0].c;
        var nv = snake_array[0].v;

        if (d == "right")
            nx++;
        else if (d == "left")
            nx--;
        else if (d == "up")
            ny--;
        else if (d == "down")
            ny++;

        if (nx == -1) {
            nx = w / cw - 1;
        } else if (nx == w / cw) {
            nx = 0;
        }
        if (ny == -1) {
            ny = h / cw - 1;
        }
        else if (ny == h / cw) {
            ny = 0;
        }



      if (check_collision(nx, ny, snake_array) || life == 0 || check_collision(nx, ny, wall_arrayv) || check_collision(nx, ny, wall_arrayh)) {
            //pelin restarttaus
          alert("Peli loppui. Pisteesi on " + score);
          document.getElementById('pelialue').style.visibility = 'hidden';
          pause();




          // init();
          // play();

          return;
        }


          //Käärme pystyy syöda ruokia
        if (nx == food.x && ny == food.y) {
            var tail = {x: nx, y: ny};
            score++;
            //Uusi ruoka
            create_food();
            create_poison1();
            create_poison2();
            create_poison3();
            create_poison4();
        }

        else if ((nx == poison1.x && ny == poison1.y) || (nx == poison2.x && ny == poison2.y) || (nx == poison3.x && ny == poison3.y) || (nx == poison4.x && ny == poison4.y)){
          var tail = snake_array.pop();
          tail = snake_array.pop();
          tail.x = nx;
          tail.y = ny;
          tail.c = nc;
          tail.v = nv;
          life--;

            create_food();
            create_poison1();
            create_poison2();
            create_poison3();
            create_poison4();
        }
        else {
          var tail = snake_array.pop();
          tail.x = nx;
          tail.y = ny;
          tail.c = nc;
          tail.v = nv;
        }
        //Käärme pystyy nyt syömään

        snake_array.unshift(tail);

        for (var i = 0; i < snake_array.length; i++) {
            var c = snake_array[i];
            paint_cell(c.x, c.y);
        }

        for (var i = 0; i < wall_arrayv.length; i++) {
            var c = wall_arrayv[i];
            paint_cell_wall(c.x, c.y);
        }

        for (var i = 0; i < wall_arrayh.length; i++) {
            var c = wall_arrayh[i];
            paint_cell_wall(c.x, c.y);
        }



        //Ruoan painttaus
        paint_cell(food.x, food.y);

        paint_cell_poison(poison1.x, poison1.y);
        paint_cell_poison(poison2.x, poison2.y);
        paint_cell_poison(poison3.x, poison3.y);
        paint_cell_poison(poison4.x, poison4.y);
        render();
        moveMonster();

        //Pisteiden painttaus
        var score_text = "Pisteet: " + score;
        var life_text = "Elämät:" + life;
        ctx.fillText(score_text, 5, h - 5);
        ctx.fillText(life_text, w - 50, h - 5);
    }


    function paint_cell_wall(x, y) {
        ctx.fillStyle = "#800000";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = "#800000";
        ctx.strokeRect(x * cw, y * cw, cw, cw);
    }

    function paint_cell(x, y) {
        ctx.fillStyle = "#00b300";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = "#003300";
        ctx.strokeRect(x * cw, y * cw, cw, cw);
    }

    function paint_cell_poison(x, y) {
        ctx.fillStyle = "red";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = "#800000";
        ctx.strokeRect(x * cw, y * cw, cw, cw);
    }

    function check_collision(x, y, array) {

        for (var i = 0; i < array.length; i++)
        {
            if (array[i].x == x && array[i].y == y)
                return true;
        }
        return false;
    }

    function toggledisplay(pojot)
    {
        (function(style) {
            style.display = style.display === 'none' ? '' : 'none';
        })(document.getElementById(pojot).style);
    }

}
