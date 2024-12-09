import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "./config/config";
import knex from "knex";


const connection = knex({
    client:"mysql2",
    connection:{
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    }
})

export default connection;