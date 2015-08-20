Ship = function(){
	var self = this;

	var energy = 20000;

	self.shields = new Shields(self);

	self.getEnergy = function(){
		return energy;
	}

	self.transferEnergy = function(value){
		// If energy is at zero, it's game over
		if (energy > value){
			energy -= value;
			return true;
		} else {
			return false;
		}
	}
}

Ship.prototype = {
	getHit : function(starDateOfDamage){
		if (this.shields.isOnline() && this.shields.getEnergy() > 0){
			this.shields.getHit(starDateOfDamage);
		} else {
			this.damageSubsystem(starDateOfDamage);
		}
	},
	damageSubsystem : function(energyOfDamage){

	}
}