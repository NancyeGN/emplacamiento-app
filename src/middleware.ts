import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)", // Protege el dashboard
  "/profile(.*)", 
]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  if (isProtectedRoute(req) && !session.userId) {
    return session.redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!sign-in|sign-up).*)"], // Permite acceso libre a sign-in y sign-up
};