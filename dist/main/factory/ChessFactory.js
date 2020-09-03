"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoardComposite_1 = require("../composite/BoardComposite");
var Board_1 = require("../domain/board/Board");
var ChessFactoryImpl = (function () {
    function ChessFactoryImpl(engine) {
        this.engine = engine;
    }
    ChessFactoryImpl.prototype.createBoardFromJSON = function (loaded) {
        return BoardComposite_1.BoardComposite.createFromJSON(loaded, this.engine);
    };
    ChessFactoryImpl.prototype.createInitialBoard = function () {
        return new BoardComposite_1.BoardComposite(new Board_1.Board(), this.engine);
    };
    return ChessFactoryImpl;
}());
exports.ChessFactoryImpl = ChessFactoryImpl;
