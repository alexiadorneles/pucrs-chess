"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var lodash_1 = __importDefault(require("lodash"));
require("mocha");
var sinon_1 = __importDefault(require("sinon"));
var BoardItem_1 = require("../main/domain/board/BoardItem");
var Pawn_1 = require("../main/domain/piece/Pawn");
var Board_1 = require("../main/domain/board/Board");
context('Pawn', function () {
    describe('calling addToItem', function () {
        it('should set item property', function () {
            var pawn = new Pawn_1.Pawn("white");
            var item = new BoardItem_1.BoardItem({ line: 0, column: 0 }, "dark-pink");
            pawn.addToItem(item);
            chai_1.expect(pawn.getBoardItem()).to.deep.equals(item);
        });
    });
    describe('calling simulateMovement', function () {
        it('when free path, should return actual position and next forward', function () {
            var board = new Board_1.Board();
            var pawnPosition = { line: 1, column: 2 };
            sinon_1.default.replace(board, 'getItem', function (posicao) {
                return lodash_1.default.isEqual(pawnPosition, posicao) ? item : new BoardItem_1.BoardItem(posicao, "white");
            });
            var pawn = new Pawn_1.Pawn("white");
            var item = new BoardItem_1.BoardItem(pawnPosition, "dark-pink");
            item.addPiece(pawn);
            board.addItem(item);
            var expected = [{ line: 2, column: 2 }];
            var result = pawn.simulateMovement();
            chai_1.expect(result).to.deep.equals(expected);
        });
    });
});
