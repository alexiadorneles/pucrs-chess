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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var PieceKind_1 = require("../../definitions/PieceKind");
var DiagonalMovement_1 = require("../movement/DiagonalMovement");
var HorizontalMovement_1 = require("../movement/HorizontalMovement");
var VerticalMovement_1 = require("../movement/VerticalMovement");
var Piece_1 = require("./Piece");
var King = (function (_super) {
    __extends(King, _super);
    function King(colors) {
        var _this = this;
        var movements = [new VerticalMovement_1.VerticalMovement(), new HorizontalMovement_1.HorizontalMovement(), new DiagonalMovement_1.DiagonalMovement()];
        _this = _super.call(this, PieceKind_1.PieceKind.KING, colors, movements, true) || this;
        return _this;
    }
    King.prototype.simulateMovement = function () {
        var initialPosition = this.getBoardItem().get('position');
        var board = this.getBoard();
        var positions = this.movements.map(function (movements) {
            return movements
                .getMovementOffsets()
                .map(function (offset) { return movements.createNewPositionBasedOnOffset(initialPosition, offset); })
                .filter(function (position) { return board.isPositionInMatrixRange(position); })
                .filter(function (position) {
                return !board.getPieceByPosition(position) ||
                    board.isPositionBlockedByOpponent(position, initialPosition);
            });
        });
        return lodash_1.default.flatten(positions);
    };
    return King;
}(Piece_1.Piece));
exports.King = King;
