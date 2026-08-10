"use client";

import React, { useRef } from "react";
import Link from "next/link";
import styles from "./ServicesStack.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface ServicesStackProps {
    lang: string;
}

export default function ServicesStack({ lang }: ServicesStackProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const card1Ref = useRef<HTMLElement>(null);
    const card2Ref = useRef<HTMLElement>(null);
    const card3Ref = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (typeof window === "undefined") return;
        gsap.registerPlugin(ScrollTrigger);

        const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
        if (!sectionRef.current || !cards[0] || !cards[1] || !cards[2]) return;

        // Establecer posiciones iniciales explícitas
        gsap.set(cards[0], { y: "0vh", scale: 1, opacity: 1 });
        gsap.set(cards[1], { y: "100vh", scale: 1, opacity: 1 });
        gsap.set(cards[2], { y: "100vh", scale: 1, opacity: 1 });

        // Pin directo sobre la sección con distancia controlada de 1600px
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 90px",
                end: "+=1600",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        // Paso 1: La Tarjeta 2 sube desde 100vh hasta 0vh cubriendo a la Tarjeta 1
        tl.to(cards[0], {
            scale: 0.94,
            opacity: 0.4,
            duration: 1,
            ease: "none",
        }, 0);

        tl.to(cards[1], {
            y: "0vh",
            duration: 1,
            ease: "none",
        }, 0);

        // Paso 2: La Tarjeta 3 sube desde 100vh hasta 0vh cubriendo a la Tarjeta 2
        tl.to(cards[1], {
            scale: 0.94,
            opacity: 0.4,
            duration: 1,
            ease: "none",
        }, 1);

        tl.to(cards[2], {
            y: "0vh",
            duration: 1,
            ease: "none",
        }, 1);

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className={styles.section} aria-label="Servicios">
            <div className={styles.container}>
                {/* Encabezado fijo durante la apilación */}
                <header className={styles.header}>
                    <span className={styles.microLabel}>
                        {lang === "en" ? "WHAT I DO" : "LO QUE HAGO"} — {lang === "en" ? "SPECIALTIES" : "ÁREAS DE ESPECIALIDAD"}
                    </span>
                    <h2 className={styles.sectionTitle}>
                        {lang === "en" ? "Services" : "Servicios"}
                    </h2>
                </header>

                {/* Viewport para las 3 tarjetas apilables */}
                <div className={styles.cardsWrapper}>
                    {/* Tarjeta 1: DIRECCIÓN CREATIVA */}
                    <article ref={card1Ref} className={`${styles.card} ${styles.card1}`}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardNum}>01</span>
                            <span className={styles.cardTag}>
                                {lang === "en" ? "BRAND & STRATEGY" : "MARCA & ESTRATEGIA"}
                            </span>
                        </div>
                        <div className={styles.cardBody}>
                            <h3 className={styles.cardTitle}>
                                {lang === "en" ? "CREATIVE DIRECTION" : "DIRECCIÓN CREATIVA"}
                            </h3>
                            <p className={styles.cardDesc}>
                                {lang === "en"
                                    ? "Visual conceptualization, brand narrative, and strategic art direction to elevate the visual identity of projects and campaigns."
                                    : "Conceptualización visual, narrativa de marca y dirección de arte estratégica para elevar la identidad visual de proyectos y campañas."}
                            </p>
                        </div>
                        <div className={styles.cardFooter}>
                            <Link href={`/${lang}/budget`} className={styles.cardCta}>
                                <span>{lang === "en" ? "Get Quote" : "Cotizar Servicio"}</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </Link>
                        </div>
                    </article>

                    {/* Tarjeta 2: FOTOGRAFÍA */}
                    <article ref={card2Ref} className={`${styles.card} ${styles.card2}`}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardNum}>02</span>
                            <span className={styles.cardTag}>
                                {lang === "en" ? "COMMERCIAL & EDITORIAL" : "COMERCIAL & EDITORIAL"}
                            </span>
                        </div>
                        <div className={styles.cardBody}>
                            <h3 className={styles.cardTitle}>
                                {lang === "en" ? "PHOTOGRAPHY" : "FOTOGRAFÍA"}
                            </h3>
                            <p className={styles.cardDesc}>
                                {lang === "en"
                                    ? "Professional photo production, portraits, and editorial with studio lighting and high-end color grading."
                                    : "Producción fotográfica profesional, retratos y editorial con iluminación de estudio y tratamiento de color de alta gama."}
                            </p>
                        </div>
                        <div className={styles.cardFooter}>
                            <Link href={`/${lang}/budget`} className={styles.cardCta}>
                                <span>{lang === "en" ? "Get Quote" : "Cotizar Servicio"}</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </Link>
                        </div>
                    </article>

                    {/* Tarjeta 3: VIDEO / REELS / CONTENT CREATOR */}
                    <article ref={card3Ref} className={`${styles.card} ${styles.card3}`}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardNum}>03</span>
                            <span className={styles.cardTag}>
                                {lang === "en" ? "AUDIOVISUAL & REELS" : "AUDIOVISUAL & REELS"}
                            </span>
                        </div>
                        <div className={styles.cardBody}>
                            <h3 className={styles.cardTitle}>
                                {lang === "en" ? "VIDEO / REELS / CONTENT CREATOR" : "VIDEO / REELS / CONTENT CREATOR"}
                            </h3>
                            <p className={styles.cardDesc}>
                                {lang === "en"
                                    ? "Dynamic audiovisual content creation, vertical/horizontal format, high-impact editing, and narratives optimized for social media and digital platforms."
                                    : "Creación de contenido audiovisual dinámico, formato vertical/horizontal, edición de alto impacto y narrativas optimizadas para redes sociales y plataformas digitales."}
                            </p>
                        </div>
                        <div className={styles.cardFooter}>
                            <Link href={`/${lang}/budget`} className={styles.cardCta}>
                                <span>{lang === "en" ? "Get Quote" : "Cotizar Servicio"}</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </Link>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
