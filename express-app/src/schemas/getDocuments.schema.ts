import Joi from "joi";
import { DefaultHeaders } from "../../../shared/types/documents.types";
import { DOCUMENTS_COUNT_LIMIT } from "../config/config";
import { dataHandler } from "../services/dataHandler.service";

const getDocumentsSchema = async () => {
    const response = await dataHandler.getDocumentsCount();
    const count = response ? response : 0;

    const schema = Joi.object({
    key: Joi.string().alphanum().valid(...DefaultHeaders).required(),
    isAscending: Joi.boolean().required(),
    start: Joi.number().integer().min(0).max(count > 0 ? count - 1 : 0).required(),
    end:Joi.number().integer().min(1).greater(Joi.ref('start')).external((value, helper)=>{
        const { start } = helper.state.ancestors[0];
        const x = value - start;
        if(response){
            if(x > 0 && x <= +DOCUMENTS_COUNT_LIMIT && x <= response){
                return value;
            }
        }
        throw new Error("not valid");
    }).required(),
    })
    return schema;
};

export default getDocumentsSchema;