"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("../board/Board");
var BoardItem_1 = require("../board/BoardItem");
var PieceBuilder_1 = require("../PieceBuilder");
var BoardReplicationAdapter = (function () {
    function BoardReplicationAdapter(itemReplication) {
        this.itemReplication = itemReplication;
        this.replicate = this.replicate.bind(this);
    }
    BoardReplicationAdapter.prototype.replicate = function (object) {
        var board = Object.assign(new Board_1.Board(), object);
        board.items = board.getAllItems().map(this.itemReplication.replicate);
        return board;
    };
    return BoardReplicationAdapter;
}());
exports.BoardReplicationAdapter = BoardReplicationAdapter;
var BoardItemReplicationAdapter = (function () {
    function BoardItemReplicationAdapter(pieceReplication) {
        this.pieceReplication = pieceReplication;
        this.replicate = this.replicate.bind(this);
    }
    BoardItemReplicationAdapter.prototype.replicate = function (object) {
        var item = Object.assign(new BoardItem_1.BoardItem(object.position, object.color), object);
        this.pieceReplication.replicate(item.getPiece());
        return item;
    };
    return BoardItemReplicationAdapter;
}());
exports.BoardItemReplicationAdapter = BoardItemReplicationAdapter;
var PieceReplicationAdapter = (function () {
    function PieceReplicationAdapter(movementReplication) {
        this.movementReplication = movementReplication;
        this.replicate = this.replicate.bind(this);
    }
    PieceReplicationAdapter.prototype.replicate = function (object) {
        if (!object)
            return;
        var instantiationFn = PieceBuilder_1.PieceBuilderMap.get(object.kind);
        var piece = Object.assign(new instantiationFn(object.color), object);
        piece.setMovements(piece.getMovements().map(this.movementReplication.replicate));
        return piece;
    };
    return PieceReplicationAdapter;
}());
exports.PieceReplicationAdapter = PieceReplicationAdapter;
var MovementReplicationAdapter = (function () {
    function MovementReplicationAdapter() {
    }
    MovementReplicationAdapter.prototype.replicate = function (object) {
        var model = new PieceBuilder_1.MovementBuilderMap[object.kind]();
        return Object.assign(model, object);
    };
    return MovementReplicationAdapter;
}());
exports.MovementReplicationAdapter = MovementReplicationAdapter;
var ReplicationAdapterFactory = (function () {
    function ReplicationAdapterFactory() {
    }
    ReplicationAdapterFactory.prototype.createBoardReplicationAdapter = function () {
        return new BoardReplicationAdapter(this.createItemReplicationAdapter());
    };
    ReplicationAdapterFactory.prototype.createItemReplicationAdapter = function () {
        return new BoardItemReplicationAdapter(this.createPieceReplicationAdapter());
    };
    ReplicationAdapterFactory.prototype.createPieceReplicationAdapter = function () {
        return new PieceReplicationAdapter(this.createMovementReplicationAdapter());
    };
    ReplicationAdapterFactory.prototype.createMovementReplicationAdapter = function () {
        return new MovementReplicationAdapter();
    };
    return ReplicationAdapterFactory;
}());
exports.ReplicationAdapterFactory = ReplicationAdapterFactory;
