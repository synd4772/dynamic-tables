
import knex from "knex";
import dotenv from 'dotenv';
dotenv.config({path:"../../.env"});
import { MAIN_TABLE_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "../config/config";
import { Document } from "../../../shared/types/documents.types";

const loadQuantity = 2000;
const url = process.env.API_URL + "/assets/data-" + process.argv.slice(2)[0] + ".json"
const main = async () => {
    const connection = knex({
        client:"mysql2",
        connection:{
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME
        }
    })

    try{
        console.log(`Data parsing from ${url} has started.`)
        const documents = await (await fetch(url)).json();
        console.log(`Data parsing has finished.`)
        console.log()
        let count = 0;
        await connection(MAIN_TABLE_NAME).truncate();
        for(let i = 0; i < documents.length; i += loadQuantity){
            const slicedDocuments = documents.slice(i, i + loadQuantity)
            const mappedDocuments = slicedDocuments.map((document: Document) => {
                return {
                    id: document.id,
                    state:document.state,
                    stateTime:document.stateTime,
                    documentNumber:document.documentNumber,
                    documentName:document.documentName,
                    documentDate:document.documentDate,
                    documentTotalAmount:document.documentTotalAmount
                    }
            })
            await connection(MAIN_TABLE_NAME).insert(mappedDocuments)
            count += loadQuantity;
            console.log(`${(count * 100) / documents.length}% has been processed`)
        }
    }
    catch(err){
        console.error(err)
    }
    process.exit(0)
}

main();