import {Request, Response} from "express";
import { dataHandler } from "../services/dataHandler.service";
import { DefaultDocumentsProps, DefaultHeaders } from "../../../shared/types/documents.types";
import getDocumentsSchema from "../schemas/getDocuments.schema";
import { get } from "http";

const getDocuments = async (req: Request, res: Response) => {
    const key = req.query.key as DefaultHeaders;
    const isAscending = req.query.isAscending === "true";
    const start = Number(req.query.start);
    const end = Number(req.query.end)
    
    try{
        const documents = await dataHandler.getDocuments({key, isAscending, start, end});
        if(documents){
            //@ts-ignore
            await res.status(200).json(documents);
            return;
        }
        await res.status(400).json({error: "err"})
    }
    catch(err){
        await res.status(400).json({error: err})
    }

}

export default getDocuments;