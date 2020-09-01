"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoardComposite_1 = require("../composite/BoardComposite");
var Board_1 = require("../domain/board/Board");
var ChessFactoryImpl = (function () {
    function ChessFactoryImpl() {
    }
    ChessFactoryImpl.prototype.createBoardFromJSON = function (loaded) {
        return BoardComposite_1.BoardComposite.createFromJSON(loaded);
    };
    ChessFactoryImpl.prototype.createInitialBoard = function () {
        return new BoardComposite_1.BoardComposite(new Board_1.Board());
    };
    return ChessFactoryImpl;
}());
exports.ChessFactoryImpl = ChessFactoryImpl;
