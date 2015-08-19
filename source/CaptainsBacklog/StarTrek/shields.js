Shields = function(ship){
	var isOnline = false;
	var energy = 4000;
	var MAX_ENERGY = 10000;

	// Define variables and setters and getters

	/* isOnline */

	this.isOnline = function () {
		return isOnline;
	}

	this.setOnline = function (state) {
		isOnline = state;
	}

	this.getMaxEnergy = function(){
		return MAX_ENERGY;
	}

	/* energy */
	this.setEnergy = function(value) {
		if (value < 0){
			alert('Scott says, "Shields energy cannot be set to a negative value!"');
			return;
		}

		var energyChange = value - energy;

		if (ship.transferEnergy(energyChange)){
			energy = value;

			if (MAX_ENERGY < value){
				var energyToPutBackToShip = value - MAX_ENERGY;
				ship.transferEnergy(-energyToPutBackToShip);
				energy = MAX_ENERGY;

				alert('Scott says, "Too much energy requested!"');
			}

		} else {
			alert('Scott says, "I\'ve given it all she\'s got, captain!"');
		}
	}

	this.getEnergy = function () {
		return energy;
	}
}

Shields.prototype = {
	// Define other function
	setEnergy: function(value){
		this.energy()
	}
}

Ship = function(){
	var energy = 20000;

	this.shields = new Shields(this);

	this.getEnergy = function(){
		return energy;
	}

	this.transferEnergy = function(value){
		// If energy is at zero, it's game over
		if (energy > value){
			energy -= value;
			return true;
		} else {
			return false;
		}
	}
}

