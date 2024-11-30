import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Exportar rutas GET y POST para el router de subida
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // Puedes agregar una configuración adicional si lo necesitas
});


