import Joi from "joi";
import connection from "../db";
import { MAIN_TABLE_NAME } from "../config/config";
import { DocumentState } from "../../../shared/types/documents.types";

const DocumentSchema = () => {
    const schema = Joi.object({
        id: Joi.number().integer().external(async (value) => {
            const response = await connection(MAIN_TABLE_NAME).where("id", value).select("*")
            if(response.length != 0){
                throw new Error('ID already exists.');
            }
            return value;
        }).required(),
        state: Joi.string().valid(...Object.values(DocumentState)).required(),
        stateTime: Joi.string().pattern(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3,6})$/).required(),
        documentName: Joi.string().pattern(/^Doc\s+[A-Za-z0-9-_]+$/).required(),
        documentNumber: Joi.number().integer().required(),
        documentDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
        documentTotalAmount: Joi.number().integer().required()
    })
    return schema;
}

export default DocumentSchema;