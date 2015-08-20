Subsystem = function() {
	
	var self = this;

	self.getEnergyAfterDamage = function(stardates) {
		return this.getEnergy() - (this.getStardateDamage() * stardates);	
	}

	self.getEnergyAfterRepair = function(stardates) {
		return this.getEnergy() + (this.getStardateDamage() * stardates);
	}
}

Subsystem.prototype = {

	doDamage: function(stardates){
		this.setEnergy(this.getEnergyAfterDamage(stardates));
	},
	doRepair: function(stardates) {
		this.setEnergy(this.getEnergyAfterRepair(stardates));
	}
};