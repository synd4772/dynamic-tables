"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const connection = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dynamic-table'
});
connection.connect((err) => {
    if (err) {
        console.error("Error by connection to database", err);
        return;
    }
    console.log("Connection is opened as", connection.threadId);
});
exports.default = connection;
