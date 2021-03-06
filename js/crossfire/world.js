/**
 * @fileoverview Описание мира
 *
 * @author lonkin01@gmail.com (Lonkin Pavel)
 */
(function(global) {
    "use strict";

    /**
     * reduction of namespaces
     */
    var b2AABB = Box2D.Collision.b2AABB,
        b2World = Box2D.Dynamics.b2World,
        b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        b2Body = Box2D.Dynamics.b2Body,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

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

        canvas: CanvasElem,

        /**
         * Create world
         */
        initialize: function(debug) {
            var gravity = new b2Vec2(0, 0),
                worldAABB = new b2AABB();

            if (debug === undefined || debug === null) {
                debug = false;
            }

            this.canvas.initialize('canvas');

            worldAABB.lowerBound = new b2Vec2(-1000, -1000);
            worldAABB.upperBound = new b2Vec2(1000, 1000);

            this.world = new b2World(worldAABB, gravity, true);

            this.createBorders();

            if(debug) {
                this.initDebugDraw();
            }

            this.step();
        },

        /**
         * Iteration of our world
         */
        step: function() {
            this.world.Step(1.0/60.0, 10, 10);
            this.world.DrawDebugData();
            this.world.ClearForces();

            setTimeout(this.step.bind(this), 10);
        },

        /**
         * Init debug draw
         */
        initDebugDraw: function() {
            var debugDraw = new b2DebugDraw();

            debugDraw.SetSprite(this.canvas.context);
            debugDraw.SetDrawScale(this.SCALE);
            debugDraw.SetFillAlpha(0.5);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

            this.world.SetDebugDraw(debugDraw);
        },

        /**
         * Create four borders: up, down, right, left
         */
        createBorders: function() {

            // create down border
            var downBodyDef = this.createBorderBody(),
                downFixDef = this.createBorderFix();

            downFixDef.shape.SetAsBox(this.canvas.width/this.SCALE, 2);
            downBodyDef.position.Set(10, this.canvas.height/this.SCALE + 1.8);

            this.world.CreateBody(downBodyDef).CreateFixture(downFixDef);

            // create up border
            var upBodyDef = this.createBorderBody(),
                upFixDef = this.createBorderFix();

            upFixDef.shape.SetAsBox(this.canvas.width/this.SCALE, 2);
            upBodyDef.position.Set(10, -1.8);

            this.world.CreateBody(upBodyDef).CreateFixture(upFixDef);

            //create left border
            var leftBodyDef = this.createBorderBody(),
                leftFixDef = this.createBorderFix();

            leftFixDef.shape.SetAsBox(2, this.canvas.height/this.SCALE);
            leftBodyDef.position.Set(-1.8, 13);

            this.world.CreateBody(leftBodyDef).CreateFixture(leftFixDef);

            //create right border
            var rightBodyDef = this.createBorderBody(),
                rightFixDef = this.createBorderFix();

            rightFixDef.shape.SetAsBox(2, this.canvas.height/this.SCALE);
            rightBodyDef.position.Set(this.canvas.width/this.SCALE + 1.8, 13);

            this.world.CreateBody(rightBodyDef).CreateFixture(rightFixDef);
        },

        /**
         * Create border body
         */
        createBorderBody: function() {
            var borderBodyDef = new b2BodyDef;

            borderBodyDef.type = b2Body.b2_staticBody;

            return borderBodyDef;
        },

        /**
         * Create border fixture
         */
        createBorderFix: function() {
            var borderFix = this.createDefaultFixture();

            borderFix.shape = new b2PolygonShape();

            return borderFix;
        },

        /**
         * Create fixture with default parameters
         */
        createDefaultFixture: function() {
            var fix = new b2FixtureDef();

            fix.density = 1.0;
            fix.friction = 0.5;
            fix.restitution = 0.2;

            return fix;
        }
    };

    if(!global.cf) {
        global.cf = {};
    }
    if(!global.cf.World) {
        global.cf.World = {};
    }

    global.cf.World.initialize = World.initialize.bind(World);

}(this));
