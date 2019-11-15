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
var Movimento_1 = require("./Movimento");
var MovimentoDiagonal = (function (_super) {
    __extends(MovimentoDiagonal, _super);
    function MovimentoDiagonal() {
        var _this = _super.call(this, 2) || this;
        _this.offsetMovimentos = [{ coluna: 1, linha: 1 }];
        return _this;
    }
    return MovimentoDiagonal;
}(Movimento_1.Movimento));
exports.MovimentoDiagonal = MovimentoDiagonal;
