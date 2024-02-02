//! basic
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const isLogin = true;
//   if (isLogin) {
//     return NextResponse.next();
//   }

//   return NextResponse.redirect(new URL("/", req.url));
// }

// export const config = {
//   matcher: ["/product", "/product/:path*", "/about"],
// };

//! bawaan
// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/product", "/product/:path*", "/about", "/profile"],
// };

//!with custom middleware
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "/product",
  "/product/:path*",
  "/about",
  "/profile",
]);
