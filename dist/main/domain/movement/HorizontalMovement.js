"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ModificadorImpl_1 = require("../ModificadorImpl");
var Movement_1 = require("./Movement");
var HorizontalMovement = (function (_super) {
    __extends(HorizontalMovement, _super);
    function HorizontalMovement() {
        return _super.call(this, 0) || this;
    }
    HorizontalMovement.prototype.getMovementOffsets = function () {
        return [
            {
                columnModifier: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
                lineModifier: new ModificadorImpl_1.ModificadorImpl(0, ModificadorImpl_1.ModificadorImpl.soma),
            },
            {
                columnModifier: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
                lineModifier: new ModificadorImpl_1.ModificadorImpl(0, ModificadorImpl_1.ModificadorImpl.soma),
            },
        ];
    };
    return HorizontalMovement;
}(Movement_1.Movement));
exports.HorizontalMovement = HorizontalMovement;
