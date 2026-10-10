# Rutas

React Router ya estaba instalado. Se utiliza BrowserRouter con URLs sin hash.

| Página | URL |
| --- | --- |
| Inicio | / |
| Sobre nosotros | /sobre-nosotros |
| Proyectos | /proyectos |
| Proyecto | /proyectos/:projectId |
| Trabaja con nosotros | /trabaja-con-nosotros |
| Solicitar presupuesto | /solicitar-presupuesto |
| Privacidad | /privacidad |
| Cookies | /cookies |
| Aviso legal | /aviso-legal |

Los enlaces antiguos #/nosotros, #/galeria, etc. se convierten al abrir la aplicación. También se redirigen /nosotros, /galeria y las demás abreviaturas anteriores. Una URL desconocida muestra la página 404; un identificador de proyecto inexistente también.

## Alojamiento

El servidor debe entregar index.html para las rutas de páginas que no correspondan a archivos. Vercel utiliza vercel.json; Netlify utiliza public/_redirects (se copia a dist). Los archivos existentes deben servirse normalmente. Si se usa otro alojamiento hay que configurar allí este fallback. GitHub Pages no lo ofrece de forma nativa para estas rutas.

Comprobar en el alojamiento final: abrir directamente /sobre-nosotros y /proyectos/calle-girona, recargar, abrir enlaces en otra pestaña, navegar atrás/adelante y visitar una URL desconocida. La página 404 de esta SPA es una vista del cliente; el fallback del servidor responde HTTP 200.
