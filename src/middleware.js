import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";

const protectedRoutes = ["/adduser", '/dashboard']
const pubilcRoutes = ["/login"]


export default async function middleware(req){
    const {pathname, origin} = req.nextUrl
    const isProtectedRoute = protectedRoutes.includes(pathname)
    const isPublic = pubilcRoutes.includes(pathname)
    const isLoggedIn =  req.cookies.get("isLoggedIn")?.value === "true";
    if (isProtectedRoute && !isLoggedIn){
        return NextResponse.redirect(`${origin}/login`)
    }

    if (isPublic&&isLoggedIn){
        return NextResponse.redirect(`${origin}/dashboard`)
    }

    return NextResponse.next()
}