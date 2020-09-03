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
var Model_1 = require("../../definitions/Model");
var BoardItem = (function (_super) {
    __extends(BoardItem, _super);
    function BoardItem(position, color) {
        var _this = _super.call(this) || this;
        _this.set('color', color);
        _this.set('position', position);
        return _this;
    }
    return BoardItem;
}(Model_1.Model));
exports.BoardItem = BoardItem;
