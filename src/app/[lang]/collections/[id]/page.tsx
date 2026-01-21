"use client";

import React, { useState, use } from "react";
import styles from "./collection.module.css";
import { notFound } from "next/navigation";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";

const collectionData: Record<string, any> = {
    "urban-serenity": {
        title: "Urban Serenity",
        description: {
            en: "A study of Tokyo's quiet moments amidst the neon chaos.",
            es: "Un estudio de los momentos tranquilos de Tokio entre el caos de neón."
        },
        story: {
            en: "Capturing the city when it breathes. These images were taken over three weeks during the rainy season, focusing on the reflections and the isolation of urban life.",
            es: "Capturando la ciudad cuando respira. Estas imágenes fueron tomadas durante tres semanas en la temporada de lluvias, enfocándose en los reflejos y el aislamiento de la vida urbana."
        },
        date: "2025",
        location: { en: "Tokyo, Japan", es: "Tokio, Japón" },
        gear: "Sony A7R V, 35mm f/1.4",
        images: [
            { id: 1, type: "horizontal" },
            { id: 2, type: "vertical" },
            { id: 3, type: "horizontal" },
            { id: 4, type: "vertical" },
            { id: 5, type: "horizontal" },
            { id: 6, type: "vertical" },
            { id: 7, type: "horizontal" },
            { id: 8, type: "horizontal" },
            { id: 9, type: "vertical" },
            { id: 10, type: "horizontal" },
            { id: 11, type: "vertical" },
            { id: 12, type: "horizontal" },
        ],
    },
    "natural-echoes": {
        title: "Natural Echoes",
        description: {
            en: "The raw power and silent whispers of the Icelandic highlands.",
            es: "El poder puro y los susurros silenciosos de las tierras altas de Islandia."
        },
        story: {
            en: "Crossing the highlands in a modified 4x4, I sought the textures that define the earth's oldest memories.",
            es: "Cruzando las tierras altas en un 4x4 modificado, busqué las texturas que definen las memorias más antiguas de la tierra."
        },
        date: "2024",
        location: "Iceland",
        gear: "Fujifilm GFX 100S, 23mm & 45-100mm",
        images: [
            { id: 13, type: "vertical" },
            { id: 14, type: "horizontal" },
            { id: 15, type: "horizontal" },
            { id: 16, type: "vertical" },
            { id: 17, type: "horizontal" },
            { id: 18, type: "vertical" },
            { id: 19, type: "horizontal" },
            { id: 20, type: "horizontal" },
        ],
    },
    "silent-stories": {
        title: "Silent Stories",
        description: {
            en: "The forgotten corners of Venice's winter mornings.",
            es: "Los rincones olvidados de las mañanas de invierno en Venecia."
        },
        story: {
            en: "Venice in November belongs to the locals and the fog. These stories were found in the alleys far from San Marco.",
            es: "Venecia en noviembre pertenece a los lugareños y a la niebla. Estas historias fueron encontradas en los callejones lejos de San Marco."
        },
        date: "2024",
        location: { en: "Venice, Italy", es: "Venecia, Italia" },
        gear: "Leica M11, 35mm Summilux",
        images: [
            { id: 21, type: "horizontal" },
            { id: 22, type: "horizontal" },
            { id: 23, type: "vertical" },
            { id: 24, type: "horizontal" },
            { id: 25, type: "vertical" },
            { id: 26, type: "horizontal" },
            { id: 27, type: "vertical" },
            { id: 28, type: "horizontal" },
        ],
    },
    "nocturnal-rhythm": {
        title: "Nocturnal Rhythm",
        description: {
            en: "The electric pulse of nightlife in Berlin.",
            es: "El pulso eléctrico de la vida nocturna en Berlín."
        },
        story: {
            en: "Between the clubs and the late-night kebab stands, there's a rhythm that only surfaces after midnight.",
            es: "Entre los clubes y los puestos de kebab nocturnos, hay un ritmo que solo aflora después de la medianoche."
        },
        date: "2025",
        location: { en: "Berlin, Germany", es: "Berlín, Alemania" },
        gear: "Sony A7S III, 50mm f/1.2",
        images: [
            { id: 29, type: "vertical" },
            { id: 30, type: "vertical" },
            { id: 31, type: "horizontal" },
            { id: 32, type: "vertical" },
            { id: 33, type: "horizontal" },
            { id: 34, type: "vertical" },
            { id: 35, type: "horizontal" },
            { id: 36, type: "vertical" },
        ],
    },
};

const i18n = {
    en: {
        date: "Date",
        location: "Location",
        equipment: "Equipment",
        storyTitle: "The Story",
        cinema: "Cinema",
        masonry: "Masonry",
        wantMore: "Want to see more?",
        backLink: "View all collections"
    },
    es: {
        date: "Fecha",
        location: "Ubicación",
        equipment: "Equipo",
        storyTitle: "La Historia",
        cinema: "Cine",
        masonry: "Mosaico",
        wantMore: "¿Quieres ver más?",
        backLink: "Ver todas las colecciones"
    }
};

export default function CollectionDetailPage({ params }: { params: Promise<{ id: string, lang: "en" | "es" }> }) {
    const { id, lang } = use(params);
    const [viewMode, setViewMode] = useState<"cinema" | "masonry">("cinema");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [hasMoved, setHasMoved] = useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const collection = collectionData[id];

    if (!collection) {
        notFound();
    }

    const t = i18n[lang] || i18n.en;

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setHasMoved(false);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        if (Math.abs(x - startX) > 5) setHasMoved(true);
        e.preventDefault();
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handlePrev = () => {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + collection.images.length) % collection.images.length : null));
    };

    const handleNext = () => {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % collection.images.length : null));
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <div className={styles.info}>
                    <h1 className={styles.title}>{collection.title}</h1>
                    <p className={styles.description}>{collection.description[lang] || collection.description.en || collection.description}</p>

                    <div className={styles.metadata}>
                        <div className={styles.metaItem}>
                            <span>{t.date}</span>
                            <p>{collection.date}</p>
                        </div>
                        <div className={styles.metaItem}>
                            <span>{t.location}</span>
                            <p>{typeof collection.location === "string" ? collection.location : (collection.location[lang] || collection.location.en)}</p>
                        </div>
                        <div className={styles.metaItem}>
                            <span>{t.equipment}</span>
                            <p>{collection.gear}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.story}>
                    <h3>{t.storyTitle}</h3>
                    <p>{collection.story[lang] || collection.story.en || collection.story}</p>

                    <div className={styles.viewToggle}>
                        <button
                            className={viewMode === "cinema" ? styles.active : ""}
                            onClick={() => setViewMode("cinema")}
                        >
                            {t.cinema}
                        </button>
                        <button
                            className={viewMode === "masonry" ? styles.active : ""}
                            onClick={() => setViewMode("masonry")}
                        >
                            {t.masonry}
                        </button>
                    </div>
                </div>
            </header>

            {viewMode === "cinema" ? (
                <div className={styles.cinemaWrapper}>
                    <div
                        ref={scrollRef}
                        className={`${styles.horizontalScroll} ${isDragging ? styles.grabbing : ""}`}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        <div className={styles.gallery}>
                            {collection.images.map((img: any, idx: number) => (
                                <div
                                    key={img.id}
                                    className={`${styles.imageWrapper} ${styles[img.type]}`}
                                    onClick={() => !hasMoved && setLightboxIndex(idx)}
                                >
                                    <div className={styles.imagePlaceholder}></div>
                                    <span className={styles.imageLabel}>IMG_{img.id}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.masonryWrapper}>
                    <div className={styles.masonry}>
                        {collection.images.map((img: any, idx: number) => (
                            <div
                                key={img.id}
                                className={`${styles.masonryItem} ${styles[img.type]}`}
                                onClick={() => setLightboxIndex(idx)}
                            >
                                <div className={styles.imagePlaceholder}></div>
                                <span className={styles.masonryLabel}>MICLOSS / {collection.title} / 0{img.id}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {lightboxIndex !== null && (
                <Lightbox
                    images={collection.images}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}

            <section className={styles.footer}>
                <p>{t.wantMore}</p>
                <Link href={`/${lang}/collections`} className={styles.backLink}>{t.backLink}</Link>
            </section>
        </main>
    );
}
