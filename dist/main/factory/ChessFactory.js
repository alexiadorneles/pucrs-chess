"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("../domain/board/Board");
var BoardItem_1 = require("../domain/board/BoardItem");
var Piece_1 = require("../domain/piece/Piece");
var ChessFactoryImpl = (function () {
    function ChessFactoryImpl() {
    }
    ChessFactoryImpl.prototype.createBoardFromJSON = function (loaded) {
        var board = Board_1.Board.copy(loaded);
        board.executeForAll(function (item, _a) {
            var line = _a.line, column = _a.column;
            var itemModel = BoardItem_1.BoardItem.copy(item);
            if (itemModel.getPiece()) {
                itemModel.addPiece(Piece_1.Piece.copy(itemModel.getPiece()));
            }
            board.matrix[line][column] = itemModel;
            itemModel.addToBoard(board);
        });
        return board;
    };
    return ChessFactoryImpl;
}());
exports.ChessFactoryImpl = ChessFactoryImpl;
