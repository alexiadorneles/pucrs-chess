"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var models_1 = require("../main/models");
context('Pawn', function () {
    describe('calling addToItem', function () {
        it('should set item property', function () {
            var pawn = new models_1.Pawn("white");
            var item = new models_1.BoardItem({ line: 0, column: 0 }, "dark-pink");
            pawn.set('boardItem', item);
            chai_1.expect(pawn.get('boardItem')).to.deep.equals(item);
        });
    });
    describe('calling simulateMovement', function () {
        it('when free path, should return actual position and next forward', function () {
            var board = new models_1.Board();
            var pawnPosition = { line: 1, column: 2 };
            var pawn = new models_1.Pawn("white");
            var item = new models_1.BoardItem(pawnPosition, "dark-pink");
            item.set('piece', pawn);
            board.addItem(item);
            var expected = [{ line: 2, column: 2 }];
            var result = pawn.simulateMovement();
            chai_1.expect(result).to.deep.equals(expected);
        });
    });
});
