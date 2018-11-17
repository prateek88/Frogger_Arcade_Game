// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // IF enemy is out of frame, reset it's position to beginning of the frame
    if ( this.x > 500)
    {
      this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  // image for player
  this.sprite = 'images/char-boy.png';

  // Initial coodinates of player
  this.x = 200;
  this.y = 390;
  this.won = false;
}

// Update method for player, this is called by main() in engine.js
Player.prototype.update = function() {
  // What happens at collision with any of the enemy
  for (var enemy of allEnemies)
  {
    if ((this.y === enemy.y) && (enemy.x + 80 > this.x && enemy.x < this.x + 80))
    {
      // return to original location
      this.reset();
    }
  }
  // What happens when player wins the game
  if (this.y == -10)
  {
    // win the game and return to original location
    this.won = true;
  }
}

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// player's reset logic
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 390;
}

// Draw the player on the screen
Player.prototype.handleInput = function(key) {
  // if left key is pressed, move player to left by 100
  if (key === "left" && this.x >= 100)
  {
    this.x -= 100;
  }
  // if right key is pressed, move player to right by 100
  if (key === "right" && this.x <= 300)
  {
    this.x += 100;
  }
  // if up key is pressed, move player up by 80
  if (key === "up" && this.y >= 70)
  {
    this.y -= 80;
  }
  // if down key is pressed, move player down by 80
  if (key === "down" && this.y <= 320)
  {
    this.y += 80;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0,70,80);
var enemy2 = new Enemy(0,150,70);
var enemy3 = new Enemy(0,230,90);
var enemy4 = new Enemy(0,70,50);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
