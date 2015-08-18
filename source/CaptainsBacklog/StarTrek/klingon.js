Klingon = function(initialDistance, initialEnergy) {
    var defaultDistance = 100 + randomWithinLimitOf(4000);
    var defaultEnergy = 1000 + randomWithinLimitOf(2000);

    this.distance = initialDistance || defaultDistance;
    this.energy = initialEnergy || defaultEnergy;
};

Klingon.prototype = {
    destroy: function() {
        ui.writeLine("Klingon destroyed!");
    },
    damage: function(amount){
    },
    isInRange: function(range){
    }
};