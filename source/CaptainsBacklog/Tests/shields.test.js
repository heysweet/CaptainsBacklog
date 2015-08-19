describe('shields', function() {

  describe('shields should go up and down', function() {
    var shields;

    beforeEach(function() {
      shields = new Shields();
    });

    it('shields should default to powered down', function() {
      expect(shields.isOnline()).toBe(false);
    });

    it('shields should be able to turn on', function() {
      shields.setOnline(true);

      expect(shields.isOnline()).toBe(true);
    });

    it('shields should be able to turn off', function() {
      shields.setOnline(true);

      shields.setOnline(false);

      expect(shields.isOnline()).toBe(false);
    });
  });

  describe('can transfer energy to and from the shields', function() {
    var shields;

    beforeEach(function() {
      shields = new Shields();
    });

    it('when shields first turn on, they start with 4000 energy', function() {
      shields.setOnline(true);

      expect(shields.getEnergy()).toBe(4000);
    });

    it('energy can be transferred from the ship to the shield', function() {
      
    });
  });
});

