import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// next-intl middleware — handles locale detection + redirects + rewrites
const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 1. Run next-intl middleware first — this returns a response that
  //    may contain an internal rewrite (e.g. / → /ro) or a redirect.
  //    We MUST use this response as the base, not create a new one.
  const response = intlMiddleware(request);

  // 2. Supabase auth — refresh session + protect routes
  //    We use the intl response as the base so the rewrite is preserved.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Extract pathname without locale prefix for route matching
  const { pathname } = request.nextUrl;
  const pathnameWithoutLocale = pathname.replace(/^\/(en|ro)/, "") || "/";

  // Protected routes
  if (
    pathnameWithoutLocale.startsWith("/dashboard") ||
    pathnameWithoutLocale.startsWith("/admin")
  ) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathnameWithoutLocale);
      return NextResponse.redirect(url);
    }

    // Get user profile role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    // Admin — check role
    if (pathnameWithoutLocale.startsWith("/admin")) {
      if (!profile || profile.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    // Dashboard — redirect admins to admin panel
    if (pathnameWithoutLocale.startsWith("/dashboard")) {
      if (profile?.role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|mov|avi|mp3|wav|pdf|doc|docx|xls|xlsx|zip)$).*)",
  ],
};
