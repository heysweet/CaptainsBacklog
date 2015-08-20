describe('shields', function() {

  describe('shields should go up and down', function() {
    var ship;

    beforeEach(function() {
      ship = new Ship();
    });

    it('shields should default to powered down', function() {
      expect(ship.shields.isOnline()).toBe(false);
    });

    it('shields should be able to turn on', function() {
      ship.shields.setOnline(true);

      expect(ship.shields.isOnline()).toBe(true);
    });

    it('shields should be able to turn off', function() {
      ship.shields.setOnline(true);

      ship.shields.setOnline(false);

      expect(ship.shields.isOnline()).toBe(false);
    });
  });

  describe('can transfer energy to and from the shields', function() {
    var ship;

    beforeEach(function() {
      ship = new Ship();
    });

    it('when shields first turn on, they start with 4000 energy', function() {
      ship.shields.setOnline(true);

      expect(ship.shields.getEnergy()).toBe(4000);
    });

    it('energy can be set on the shields', function() {
      ship.shields.setEnergy(1000);

      expect(ship.shields.getEnergy()).toBe(1000);
    });

    it('energy can be transferred from the ship to the shields', function() {
      var shipStartingEnergy = 20000;
      var energyToTransfer = 100;
      var shieldStartingEnergy = ship.shields.getEnergy();

      ship.shields.setEnergy(4100);

      expect(ship.shields.getEnergy()).toBe(4100);
      expect(ship.getEnergy()).toBe(19900);
    });

    it('energy can not be transferred from the ship to the shield if there is not enough energy in the ship\'s reserves', function() {
      spyOn(window, 'alert');

      var shipStartingEnergy = 20000;
      var energyToTransfer = 21000;
      var shieldStartingEnergy = 4000;

      ship.shields.setEnergy(shieldStartingEnergy + energyToTransfer);

      expect(window.alert).toHaveBeenCalledWith('Scott says, "I\'ve given it all she\'s got, captain!"');

      expect(ship.shields.getEnergy()).toBe(shieldStartingEnergy);
      expect(ship.getEnergy()).toBe(shipStartingEnergy);
    });

    it('if you request more energy to the shields than the shields can hold, fill the shields and return remaining energy to the ship', function() {
      spyOn(window, 'alert');

      var shipStartingEnergy = 20000;
      var shieldStartingEnergy = 4000;
      var energyToSetOnShields = 11000; // Ship has enough energy to transfer, but this number is more than the shields can hold

      var energyToTransfer = ship.shields.MAX_ENERGY - shieldStartingEnergy;

      var shipsEndingEnergy = shipStartingEnergy - energyToTransfer;

      // Do the transfer
      ship.shields.setEnergy(energyToSetOnShields);

      expect(window.alert).toHaveBeenCalledWith('Scott says, "Too much energy requested!"');

      expect(ship.shields.getEnergy()).toBe(ship.shields.MAX_ENERGY);
      expect(ship.getEnergy()).toBe(shipsEndingEnergy);
    });

    it('if you set the shields energy to a lower (valid) value than it is currently at, it will transfer back to the ship', function() {

      ship.shields.setEnergy(3000);

      // Ship starts at 20000 energy
      // Shields start at 4000 energy
      expect(ship.shields.getEnergy()).toBe(3000);
      expect(ship.getEnergy()).toBe(21000);
    });

    it('if you set the shields energy to a negative value, it will be an invalid request', function() {
      spyOn(window, 'alert');

      ship.shields.setEnergy(-4000);

      expect(window.alert).toHaveBeenCalledWith('Scott says, "Shields energy cannot be set to a negative value!"');

      //energyToSetOnShields
      expect(ship.shields.getEnergy()).toBe(4000);
      expect(ship.getEnergy()).toBe(20000);
    });
  });

  describe('shields take damage', function() {
    var ship;

    beforeEach(function() {
      ship = new Ship();
    });

    it('if our shield is online and gets hit, we lose the right amount of energy', function() {
      var shieldsInitialEnergy = 4000;

      ship.shields.setOnline(true);
      ship.getHit(1);

      // 500 to one conversion rate on stardates : energy
      expect(ship.shields.getEnergy()).toBe(shieldsInitialEnergy - 500);
    });

    it('if our shield is online and gets hit for more energy than it has, the shield will pass the excess damage to the ship', function() {
      spyOn(ship, 'damageSubsystem');

      var shieldsInitialEnergy = 4000;

      ship.shields.setOnline(true);
      ship.getHit(9);

      expect(ship.damageSubsystem).toHaveBeenCalledWith(1);
    });

    it('if our shield is offline and our ship is hit, the shield will not absorb energy', function() {
      spyOn(ship, 'damageSubsystem');
      ship.getHit(1);

      expect(ship.damageSubsystem).toHaveBeenCalledWith(1);
    });
  });
});