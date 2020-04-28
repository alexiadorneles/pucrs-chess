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
var ModifierImpl_1 = require("../ModifierImpl");
var Movement_1 = require("./Movement");
var VerticalMovement = (function (_super) {
    __extends(VerticalMovement, _super);
    function VerticalMovement() {
        return _super.call(this, 1) || this;
    }
    VerticalMovement.prototype.getMovementOffsets = function () {
        return [
            {
                columnModifier: new ModifierImpl_1.ModifierImpl(0, ModifierImpl_1.ModifierImpl.sum),
                lineModifier: new ModifierImpl_1.ModifierImpl(1, ModifierImpl_1.ModifierImpl.sum),
            },
            {
                columnModifier: new ModifierImpl_1.ModifierImpl(0, ModifierImpl_1.ModifierImpl.minus),
                lineModifier: new ModifierImpl_1.ModifierImpl(1, ModifierImpl_1.ModifierImpl.minus),
            }
        ];
    };
    return VerticalMovement;
}(Movement_1.Movement));
exports.VerticalMovement = VerticalMovement;
