import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const {searchParams} = request.nextUrl;
    const data = await request.json();
    const id = data.id;
    console.log("party")

    const response = await fetch(`http://localhost:3000/documents/delete?id=${id}`);
    const jsonResponse = await response.json();
    return NextResponse.json("hmm")
}