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

        borders: {},

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
            var downFixDef = this.createDefaultFixture(),
                upFixDef = this.createDefaultFixture(),
                rightFixDef = this.createDefaultFixture(),
                leftFixDef = this.createDefaultFixture(),
                downBodyDef = new b2BodyDef,
                upBodyDef = new b2BodyDef,
                rightBodyDef = new b2BodyDef,
                leftBodyDef = new b2BodyDef;

            downBodyDef.type = b2Body.b2_staticBody;
            upBodyDef.type = b2Body.b2_staticBody;
            rightBodyDef.type = b2Body.b2_staticBody;
            leftBodyDef.type = b2Body.b2_staticBody;
            
            downFixDef.shape = new b2PolygonShape();
            downFixDef.shape.SetAsBox(this.canvas.width/this.SCALE, 2);
            upFixDef.shape = new b2PolygonShape();
            upFixDef.shape.SetAsBox(this.canvas.width/this.SCALE, 2);
            rightFixDef.shape = new b2PolygonShape();
            rightFixDef.shape.SetAsBox(2, this.canvas.height/this.SCALE);
            leftFixDef.shape = new b2PolygonShape();
            leftFixDef.shape.SetAsBox(2, this.canvas.height/this.SCALE);

            downBodyDef.position.Set(10, this.canvas.height/this.SCALE + 1.8);
            upBodyDef.position.Set(10, -1.8);
            leftBodyDef.position.Set(-1.8, 13);
            rightBodyDef.position.Set(this.canvas.width/this.SCALE + 1.8, 13);

            this.world.CreateBody(downBodyDef).CreateFixture(downFixDef);
            this.world.CreateBody(upBodyDef).CreateFixture(upFixDef);
            this.world.CreateBody(leftBodyDef).CreateFixture(leftFixDef);
            this.world.CreateBody(rightBodyDef).CreateFixture(rightFixDef);
        },

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
    global.cf.World = World;

}(this));
