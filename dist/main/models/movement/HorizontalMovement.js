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
var adapter_1 = require("../../adapter");
var Movement_1 = require("./Movement");
var HorizontalMovement = (function (_super) {
    __extends(HorizontalMovement, _super);
    function HorizontalMovement() {
        return _super.call(this, 0) || this;
    }
    HorizontalMovement.prototype.getMovementOffsets = function () {
        return [
            {
                columnModifier: new adapter_1.MovementAdapter(1, adapter_1.MovementAdapter.sum),
                lineModifier: new adapter_1.MovementAdapter(0, adapter_1.MovementAdapter.sum),
            },
            {
                columnModifier: new adapter_1.MovementAdapter(1, adapter_1.MovementAdapter.minus),
                lineModifier: new adapter_1.MovementAdapter(0, adapter_1.MovementAdapter.sum),
            },
        ];
    };
    return HorizontalMovement;
}(Movement_1.Movement));
exports.HorizontalMovement = HorizontalMovement;
