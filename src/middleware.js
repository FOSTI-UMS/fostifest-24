import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();

  // Defined pathname validation
  const pathname = (path) => req.nextUrl.pathname.startsWith(path);

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Refresh session if expired - required for Server Components
  const user = await supabase.auth.getUser();

  const isAuthenticated = !!session;

  // Handle admin route
  if (pathname("/admin")) {
    // if (!isAuthenticated) {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // }

    // const id = user?.data?.user?.id;
    // const { data: userData } = await supabase.from("user").select("role").eq("id", id).single();
    // if (userData?.role !== "admin") {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protect dashboard route for users
  if (pathname("/dashboard")) {
    // if (!isAuthenticated) {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // }
    // const id = user?.data?.user?.id;
    // const { data: userData } = await supabase.from("user").select("role").eq("id", id).single();

    // // If there is no session or the user role is not "user", redirect to login
    // if (!session) {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // } else if (userData?.role === "admin") {
    //   // If the role is not "user", redirect to admin page
    //   return NextResponse.redirect(new URL("/admin", req.url));
    // }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protect auth route from authenticated users
  if (pathname("/login") || pathname("/register")) {
    return NextResponse.redirect(new URL("/", req.url));
    // return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
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
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
