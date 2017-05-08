
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

        this.map.createFromObjects('coins', 11, 'asd', 0, true, false, this.coins);

        //create player
        this.player = this.add.sprite(250, 0, 'dude');
        this.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 600;
        this.player.speed = 120;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        console.log(this.game.cache.getKeys());

       

    },

    update: function () {
        
        var playerHitsPlatform = this.physics.arcade.collide(this.player, this.blockedLayer);
        var playerHitsPickup = this.physics.arcade.overlap(this.player, this.coins, this.collectCoin);

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
        coin.destroy();
    }

};