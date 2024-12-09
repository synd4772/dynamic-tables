import Express from "express";
import addDocument from "./controllers/documents.add.controller";
import getDocuments from "./controllers/documents.controller";
import validateDocument from "./middlewares/validateDocument.middleware";
import validateRequestForDocuments from "./middlewares/validateRequestForDocuments.middleware";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, API_URL, DOCUMENTS_COUNT_LIMIT, MAIN_TABLE_NAME } from "./config/config";

if(!DB_NAME || !DB_HOST || !DB_USER || !API_URL || !DOCUMENTS_COUNT_LIMIT || !MAIN_TABLE_NAME){
    console.log(DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, API_URL, DOCUMENTS_COUNT_LIMIT, MAIN_TABLE_NAME);
    console.error("env error");
    process.exit(1);
}

const app = Express();
const port = 3000;

app.use(Express.json());
app.use(Express.urlencoded({extended:true}));


app.get('/documents/', validateRequestForDocuments ,getDocuments);
app.post('/documents/add/', validateDocument, addDocument);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})