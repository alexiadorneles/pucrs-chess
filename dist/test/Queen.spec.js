"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
require("mocha");
var sinon_1 = __importDefault(require("sinon"));
var deepEqualInAnyOrder = require("deep-equal-in-any-order");
var models_1 = require("../main/models");
chai_1.default.use(deepEqualInAnyOrder);
var expect = chai_1.default.expect;
context('Queen', function () {
    describe('calling addToItem', function () {
        it('should set item property', function () {
            var queen = new models_1.Queen("white");
            var item = new models_1.BoardItem({ line: 0, column: 0 }, "dark-pink");
            queen.set('boardItem', item);
            expect(queen.get('boardItem')).to.deep.equals(item);
        });
    });
    describe('calling simulateMovement', function () {
        beforeEach(function () { return sinon_1.default.restore(); });
        it('when initial position and clean board should return a lot of options', function () {
            var board = new models_1.Board();
            var queen = new models_1.Queen("white");
            var queenItem = { line: 0, column: 3 };
            var item = new models_1.BoardItem(queenItem, "dark-pink");
            item.set('piece', queen);
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
            var board = new models_1.Board();
            var queenItem = { line: 3, column: 3 };
            var queen = new models_1.Queen("white");
            var item = new models_1.BoardItem(queenItem, "dark-pink");
            item.set('piece', queen);
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
            var queen = new models_1.Queen("white");
            var queenItem = new models_1.BoardItem({ line: 2, column: 2 }, "dark-pink");
            queenItem.set('piece', queen);
            var pawn = new models_1.Pawn("white");
            var pawnItem = new models_1.BoardItem({ line: 2, column: 1 }, "dark-pink");
            pawnItem.set('piece', pawn);
            var pawnTwo = new models_1.Pawn("white");
            var pawnTwoItem = new models_1.BoardItem({ line: 3, column: 3 }, "dark-pink");
            pawnTwoItem.set('piece', pawnTwo);
            var pawnThree = new models_1.Pawn("white");
            var pawnThreeItem = new models_1.BoardItem({ line: 2, column: 4 }, "dark-pink");
            pawnThreeItem.set('piece', pawnThree);
            var pawnFour = new models_1.Pawn("white");
            var pawnFourItem = new models_1.BoardItem({ line: 1, column: 2 }, "dark-pink");
            pawnFourItem.set('piece', pawnFour);
            var rook = new models_1.Rook("white");
            var rookItem = new models_1.BoardItem({ line: 0, column: 0 }, "dark-pink");
            rookItem.set('piece', rook);
            var rei = new models_1.King("white");
            var itemRei = new models_1.BoardItem({ line: 0, column: 4 }, "dark-pink");
            itemRei.set('piece', rei);
            var opponentPawn = new models_1.Pawn("white");
            var opponentPawnItem = new models_1.BoardItem({ line: 6, column: 2 }, "white");
            opponentPawnItem.set('piece', opponentPawn);
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
            var board = new models_1.Board();
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
