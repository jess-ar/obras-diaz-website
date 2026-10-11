# SEO

El dominio canónico es `https://obras-diaz.vercel.app`, definido en
`src/config/seo.ts`. Si cambia, actualizar también `public/robots.txt`.

El build genera HTML con títulos, descripciones, URLs canónicas, Open Graph,
tarjetas sociales y datos estructurados para cada página y proyecto. El contenido
de React sigue renderizándose en el navegador; no es una conversión a SSR.
Los metadatos también cambian al navegar sin recargar la página.

Validación local: ejecutar `pnpm build` y `pnpm check:seo` para comprobar
metadatos, sitemap, datos estructurados e imágenes de las páginas generadas.

`dist/sitemap.xml` se genera a partir de las páginas públicas y del catálogo de
proyectos. Las páginas legales y las URLs inexistentes tienen `noindex, follow`.
Vercel sirve el HTML específico de cada ruta y redirige las rutas antiguas.
Si se añaden proyectos, actualizar la lista de IDs en `vercel.json`.
Las URLs desconocidas ya no se reescriben a la home: deben devolver HTTP 404.

En `vite.config.ts` las dos importaciones locales usan rutas relativas porque
el alias de Vite todavía no está disponible al cargar su propia configuración.
Las importaciones de la aplicación dentro de `src` siguen usando `@`.

Después de publicar:

1. Verificar el dominio en Google Search Console.
2. Enviar `https://obras-diaz.vercel.app/sitemap.xml`.
3. Inspeccionar la home y una URL de proyecto y solicitar indexación.
4. Comprobar que las URLs inexistentes responden con HTTP 404.

No se han añadido dirección, teléfono, horarios ni valoraciones sin confirmar.
Los datos estructurados describen la organización y el servicio; no incluyen una
ficha LocalBusiness incompleta. La aparición y la posición en Google dependen
del rastreo, del contenido y de otros factores; no son inmediatas ni garantizadas.
