(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.PhysicsTest = global.PhysicsTest || {})));
} (this, (function (exports) {
    'use strict';

    function PhysicsTest(ThreeObject) {
        this.threeObject = ThreeObject;

    }
    PhysicsTest.prototype.Test = function Test() {
        console.log("hoi")
    };

    exports.Test = Test;
    exports.PhysicsTest = PhysicsTest;
})));
