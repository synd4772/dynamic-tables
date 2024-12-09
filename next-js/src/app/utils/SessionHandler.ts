import { DataHandler } from "./DataHandler";

export class SessionHandler{
    private sessions: Map<string, DataHandler>;

    constructor(){
        this.sessions = new Map();
    }

    async addSession({key}: AddSessionProps): Promise<DataHandler>{
        console.log("ip:", key, "has been added")
        const sessionDataHandler = new DataHandler();
        this.sessions.set(key, sessionDataHandler)
        return sessionDataHandler
    }

    async deleteSession({key}: AddSessionProps){
        this.sessions.delete(key);
    }

    getSession({key}: AddSessionProps): DataHandler | undefined{
        return this.sessions.get(key)
    }
}

interface AddSessionProps{
    key: string
}