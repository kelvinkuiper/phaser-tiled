
BasicGame.MainMenu = function (game) {

};

BasicGame.MainMenu.prototype = {

    create: function () {

       console.log("MainMenu state started");

       var button = this.add.sprite(100, 100, 'test');
       button.inputEnabled = true;
       button.events.onInputDown.add(this.listener, this);
    },

    update: function () {

        //  Do some nice funky main menu effect here

    },

    listener: function () {
        this.state.start('Game');
    }


};