import { NextRequest, NextResponse } from "next/server";
import { DefaultRequest, DataRequest } from "../../../../../shared/types/documents.types";
import { loadEnvConfig } from '@next/env'
import { DefaultHeaders, Document } from "../../../../../shared/types/documents.types";
const projectDir = process.cwd()
loadEnvConfig(projectDir)

export async function GET(request: NextRequest) {
    const {searchParams} = request.nextUrl;
    const key = searchParams.get("key");
    const isAscending = searchParams.get("isAscending");
    const start = searchParams.get("start");
    const end = searchParams.get("end");


    console.log("SOMETHING IS HAPPENING", `http://localhost:3000/documents?key=${key}&isAscending=${isAscending}&start=${start}&end=${end}`)
    const response = await fetch(`http://localhost:3000/documents?key=${key}&isAscending=${isAscending}&start=${start}&end=${end}`);
    
    const jsonResponse = await response.json();
    console.log(jsonResponse, "ura")
    return NextResponse.json({data:jsonResponse})
}