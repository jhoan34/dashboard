import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define las rutas públicas (acceso sin autenticación)
const isPublicRoute = createRouteMatcher(['/sign-up(.*)', '/sign-in(.*)', "/api/uploadthing"]);


export default clerkMiddleware(async (auth, request) => {
  // Si es una ruta pública, permite continuar sin verificar autenticación
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // Proteger rutas privadas: esto asegura que userId esté disponible
  const { userId } = await auth.protect();

  // Si no hay un usuario autenticado, redirige a /sign-in
  if (!userId && !isPublicRoute(request)) {
    const signInUrl = new URL('/sign-in', request.nextUrl.origin);
    return NextResponse.redirect(signInUrl);
  }

  // Si el usuario está autenticado, permite continuar
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Aplica a todas las rutas excepto las internas de Next.js y archivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Siempre aplica para las rutas de la API
    '/(api|trpc)(.*)',
  ],
};

