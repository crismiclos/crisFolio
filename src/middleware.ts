import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "es"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Detection logic
    const acceptLanguage = request.headers.get("accept-language");
    let locale = defaultLocale;
    if (acceptLanguage && acceptLanguage.includes("es")) {
        locale = "es";
    }

    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|fonts|favicon.ico).*)"],
};
