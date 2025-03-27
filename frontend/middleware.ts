import { clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', // Matches /dashboard and its subroutes
  '/code(.*)',      // Matches /code and its subroutes
]);

export default clerkMiddleware((auth, req) => {
  // Protect routes that match /dashboard or /code
  if (isProtectedRoute(req)) {
    auth.protect(); // Redirects unauthenticated users to sign-in
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};