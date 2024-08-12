import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const res = NextResponse.next()

    // Defined pathname validation
    const pathname = (path) => req.nextUrl.pathname.startsWith(path);

    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req, res })

    // Refresh session if expired - required for Server Components
    const user = await supabase.auth.getUser()


    // protect admin route
    if (pathname("/admin")) {
        const id = user?.data?.user?.id;
        const isAdmin = id && (await supabase.from("user").select("role").eq("id", id)).data[0].role === "admin";
        if (!isAdmin) return NextResponse.redirect(new URL('/', req.url));
    }
    
    // Protect auth route from authenticated user
    if ((pathname("/login") || pathname("/register-competition") || pathname("/register-workshop")) && user.data.user) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}