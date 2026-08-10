/**
 * EL ÚNICO SITIO DONDE SE AÑADE CONTENIDO AL PORTAFOLIO.
 *
 * Una entrada = una colección = una marca. Aparece como tarjeta en /trabajos
 * y al abrirla se ve su galería (modo cine, mosaico y lightbox).
 *
 * Cómo añadir una:
 *   1. Copia las imágenes a  public/trabajos/<id-de-la-coleccion>/
 *   2. Copia el bloque de ejemplo de abajo, quítale los "//" y rellénalo.
 *
 * Regla del Brand Core: nunca se publica una pieza sin decir qué problema
 * resolvía. Por eso `historia` es obligatoria.
 */

export type Disciplina = "video" | "fotografia" | "direccion";

/** vertical = reel 9:16 · horizontal = apaisado */
export type Formato = "horizontal" | "vertical";

export type Pieza = {
    /** número correlativo dentro de la colección: 1, 2, 3... */
    id: number;
    formato: Formato;
    /** ruta de la imagen dentro de public/. Si falta, sale el marcador gris. */
    src?: string;
    /** enlace a la publicación original del cliente, si la pieza es un video */
    urlOriginal?: string;
};

export type Coleccion = {
    /** slug para la URL: /trabajos/alo-caracas */
    id: string;
    /** nombre de la marca — es el título de la colección */
    titulo: string;
    disciplina: Disciplina;
    /** una línea que resume la colección */
    descripcion: string;
    anio: string;
    ubicacion: string;
    /** tu papel real: "Dirección, cámara y edición" */
    rol: string;
    /** qué problema resolvía este trabajo. Obligatorio. */
    historia: string;
    /** imagen de la tarjeta en la grilla */
    portada?: string;
    piezas: Pieza[];
};

export const colecciones: Coleccion[] = [
    // ── EJEMPLO. Copia este bloque, quítale los "//" y rellénalo ──────────
    // {
    //     id: "alo-caracas",
    //     titulo: "Aló Caracas",
    //     disciplina: "video",
    //     descripcion: "Campaña de lanzamiento de temporada.",
    //     anio: "2025",
    //     ubicacion: "Caracas, Venezuela",
    //     rol: "Dirección, cámara y edición",
    //     historia: "La marca tenía producto nuevo y ninguna pieza que lo hiciera deseable en redes. Construimos una campaña de cinco reels con una sola idea: mostrar el producto en uso real, no en bodegón.",
    //     portada: "/trabajos/alo-caracas/portada.jpg",
    //     piezas: [
    //         { id: 1, formato: "vertical", src: "/trabajos/alo-caracas/01.jpg", urlOriginal: "https://www.instagram.com/p/XXXX/" },
    //         { id: 2, formato: "horizontal", src: "/trabajos/alo-caracas/02.jpg" },
    //     ],
    // },
];

export const buscarColeccion = (id: string) => colecciones.find((c) => c.id === id);
