"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var lodash_1 = __importDefault(require("lodash"));
require("mocha");
var sinon_1 = __importDefault(require("sinon"));
var BoardItem_1 = require("../main/domain/board/BoardItem");
var Pawn_1 = require("../main/domain/piece/Pawn");
var Queen_1 = require("../main/domain/piece/Queen");
var Board_1 = require("../main/domain/board/Board");
var deepEqualInAnyOrder = require("deep-equal-in-any-order");
var King_1 = require("../main/domain/piece/King");
var Rook_1 = require("../main/domain/piece/Rook");
chai_1.default.use(deepEqualInAnyOrder);
var expect = chai_1.default.expect;
context('Queen', function () {
    describe('calling addToItem', function () {
        it('should set item property', function () {
            var queen = new Queen_1.Queen("white");
            var item = new BoardItem_1.BoardItem({ line: 0, column: 0 }, "dark-pink");
            queen.addToItem(item);
            expect(queen.getBoardItem()).to.deep.equals(item);
        });
    });
    describe('calling simulateMovement', function () {
        beforeEach(function () { return sinon_1.default.restore(); });
        it('when initial position and clean board should return a lot of options', function () {
            var board = new Board_1.Board();
            var queen = new Queen_1.Queen("white");
            var queenItem = { line: 0, column: 3 };
            var item = new BoardItem_1.BoardItem(queenItem, "dark-pink");
            item.setPiece(queen);
            sinon_1.default.replace(board, 'getItem', function (position) {
                return lodash_1.default.isEqual(queenItem, position) ? item : new BoardItem_1.BoardItem(position, "white");
            });
            board.addItem(item);
            var expected = [
                { line: 0, column: 0 },
                { line: 0, column: 1 },
                { line: 0, column: 2 },
                { line: 0, column: 4 },
                { line: 0, column: 5 },
                { line: 0, column: 6 },
                { line: 0, column: 7 },
                { line: 1, column: 3 },
                { line: 2, column: 3 },
                { line: 3, column: 3 },
                { line: 4, column: 3 },
                { line: 5, column: 3 },
                { line: 6, column: 3 },
                { line: 7, column: 3 },
                { line: 1, column: 2 },
                { line: 2, column: 1 },
                { line: 3, column: 0 },
                { line: 1, column: 4 },
                { line: 2, column: 5 },
                { line: 3, column: 6 },
                { line: 4, column: 7 },
            ];
            var result = queen.simulateMovement();
            expect(result).to.deep.equalInAnyOrder(expected);
            sinon_1.default.restore();
        });
        it('when free path, should return all possible', function () {
            var board = new Board_1.Board();
            var queenItem = { line: 3, column: 3 };
            var queen = new Queen_1.Queen("white");
            var item = new BoardItem_1.BoardItem(queenItem, "dark-pink");
            item.setPiece(queen);
            sinon_1.default.replace(board, 'getItem', function (position) {
                return lodash_1.default.isEqual(queenItem, position) ? item : new BoardItem_1.BoardItem(position, "white");
            });
            board.addItem(item);
            var expected = [
                { line: 2, column: 3 },
                { line: 1, column: 3 },
                { line: 0, column: 3 },
                { line: 4, column: 3 },
                { line: 5, column: 3 },
                { line: 6, column: 3 },
                { line: 7, column: 3 },
                { line: 3, column: 2 },
                { line: 3, column: 1 },
                { line: 3, column: 0 },
                { line: 3, column: 4 },
                { line: 3, column: 5 },
                { line: 3, column: 6 },
                { line: 3, column: 7 },
                { line: 2, column: 2 },
                { line: 1, column: 1 },
                { line: 0, column: 0 },
                { line: 2, column: 4 },
                { line: 1, column: 5 },
                { line: 0, column: 6 },
                { line: 4, column: 2 },
                { line: 5, column: 1 },
                { line: 6, column: 0 },
                { line: 4, column: 4 },
                { line: 5, column: 5 },
                { line: 6, column: 6 },
                { line: 7, column: 7 },
            ];
            var result = queen.simulateMovement();
            expect(result).to.deep.equalInAnyOrder(expected);
            sinon_1.default.restore();
        });
        it('when pieces in the way, should return only', function () {
            var queen = new Queen_1.Queen("white");
            var queenItem = new BoardItem_1.BoardItem({ line: 2, column: 2 }, "dark-pink");
            queenItem.setPiece(queen);
            var pawn = new Pawn_1.Pawn("white");
            var pawnItem = new BoardItem_1.BoardItem({ line: 2, column: 1 }, "dark-pink");
            pawnItem.setPiece(pawn);
            var pawnTwo = new Pawn_1.Pawn("white");
            var pawnTwoItem = new BoardItem_1.BoardItem({ line: 3, column: 3 }, "dark-pink");
            pawnTwoItem.setPiece(pawnTwo);
            var pawnThree = new Pawn_1.Pawn("white");
            var pawnThreeItem = new BoardItem_1.BoardItem({ line: 2, column: 4 }, "dark-pink");
            pawnThreeItem.setPiece(pawnThree);
            var pawnFour = new Pawn_1.Pawn("white");
            var pawnFourItem = new BoardItem_1.BoardItem({ line: 1, column: 2 }, "dark-pink");
            pawnFourItem.setPiece(pawnFour);
            var rook = new Rook_1.Rook("white");
            var rookItem = new BoardItem_1.BoardItem({ line: 0, column: 0 }, "dark-pink");
            rookItem.setPiece(rook);
            var rei = new King_1.King("white");
            var itemRei = new BoardItem_1.BoardItem({ line: 0, column: 4 }, "dark-pink");
            itemRei.setPiece(rei);
            var opponentPawn = new Pawn_1.Pawn("white");
            var opponentPawnItem = new BoardItem_1.BoardItem({ line: 6, column: 2 }, "white");
            opponentPawnItem.setPiece(opponentPawn);
            var items = [
                queenItem,
                pawnItem,
                pawnTwoItem,
                pawnThreeItem,
                pawnFourItem,
                opponentPawnItem,
                rookItem,
                itemRei,
            ];
            sinon_1.default.replace(Board_1.Board.prototype, 'getItem', function (position) {
                var item = items.find(function (item) { return lodash_1.default.isEqual(item.getPosition(), position); });
                return item || new BoardItem_1.BoardItem(position, "white");
            });
            var board = new Board_1.Board();
            items.forEach(function (item) { return board.addItem(item); });
            var expected = [
                { line: 1, column: 1 },
                { line: 1, column: 3 },
                { line: 2, column: 3 },
                { line: 3, column: 1 },
                { line: 3, column: 2 },
                { line: 4, column: 0 },
                { line: 4, column: 2 },
                { line: 5, column: 2 },
            ];
            var result = queen.simulateMovement();
            expect(result).to.deep.equalInAnyOrder(expected);
            sinon_1.default.restore();
        });
    });
});
