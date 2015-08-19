Ship = function(){
	var energy = 20000;
}

Shields = function(){
	var isOnline = false;
	var energy = 4000;

	// Define variables and setters and getters

	/* isOnline */

	this.isOnline = function () {
		return isOnline;
	}

	this.setOnline = function (state) {
		isOnline = state;
	}

	/* energy */

	this.getEnergy = function () {
		return energy;
	}
}

Shields.prototype = {
	// Define other function
}