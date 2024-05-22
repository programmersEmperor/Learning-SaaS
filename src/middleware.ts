import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/', '/api(.*)'])

export default clerkMiddleware((auth, req)=>{
    if(!isPublicRoute(req)){
        // console.log("auth " + JSON.stringify(auth()) + "middleware url: " + req.url)
        auth().protect()
    }
});


export const config = {
  matcher: ['/((?!fonts|_next/static|_next/image|favicon.ico|assets).*)'],
};