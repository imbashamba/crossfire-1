/**
 * @fileoverview Описание мира
 *
 * @author lonkin01@gmail.com (Lonkin Pavel)
 */
(function(global) {
    "use strict";

    /**
     Canvas elemen
     */
    var CanvasElem = {

        canvas: null,

        context: null,

        width: null,
        height: null,

        /**
         * Canvas initialization
         * 
         * @param canvasId {String} id of canvas in DOM
         */
        initialize: function(canvasId) {
            this.canvas = document.getElementById(canvasId),
            this.context = this.canvas.getContext('2d');
            this.width = this.canvas.width-0;
            this.height = this.canvas.height-0;
        }
    };

    /**
     b2World
     */
    var World = {

        /**
         * Constant, because Box2D unite is meter
         */
        SCALE: 30,

        world: null,

        canvas: null,

        borders: {},

        /**
         * Create world
         */
        initialize: function() {
            var gravity = new b2Vec2(0, 0),
                worldAABB = new b2AABB();

            this.canvas = CanvasElem.initialize('canvas');

            worldAABB.minVertex.Set(-1000, -1000);
            worldAABB.maxVertex.Set(1000, 1000);

            this.world = new b2World(worldAABB, gravity, true);

            this.createBorders();

            this.update();
        },

        /**
         * Setting timer for updating the world
         */
        update: function() {
            this.step();

            console.log("Updated");

            setTimeout(this.update.bind(this), 10);
        },

        /**
         * Iteration of our world
         */
        step: function() {
            this.world.Step(1.0/60.0, 10, 10);
        },

        /**
         * Create four borders: up, down, right, left
         */
        createBorders: function() {

        }
    };

    if(!global.cf) {
        global.cf = {};
    }
    global.cf.CanvasElem = CanvasElem;
    global.cf.World = World;

}(this));
