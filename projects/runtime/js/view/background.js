var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'MidnightBlue');
            background.addChild(backgroundFill);
            
            var bottomFill = draw.rect(canvasWidth, canvasHeight - (ground.y + ground.getBounds().height), 'green');
            bottomFill.y = ground.y + ground.getBounds().height;
            background.addChild(bottomFill);
            
            // TODO: 3 - Add a moon and starfield
                var circle;
                for(var i=0;i<100;i++) {
                circle = draw.circle(2,'white','lightpink',1);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
                }
                var moon = draw.bitmap('img/moon.png');
                moon.x = 700;
                moon.y = 15;
                moon.scaleX = .5;
                moon.scaleY = .5;
                background.addChild(moon);   
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var buildingHeight = 300;
            var building;
            var buildingScale;
            for(var i=0;i<5;++i) {
                buildingScale = Math.random()+0.1;
                building = draw.rect(75,buildingHeight*buildingScale,'Gray','violet',2);
                building.x = 200*i;
                building.y = groundY-buildingHeight*buildingScale
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = 700;
            tree.y = 239;
            tree.scaleX = 1
            tree.scaleY = 1
            background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1;
               if(tree.x < -200) {
               tree.x = canvasWidth;
           }

            // TODO 5: Part 2 - Parallax
                var building;
                for (var i = 0; i < buildings.length; i++){
                building = buildings[i];
                building.x -= 0.3;
                if(building.x < -75){
                    building.x += canvasWidth + 75;
                }

        } // end of update function - DO NOT DELETE
        
    }

        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
