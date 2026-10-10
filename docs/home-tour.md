# Recorrido de Calle Girona

Estado: estructura React/GSAP y fotografías reales; no hay vídeos de transición.
La vista con fotografías es una base de revisión, no sustituye el recorrido cinematográfico.

Secuencia: 001 → 004 → 008 → 005 → 016 (public/home/girona).
Generar cuatro clips: salón general a detalle, detalle a cocina, cocina a salón junto a ventanas, salón a estancia blanca.
Validar geometría, muebles y continuidad antes de publicar. Las conexiones entre estancias no están confirmadas por las fotos.
No inventar estancias ni utilizar outpainting. Las fotos tienen 720 px de ancho; obtener originales mayores si están disponibles.

## Incorporar clips

Guardar MP4 H.264 sin audio en public/video/girona/.
Usar fotograma inicial y final de las fotos correspondientes, sin modificar los originales.
Codificar para búsqueda frecuente: GOP corto (por ejemplo 6), yuv420p, faststart y color coherente.
Extraer un póster WebP del primer fotograma de cada MP4.
Añadir src y poster en TOUR_CLIPS, en homeTour.ts, sustituyendo los null.
Revisar coincidencia del último fotograma de cada clip con el primero del siguiente.

El progreso de scroll determina currentTime; no hay reproducción automática.
Solo se cargan el tramo actual y el siguiente; se cancelan cargas antiguas y se liberan blobs al salir.
Con movimiento reducido o ahorro de datos se muestran escenas estáticas.
Verificar Safari/iOS real: búsqueda adelante/atrás, pausa, cambio de tramo, permisos de play(), red lenta y rotación.
Probar escritorio/tablet/móvil, teclado, reduced-motion, CTA a las otras paginas, navegación fuera y vuelta, resize y ausencia de overflow horizontal.

La home contiene solo el recorrido, sin secciones adicionales debajo.
