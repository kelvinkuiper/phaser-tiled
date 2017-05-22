
BasicGame.Game = function (game) {
    
};

BasicGame.Game.prototype = {

    create: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = this.add.tilemap('mario');
        this.map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

        this.backgroundLayer = this.map.createLayer('background');
        this.blockedLayer = this.map.createLayer('floor');

        this.map.setCollision([15, 24], true, this.blockedLayer);

        //  This resizes the game world to match the layer dimensions
        this.backgroundLayer.resizeWorld();       
        
        //  Here we create our coins group
        this.coins = this.add.group();
        this.coins.enableBody = true;

        // Here we create coins for each coin in objectlayer
        this.map.createFromObjects('coins', 11, 'coin', 0, true, false, this.coins);

        this.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
        this.coins.callAll('animations.play', 'animations', 'spin');

        this.player = new BasicGame.Player(this.game, 10, 10);
        this.add.existing(this.player);

        this.score = 0;

       

    },

    update: function () {
        var playerHitsPlatform = this.physics.arcade.collide(this.player, this.blockedLayer);
        var playerHitsPickup = this.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, { game: this });
    },

    collectCoin: function(player, coin) {

        var points;

        // if coin has property 'points' use that, else use 100
        if(coin.points) {
            points = coin.points;
        }
        else {
            points = 1;
        }

        console.log('je scoorde', points)

        // destroy coin from game
        coin.destroy();

        //add points to the score
        this.game.score = this.game.score + points;

        console.log('je score is nu', this.game.score);
    }

};

BasicGame.Player = function(game, x, y) {
    
    Phaser.Sprite.call(this, game, x, y, 'dude');
    
    this.game.physics.arcade.enable(this);
    
    this.body.gravity.y = 600;
    this.speed = 120;

    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);

    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.jump.bind(this));
}

BasicGame.Player.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Player.prototype.constructor = BasicGame.Player;

BasicGame.Player.prototype.update = function () {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.body.velocity.x = -this.speed;
        this.animations.play('left');
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.body.velocity.x = this.speed;
        this.animations.play('right');
    } else {
        //idle
        this.body.velocity.x = 0;
        this.animations.stop();
        this.frame = 4;
    }
}

BasicGame.Player.prototype.jump = function () {
    //  Allow the player to jump if they are touching the ground.
    if(this.body.onFloor()) {
        this.body.velocity.y = -300;
        //enable player to double jump
        this.mayDoubleJump = true;
    }
    else {
       // player is not touching down, allow the player to do 1 double jump
       if(this.mayDoubleJump) {
           this.body.velocity.y = -300;
           //disable the player to double jump
           this.mayDoubleJump = false;
       }
    }
}


