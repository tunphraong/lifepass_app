import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'
import { i18n } from "./i18n-config";
import { NextResponse } from "next/server";


// function getLocale(request: NextRequest): string | undefined {
//   // Negotiator expects plain object so we need to transform headers
//   const negotiatorHeaders: Record<string, string> = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//   // @ts-ignore locales are readonly
//   const locales: string[] = i18n.locales;

//   // Use negotiator and intl-localematcher to get best locale
//   let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
//     locales
//   );

//   const locale = matchLocale(languages, locales, i18n.defaultLocale);

//   return locale;
// }

export async function middleware(request: NextRequest) {
  // const pathname = request.nextUrl.pathname;
  // // Check if there is any supported locale in the pathname
  // const pathnameIsMissingLocale = i18n.locales.every(
  //   (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  // );

  //   const locale = getLocale(request);
  //   console.log



  // // Redirect if there is no locale
  // if (pathnameIsMissingLocale) {
  //   const locale = getLocale(request);

  //   // e.g. incoming request is /products
  //   // The new URL is now /en-US/products
  //   return NextResponse.redirect(
  //     new URL(
  //       `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
  //       request.url
  //     )
  //   );
  // }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}