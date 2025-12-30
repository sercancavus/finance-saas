import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)', '/api(.*)']);

// 1. Yine 'async' kullanıyoruz çünkü hata Promise olduğunu söyledi
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // 2. auth() cevabını bir değişkene alıp bekliyoruz
    const authObject = await auth();
    
    // 3. 'protect()' yerine manuel kontrol yapıyoruz:
    // Eğer userId yoksa (giriş yapmamışsa), giriş sayfasına yönlendir.
    if (!authObject.userId) {
      return authObject.redirectToSignIn();
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};