var SHIELD_MAX_ENERGY = 10000;

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

    it('energy can be set on the shield', function() {
      ship.shields.setEnergy(1000);

      expect(ship.shields.getEnergy()).toBe(1000);
    });

    it('energy can be transferred from the ship to the shield', function() {
      var shipStartingEnergy = ship.getEnergy();
      var energyToTransfer = 100;
      var shieldStartingEnergy = ship.shields.getEnergy();

      ship.shields.setEnergy(shieldStartingEnergy + energyToTransfer);

      expect(ship.shields.getEnergy()).toBe(shieldStartingEnergy + energyToTransfer);
      expect(ship.getEnergy()).toBe(shipStartingEnergy - energyToTransfer);
    });

    it('energy can not be transferred from the ship to the shield if there is not enough energy in the ship\'s reserves', function() {
      spyOn(window, 'alert');

      var shipStartingEnergy = ship.getEnergy();
      var energyToTransfer = 100 + shipStartingEnergy;
      var shieldStartingEnergy = ship.shields.getEnergy();

      ship.shields.setEnergy(shieldStartingEnergy + energyToTransfer);

      expect(window.alert).toHaveBeenCalledWith('Scott says, "I\'ve given it all she\'s got, captain!"');

      expect(ship.shields.getEnergy()).toBe(shieldStartingEnergy);
      expect(ship.getEnergy()).toBe(shipStartingEnergy);
    });

    it('if you request more energy to the shield than the shield can hold, fill the shields and return remaining energy to the ship', function() {
      spyOn(window, 'alert');

      var shipStartingEnergy = ship.getEnergy();
      var energyToSetOnShields = 11000; // Ship has enough energy to transfer, but this number is more than the shields can hold
      var shieldStartingEnergy = ship.shields.getEnergy();


      var energyToTransfer = Math.min(ship.shields.getMaxEnergy(), energyToSetOnShields) - shieldStartingEnergy;

      var shipsEndingEnergy = shipStartingEnergy - energyToTransfer;

      // Do the transfer
      ship.shields.setEnergy(energyToSetOnShields);

      expect(window.alert).toHaveBeenCalledWith('Scott says, "Too much energy requested!"');

      expect(ship.shields.getEnergy()).toBe(ship.shields.getMaxEnergy());
      expect(ship.getEnergy()).toBe(shipsEndingEnergy);
    });
  });
});

