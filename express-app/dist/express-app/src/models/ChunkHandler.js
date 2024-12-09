"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkHandler = void 0;
class ChunkHandler {
    constructor() {
        this.processedChunks = [];
        this.cache = '';
    }
    processChunk(chunk) {
        this.cache += chunk;
        let regex = /{[^]*?}/g;
        let match;
        while ((match = regex.exec(this.cache)) != null) {
            this.cache = this.cache.slice(match["index"] + match[0].length);
            this.processedChunks.push(JSON.parse(match[0]));
            regex = /{[^]*?}/g;
        }
    }
}
exports.ChunkHandler = ChunkHandler;
