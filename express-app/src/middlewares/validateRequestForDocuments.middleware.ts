import getDocumentsSchema from "../schemas/getDocuments.schema";
import { Request, Response, NextFunction } from "express"

const validateRequestForDocuments = async (req: Request, res: Response, next: NextFunction) => {
    const schema = await getDocumentsSchema();
    console.log(req)
    const key = req.query.key;
    const isAscending = req.query.isAscending ? req.query.isAscending === "true" : undefined;
    const start = Number(req.query.start);
    const end = Number(req.query.end)
    console.log(key, isAscending, start, end, "mevoj mevoj")
    if(key && typeof isAscending === 'boolean' && Number.isFinite(start) && Number.isFinite(end) && schema){
        const props = {
            key, isAscending, start, end
        }
        try{
            console.log(1)
            const result = await schema.validateAsync(props);
            console.log(result.error)
            if(!result.error){
                console.log(2)
                next();
                return;
            }
        }
        catch(err){
            console.log(err);
        }

        
    }
    
    res.status(400).json({message:"something went wrong"});
}

export default validateRequestForDocuments; 