import { Document } from "../../../shared/types/documents.types";

export class ChunkHandler{
    processedChunks: Document[];
    cache: string;
    
    constructor(){
        this.processedChunks = []
        this.cache = ''
    }

    processChunk(chunk: string){
        this.cache += chunk;
        let regex = /{[^]*?}/g;
        let match;
        while((match = regex.exec(this.cache)) != null){
            this.cache = this.cache.slice(match["index"] + match[0].length)
            this.processedChunks.push(JSON.parse(match[0]))
            regex = /{[^]*?}/g;
        }
    }
}