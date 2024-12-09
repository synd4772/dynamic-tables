import { Request, Response } from "express";
import { dataHandler } from "../services/dataHandler.service";

const deleteDocument = async (req: Request, res: Response) => {
    
    const id = Number(req.query.id);
    console.log(id)
    try{
        if(id){
            console.log("HELLLOO")
            const results = await dataHandler.deleteDocument(id);
            console.log(results)
            await res.status(200).json("cool")
        }
        else{
            await res.status(400).json("bruh")
        }
    }
    catch{
        await res.status(400).json("bruh")
    }
}
export default deleteDocument;