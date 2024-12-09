import { dataHandler } from "../services/dataHandler.service";
import getAddDocumentSchema from "../schemas/document.schema";
import { Request, Response } from "express";

const addDocument = async (req: Request, res: Response) => {
    await dataHandler.addDocument(req.body);
    res.status(200).json({message:"ok"});
}

export default addDocument