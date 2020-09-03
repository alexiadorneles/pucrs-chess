"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Model_1 = require("../../definitions/Model");
var BoardItem = (function (_super) {
    __extends(BoardItem, _super);
    function BoardItem(position, color) {
        var _this = _super.call(this) || this;
        _this.set('color', color);
        _this.set('position', position);
        return _this;
    }
    BoardItem.prototype.setHighlight = function (isHighlighted) {
        this.set('isHighlighted', isHighlighted);
        this.updateStyles();
        if (isHighlighted) {
            if (lodash_1.default.isEqual(this.get('piece'), this.get('board').get('currentMovingPieces'))) {
                this.simulateMovement();
            }
        }
        else {
            this.removeHighlightFromBoard();
        }
    };
    BoardItem.prototype.removeHighlight = function () {
        this.set('isHighlighted', false);
        this.updateStyles();
    };
    BoardItem.prototype.removeHighlightFromBoard = function () {
        this.get('board')
            .get('control')
            .clearHighlights();
    };
    BoardItem.prototype.simulateMovement = function () {
        if (this.get('piece')) {
            var positions = this.get('piece').simulateMovement();
            this.get('board')
                .get('control')
                .highlightPositions(positions);
        }
    };
    BoardItem.prototype.updateStyles = function () {
        var styleClass = this.get('element').getAttribute('class');
        var alreadyHighlighted = styleClass.includes('highlight');
        if (alreadyHighlighted && !this.get('isHighlighted'))
            styleClass = styleClass.replace('highlight', '');
        var highlightClass = this.get('isHighlighted') && !alreadyHighlighted ? 'highlight' : '';
        this.get('element').setAttribute('class', styleClass + " " + highlightClass);
    };
    return BoardItem;
}(Model_1.Model));
exports.BoardItem = BoardItem;
