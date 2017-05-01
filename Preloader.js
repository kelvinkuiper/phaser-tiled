
BasicGame.Preloader = function (game) {

};

BasicGame.Preloader.prototype = {

    preload: function () {
        this.load.tilemap('mario', 'assets/tilemaps/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/tilemaps/super_mario.png');
    },

    create: function () {

    },

    update: function () {
        this.state.start('Game');
    }

};