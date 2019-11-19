"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var PASTA_LOCAL = process.cwd();
var carregarTabuleiro = function (req, res) {
    var arquivo = fs_1.default.readFileSync(PASTA_LOCAL + "/src/tabuleiro.json");
    res.send(arquivo.toString());
    res.end(arquivo.toString());
};
var escreverJSON = function (req, res) {
    console.log(new Date(), '    Saving Board...');
    var body = req.body;
    var json = body.json;
    fs_1.default.writeFileSync(PASTA_LOCAL + "/src/tabuleiro.json", json);
};
var app = express_1.default();
app.options('*', cors_1.default());
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.listen(3000, function () { return console.log("Express server is listening"); });
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype');
    res.send('cors problem fixed:)');
});
app.get('/carregar', carregarTabuleiro);
app.post('/salvar', escreverJSON);
