"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var lodash_1 = __importDefault(require("lodash"));
require("mocha");
var sinon_1 = __importDefault(require("sinon"));
var Board_1 = require("../main/domain/board/Board");
var BoardItem_1 = require("../main/domain/board/BoardItem");
var Knight_1 = require("../main/domain/piece/Knight");
var Pawn_1 = require("../main/domain/piece/Pawn");
var Queen_1 = require("../main/domain/piece/Queen");
var deepEqualInAnyOrder = require("deep-equal-in-any-order");
chai_1.default.use(deepEqualInAnyOrder);
var expect = chai_1.default.expect;
context('Knight', function () {
    describe('calling addToItem', function () {
        it('should set item property', function () {
            var knight = new Knight_1.Knight("white");
            var item = new BoardItem_1.BoardItem({ line: 0, column: 0 }, "dark-pink");
            knight.addToItem(item);
            expect(knight.getBoardItem()).to.deep.equals(item);
        });
    });
    describe('calling simulateMovement', function () {
        it('when initial position and empty board should return 3 options', function () {
            var board = new Board_1.Board();
            sinon_1.default.replace(board, 'getItem', function (position) { return new BoardItem_1.BoardItem(position, "white"); });
            var knight = new Knight_1.Knight("white");
            var item = new BoardItem_1.BoardItem({ line: 0, column: 1 }, "dark-pink");
            item.addPiece(knight);
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
            var board = new Board_1.Board();
            sinon_1.default.replace(board, 'getItem', function (position) { return new BoardItem_1.BoardItem(position, "white"); });
            var knight = new Knight_1.Knight("white");
            var item = new BoardItem_1.BoardItem({ line: 2, column: 2 }, "dark-pink");
            item.addPiece(knight);
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
            var knight = new Knight_1.Knight("white");
            var knightItem = new BoardItem_1.BoardItem({ line: 2, column: 2 }, "dark-pink");
            knightItem.addPiece(knight);
            var queen = new Queen_1.Queen("white");
            var queenItem = new BoardItem_1.BoardItem({ line: 0, column: 3 }, "dark-pink");
            queenItem.addPiece(queen);
            var pawn = new Pawn_1.Pawn("white");
            var pawnItem = new BoardItem_1.BoardItem({ line: 1, column: 0 }, "dark-pink");
            pawnItem.addPiece(pawn);
            var otherPawn = new Pawn_1.Pawn("white");
            var otherPawnItem = new BoardItem_1.BoardItem({ line: 1, column: 4 }, "dark-pink");
            otherPawnItem.addPiece(otherPawn);
            sinon_1.default.replace(Board_1.Board.prototype, 'getItem', function (position) {
                var items = [knightItem, queenItem, pawnItem, otherPawnItem];
                var item = items.find(function (item) { return lodash_1.default.isEqual(item.getPosition(), position); });
                return item || new BoardItem_1.BoardItem(position, "white");
            });
            var board = new Board_1.Board();
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
