import { DefaultDocumentsProps, DefaultHeaders, Document} from "../../../shared/types/documents.types";
import { API_URL, DB_NAME, MAIN_TABLE_NAME } from "../config/config";
import connection from "../db";
import { QueryError, QueryResult } from "mysql2";

interface TableCheckResult {
    count: number;
}
type TableResultName = {
    table_name: string
}

export class DataBaseHandler{
    lastData: any = null

    async isThereATable(name: string){
        const strQuery = `
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = '${DB_NAME}';
        `;
        try{
            const tables = await connection.raw(strQuery);
            const exists = tables.some((table: { table_name: string; }) => table.table_name === "documents");
            return exists;
        }
        catch (error){
            console.error("an error was detected", error)
        }
            
        return false
        
    }

    private async __createDocumentsTable(){
        if(await this.isThereATable(MAIN_TABLE_NAME ? MAIN_TABLE_NAME : "documents")) return;

        const strQuery = `CREATE TABLE ${MAIN_TABLE_NAME}(
            id int PRIMARY KEY NOT NULL,
            state  ENUM('SUBMITTED', 'IN_PROCESS', 'ADDITIONAL_REVIEW', 'REVIEW_COMPLETED', 'INVALID') NOT NULL,
            stateTime varchar(280) not null,
            documentNumber int not null,
            documentName varchar(100) not null,
            documentDate varchar(100) not null,
            documentTotalAmount int not null
        );`;
        
       await connection.raw(strQuery);
    }

    async getDocumentsCount(){
        try{
            const result = await connection(MAIN_TABLE_NAME).count('* as count');
            return Number(result[0].count);
        }
        catch(error){
            console.log("error", error)
            return null;
        }
    }

    async addDocument(document: Document[]){
        try{
            await connection(MAIN_TABLE_NAME).insert(document);
        }
        catch(error){
            console.error(error);
        }
    }

    async getDocuments({key, isAscending, start, end}: DefaultDocumentsProps){
        try{
            const results = await connection(MAIN_TABLE_NAME).select("*").orderBy(key, isAscending ? "ASC" : "DESC").limit(end - start).offset(start)
            return results
        }
        catch(error){
            console.error(error);
            return error
        }
    }
}
