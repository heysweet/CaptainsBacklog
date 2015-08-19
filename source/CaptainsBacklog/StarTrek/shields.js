Shields = function(ship){
	var self = this;

	Subsystem.call(self, ship);


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

	self.depleteEnergy = function(energyLost){
		energy -= energyLost;
	}

	self.getEnergy = function () {
		return energy;
	}
}

Shields.prototype = Object.create(Subsystem.prototype, {

	// Define other function
	convertStarDateToEnergy : function(stardates){
		return stardates * 500;
	},
	getHit : function(starDateOfDamage){
		var energy = this.convertStarDateToEnergy(starDateOfDamage);

		// Absorb the damage if possible
		if (energy <= this.getEnergy()){
			this.depleteEnergy(energy);
		} else {
			var excessEnergy = energy - this.getEnergy();

			this.depleteEnergy(this.getEnergy());

			// Check for excess damage
			if (excessEnergy > 0){
				this.ship.damageSubsystem(excessEnergy);
			}
		}
	}
});

Shields.prototype.constructor = Shields;