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

			ship.shields.doDamage(1);

			expect(ship.shields.getEnergy()).toBe(3500);

			ship.shields.doDamage(1);
			expect(ship.shields.getEnergy()).toBe(3000);

			ship.shields.doDamage(2);
			expect(ship.shields.getEnergy()).toBe(2000);

			//Rest
			ship.shields.doRepair(1);
			expect(ship.shields.getEnergy()).toBe(2500);


			//Expect subsystems to be repaired the correct amount
			//expect(ship.shields.isOnline()).toBe(false);
		});
	});
});