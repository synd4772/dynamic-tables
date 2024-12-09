import dotenv from 'dotenv';
dotenv.config();

export const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : "";
export const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : "";
export const DB_USER = process.env.DB_USER ? process.env.DB_USER : "";
export const DB_PASSWORD = process.env.DB_PASS ? process.env.DB_PASSWORD : "";
export const API_URL = process.env.API_URL ? process.env.API_URL + "assets/data-100K.json" : "";
export const DOCUMENTS_COUNT_LIMIT = process.env.DOCUMENTS_COUNT_LIMIT ? process.env.DOCUMENTS_COUNT_LIMIT : "";
export const MAIN_TABLE_NAME = process.env.MAIN_TABLE_NAME ? process.env.MAIN_TABLE_NAME : "";


