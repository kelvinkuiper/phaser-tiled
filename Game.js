
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
        

    },

    update: function () {
 
        
    },

};