import { NextRequest, NextResponse } from "next/server";
import workConfig from "config/workConfig";

export async function middleware(request: NextRequest) {
  const { locales, defaultLocale } = workConfig.i18n;

  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect to default locale if there is no supported locale prefix
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }
}

export const config = {
  // Do not localize these paths
  matcher: ["/((?!api|_next/static|slice-simulator|favicon.ico).*)"],
};
