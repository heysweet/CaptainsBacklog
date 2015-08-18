var ui;

function randomGenerator(){
    return Math.random();
}

function randomWithinLimitOf(n) {
    return Math.floor(Math.random() * n);
};

Weapon = function(){
    this.ammo = 0;
    this.maxRange = 0;
    this.getDamage = null;
};

Weapon.prototype = {
    hasEnoughAmmo: function(ammoToFire){
        return this.ammo >= ammoToFire;
    },
    reportNoAmmo: function(){
    },
    isInRange: function(){
    },
    doDamage: function(){
    },
    getAmmoUsed: function(){
    },
    useAmmo: function (ammoUsed) {
        this.ammo -= ammoUsed;
    }
};

/* Phaser */

var phasers = new Weapon();

phasers.getDamage = function(distance, ammoUsed){
    var damage = ammoUsed - (((ammoUsed / 20) * distance / 200) + randomWithinLimitOf(200));

    if (damage < 1){
        return 1;
    }

    return damage;
};

phasers.reportNoAmmo = function(){
    ui.writeLine("Insufficient energy to fire phasers!");
};

phasers.isInRange = function(distance){
    return distance <= this.maxRange;
};

phasers.reportOutOfRange = function(distance){
    ui.writeLine("Klingon out of range of phasers at " + distance + " sectors...");
};

phasers.getAmmoUsed = function () {
    return parseInt(ui.parameter("amount"), 10);
};

phasers.doDamage = function(enemy, ammoUsed) {
    var damage = this.getDamage(enemy.distance, ammoUsed);

    ui.writeLine("Phasers hit Klingon at " + enemy.distance + " sectors with " + damage + " units");

    if (damage < enemy.energy) {
        enemy.energy = enemy.energy - damage;
        ui.writeLine("Klingon has " + enemy.energy + " remaining");
    } else {
        enemy.destroy();
    }
};

//Easter Egg

/* Photon Torpedos */

var photon = new Weapon();

photon.reportNoAmmo = function(){
    ui.writeLine("No more photon torpedoes!");
};

photon.reportOutOfRange = function(distance){
    ui.writeLine("Torpedo missed Klingon at " + distance + " sectors...");
};

photon.getDamage = function(distance) {
    return 800 + randomWithinLimitOf(50);
};

photon.isInRange = function(distance){
    return (randomWithinLimitOf(4) + ((distance / 500) + 1) > 7);
};

photon.getAmmoUsed = function() {
    return 1;
};

photon.doDamage = function(enemy, ammoUsed) {
    var damage = this.getDamage(enemy.distance, ammoUsed);

    ui.writeLine("Photons hit Klingon at " + enemy.distance + " sectors with " + damage + " units");

    if (damage < enemy.energy) {
        enemy.energy = enemy.energy - damage;
        ui.writeLine("Klingon has " + enemy.energy + " remaining");
    } else {
        enemy.destroy();
    }
};

Game = function() {
    this.weapons = {
        phasers : phasers,
        photon : photon
    };

    phasers.ammo = 10000;
    phasers.maxRange = 4000;
    photon.ammo = 8;
    photon.maxRange = 4000;
};

Game.prototype = {
    generator: randomGenerator,
    randomWithinLimitOf : randomWithinLimitOf,
    processCommand: function(userInterface) {
        ui = userInterface;

        var enemy;
        var distance;
        var damage;

        var weapon = this.weapons[ui.parameter("command")];

        if (weapon){
            enemy = ui.variable("target");

            var ammoUsed = weapon.getAmmoUsed();

            if (weapon.hasEnoughAmmo(ammoUsed)){
                weapon.useAmmo(ammoUsed);

                if (weapon.isInRange(enemy.distance)){
                    weapon.doDamage(enemy, ammoUsed);
                } else {
                    weapon.reportOutOfRange(enemy.distance);
                }
            } else {
                weapon.reportNoAmmo();
            }
        }
    }
};