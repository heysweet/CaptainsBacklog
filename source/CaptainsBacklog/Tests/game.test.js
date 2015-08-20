describe('game', function() {

	describe('rest', function() {
		var game; 
		var ship;

		beforeEach(function(){
			game = new Game();
			ship = new Ship();

		});

		it("should repair subsystems after resting", function(){
			//Reduce subsystem's energy
			console.log('ship', ship);
			ship.shields.doDamage(1);

			expect(ship.shields.getEnergy()).toBe(3500);
			//Rest

			//Expect subsystems to be repaired the correct amount
			//expect(ship.shields.isOnline()).toBe(false);
		});
	});
});