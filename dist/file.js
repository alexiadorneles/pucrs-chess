"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var LOCAL_FOLDER = process.cwd();
var loadBoard = function (req, res) {
    var file = fs_1.default.readFileSync(LOCAL_FOLDER + "/src/board.json");
    res.send(file.toString());
    res.end(file.toString());
};
var writeJSON = function (req, res) {
    var json = req.body.json;
    fs_1.default.writeFileSync(LOCAL_FOLDER + "/src/board.json", json);
};
var app = express_1.default();
app.options('*', cors_1.default());
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.listen(9090, function () { return console.log("Express server is listening"); });
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
});
app.get('/load', loadBoard);
app.post('/save', writeJSON);
