
BasicGame.Game = function (game) {
   
};

BasicGame.Game.prototype = {

    create: function () {
        this.map = this.add.tilemap('mario');
        this.map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

        this.backgroundLayer = this.map.createLayer('background');
        this.blockedLayer = this.map.createLayer('floor');

        //  This resizes the game world to match the layer dimensions
        this.backgroundLayer.resizeWorld();       
        

        //create player
        this.player = this.add.sprite(250, 0, 'dude');
        this.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 600;
        this.player.speed = 120;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    },

    update: function () {
        
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

};