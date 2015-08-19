Shields = function(ship){
	Subsystem.call(this, ship);

	var self = this;

	// Private Variables
	var isOnline = false;
	var energy = 4000;

	// Public Variables
	self.MAX_ENERGY = 10000;

	// Define variables and setters and getters

	/* isOnline */

	self.isOnline = function () {
		return isOnline;
	}

	self.setOnline = function (state) {
		isOnline = state;
	}

	/* energy */
	self.setEnergy = function(value) {
		if (value < 0){
			alert('Scott says, "Shields energy cannot be set to a negative value!"');
			return;
		}

		var energyChange = value - energy;

		if (ship.transferEnergy(energyChange)){
			energy = value;

			if (self.MAX_ENERGY < energy){
				var energyToPutBackToShip = energy - self.MAX_ENERGY;
				ship.transferEnergy(-energyToPutBackToShip);
				energy = self.MAX_ENERGY;

				alert('Scott says, "Too much energy requested!"');
			}

		} else {
			alert('Scott says, "I\'ve given it all she\'s got, captain!"');
		}
	}

	self.getEnergy = function () {
		return energy;
	}
}

Shields.prototype.constructor = Shields;

Shields.prototype = {
	// Define other function

}

