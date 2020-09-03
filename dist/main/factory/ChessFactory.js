"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var composite_1 = require("../composite");
var models_1 = require("../models");
var ChessFactoryImpl = (function () {
    function ChessFactoryImpl(engine) {
        this.engine = engine;
    }
    ChessFactoryImpl.prototype.createBoardFromJSON = function (loaded) {
        return composite_1.BoardComposite.createFromJSON(loaded, this.engine);
    };
    ChessFactoryImpl.prototype.createInitialBoard = function () {
        return new composite_1.BoardComposite(new models_1.Board(), this.engine);
    };
    return ChessFactoryImpl;
}());
exports.ChessFactoryImpl = ChessFactoryImpl;
