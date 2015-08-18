Shields = function(){
	var isOnline = false;

	// Define variables and setters and getters

	this.isOnline = function () {
		return isOnline;
	}

	this.setOnline = function (state) {
		isOnline = state;
	}
}

Shields.prototype = {
	// Define other function
}