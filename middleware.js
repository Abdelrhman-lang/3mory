import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/about",
  "/shop",
  "/contact",
  "/product/:id",
  "/cart",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  let role = "user"; // القيمة الافتراضية

  // 🔥 لو فيه مستخدم مسجل، هنجيب بياناته الحية فوراً من السيرفر بدون كاش Token
  if (userId) {
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      role = user.publicMetadata?.role || "user";
    } catch (err) {
      console.error("Error fetching user role in middleware:", err);
    }
  }

  // طباعة الـ Role للتأكيد بنسبة 100%
  console.log("🔴 Live User Role in Terminal:", role);

  // حماية مسار الأدمن
  if (isAdminRoute(req) && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // حماية المسارات الخاصة
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
