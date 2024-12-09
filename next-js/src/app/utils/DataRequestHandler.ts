import { headers } from "next/headers";
import { Document, DataRequest, DefaultRequest, DataAmountAnswer, IsAllDataProcessedAnswer } from "../../../../shared/types/documents.types"
import { documentEventEmitter } from "../lib/documentEventEmitter";

export class DataRequestHandler{
    private _lastData: Document[]

    constructor(){
        this._lastData = []
    }

    get lastData(){
        return this._lastData;
    }

    async fetchDocumentsData(request: DataRequest){
        const response = await fetch(`/api/documents?key=${request.body.sorting.key}&isAscending=${request.body.sorting.isAscending}&start=${request.body.coordinates.start}&end=${request.body.coordinates.end}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const jsonData =await response.json();
        documentEventEmitter.emit("dataFetched", jsonData);
        return jsonData;
    }
    async deleteRecord(id: number){
        console.log("hii")
        const response = await fetch("/api/documents/delete", {
            "method":"POST",
            "body": JSON.stringify({
                id
            }),
            "headers":{
                "Content-type":"application/json; charset=UTF-8"
            }
        })
        await response.json();
        console.log("update")
        documentEventEmitter.emit("updateCurrentDocuments", null);
        return 
    }
}