"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
require("mocha");
var deepEqualInAnyOrder = require("deep-equal-in-any-order");
var models_1 = require("../main/models");
chai_1.default.use(deepEqualInAnyOrder);
var expect = chai_1.default.expect;
context('Knight', function () {
    describe('calling addToItem', function () {
        it('should set item property', function () {
            var knight = new models_1.Knight("white");
            var item = new models_1.BoardItem({ line: 0, column: 0 }, "dark-pink");
            knight.set('boardItem', item);
            expect(knight.get('boardItem')).to.deep.equals(item);
        });
    });
    describe('calling simulateMovement', function () {
        it('when initial position and empty board should return 3 options', function () {
            var board = new models_1.Board();
            var knight = new models_1.Knight("white");
            var item = new models_1.BoardItem({ line: 0, column: 1 }, "dark-pink");
            item.set('piece', knight);
            board.addItem(item);
            var expected = [
                { line: 1, column: 3 },
                { line: 2, column: 2 },
                { line: 2, column: 0 },
            ];
            var result = knight.simulateMovement();
            expect(result).to.deep.equalInAnyOrder(expected);
        });
        it('when free path should return all possibilities', function () {
            var board = new models_1.Board();
            var knight = new models_1.Knight("white");
            var item = new models_1.BoardItem({ line: 2, column: 2 }, "dark-pink");
            item.set('piece', knight);
            board.addItem(item);
            var expected = [
                { line: 0, column: 1 },
                { line: 0, column: 3 },
                { line: 1, column: 0 },
                { line: 1, column: 4 },
                { line: 3, column: 0 },
                { line: 3, column: 4 },
                { line: 4, column: 1 },
                { line: 4, column: 3 },
            ];
            var result = knight.simulateMovement();
            expect(result).to.deep.equalInAnyOrder(expected);
        });
        it('quando pieces are in the way, return only valid', function () {
            var knight = new models_1.Knight("white");
            var knightItem = new models_1.BoardItem({ line: 2, column: 2 }, "dark-pink");
            knightItem.set('piece', knight);
            var queen = new models_1.Queen("white");
            var queenItem = new models_1.BoardItem({ line: 0, column: 3 }, "dark-pink");
            queenItem.set('piece', queen);
            var pawn = new models_1.Pawn("white");
            var pawnItem = new models_1.BoardItem({ line: 1, column: 0 }, "dark-pink");
            pawnItem.set('piece', pawn);
            var otherPawn = new models_1.Pawn("white");
            var otherPawnItem = new models_1.BoardItem({ line: 1, column: 4 }, "dark-pink");
            otherPawnItem.set('piece', otherPawn);
            var board = new models_1.Board();
            board.addItem(knightItem);
            board.addItem(pawnItem);
            board.addItem(otherPawnItem);
            board.addItem(queenItem);
            var expected = [
                { line: 0, column: 1 },
                { line: 3, column: 0 },
                { line: 3, column: 4 },
                { line: 4, column: 1 },
                { line: 4, column: 3 },
            ];
            var result = knight.simulateMovement();
            expect(result).to.deep.equalInAnyOrder(expected);
        });
    });
});
