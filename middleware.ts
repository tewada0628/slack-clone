import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/uploadthing", "/api/socket/io"],
  ignoredRoutes: ["/api/socket/io"]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|api/socket/io).*)", "/", "/(api(?!/socket/io)|trpc)(.*)"],
};
