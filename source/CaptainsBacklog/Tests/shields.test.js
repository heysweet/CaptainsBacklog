describe('shields', function() {
    
    // beforeEach(function() {
    // });

    describe('shields should go up and down', function() {
        // beforeEach(function() {
        //     var distanceWhereRandomFactorsHoldSway = 3000;
        //     ui.target = new Klingon(distanceWhereRandomFactorsHoldSway, 200);

        //     game.processCommand(ui);
        // });

        it('shield should default to powered down', function() {
            var shields = new Shields();

            expect(shields.isOnline()).toBe(false);
        });

        it('shield should be able to turn on', function() {
            var shields = new Shields();

            shields.setOnline(true);

            expect(shields.isOnline()).toBe(true);
        });
    });
});

