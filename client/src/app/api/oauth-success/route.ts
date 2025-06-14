import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url)
    const accessToken = searchParams.get("accessToken")
    const refreshToken = searchParams.get("refreshToken")
    const response = NextResponse.redirect(new URL("/", req.url))
    response.cookies.set("accessToken", accessToken||"")
    response.cookies.set("refreshToken", refreshToken||"")
    return response
}