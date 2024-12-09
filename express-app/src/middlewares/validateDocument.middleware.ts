import { Request, Response, NextFunction } from "express";
import DocumentSchema from "../schemas/document.schema";

const validateDocument = async (req: Request, res: Response, next: NextFunction) => {
    const documentSchema = DocumentSchema();
    try{
        const { error } = await documentSchema.validateAsync(req.body);
        if(error){
            res.status(400).json({message: "someting went wrong"});
            return;
        }
        next();
    }
    catch (err){
        res.status(400).json({message: "something went wrong"});
    }


}

export default validateDocument;