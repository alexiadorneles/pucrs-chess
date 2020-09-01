"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoardComposite_1 = require("../composite/BoardComposite");
var ChessFactoryImpl = (function () {
    function ChessFactoryImpl(boardAdapterFactory) {
        this.boardAdapterFactory = boardAdapterFactory;
    }
    ChessFactoryImpl.prototype.createBoardFromJSON = function (loaded) {
        return new BoardComposite_1.BoardComposite(loaded, this.boardAdapterFactory);
    };
    ChessFactoryImpl.prototype.createInitialBoard = function () {
        return new BoardComposite_1.BoardComposite(null, this.boardAdapterFactory);
    };
    return ChessFactoryImpl;
}());
exports.ChessFactoryImpl = ChessFactoryImpl;
