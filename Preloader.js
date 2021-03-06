
BasicGame.Preloader = function (game) {

};

BasicGame.Preloader.prototype = {

    preload: function () {
        this.load.tilemap('mario', 'assets/tilemaps/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/tilemaps/super_mario.png');

        this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this.load.spritesheet('coin', 'assets/coin.png', 32, 32);
    },

    create: function () {

    },

    update: function () {
        this.state.start('MainMenu');
    }

};