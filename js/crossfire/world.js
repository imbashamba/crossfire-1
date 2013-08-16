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

    if(!global.cf) {
        global.cf = {};
    }
    global.cf.CanvasElem = CanvasElem;

}(this));
