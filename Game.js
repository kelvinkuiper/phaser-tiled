
BasicGame.Game = function (game) {
    
};

BasicGame.Game.prototype = {

    create: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = this.add.tilemap('mario');
        this.map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

        console.log(this.cache);

        this.backgroundLayer = this.map.createLayer('background');
        this.blockedLayer = this.map.createLayer('floor');

        this.map.setCollision([15, 24], true, this.blockedLayer);

        //  This resizes the game world to match the layer dimensions
        this.backgroundLayer.resizeWorld();       
        
        //  Here we create our coins group
        this.coins = this.add.group();
        this.coins.enableBody = true;

        this.map.createFromObjects('coins', 11, 'coin', 0, true, false, this.coins);

        this.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
        this.coins.callAll('animations.play', 'animations', 'spin');

        //create player
        this.player = this.add.sprite(250, 0, 'dude');
        this.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 600;
        this.player.speed = 120;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.score = 0;
       

    },

    update: function () {
        
        var playerHitsPlatform = this.physics.arcade.collide(this.player, this.blockedLayer);
        var playerHitsPickup = this.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, { game: this });

        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.velocity.x = -this.player.speed;
            this.player.animations.play('left');
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.velocity.x = this.player.speed;
            this.player.animations.play('right');
        } else {
            //idle
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 4;
        }
        
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