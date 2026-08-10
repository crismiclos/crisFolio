"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Manifesto.module.css";

type Props = {
    label: string;
    parrafos: string[];
    signature: string;
};

/**
 * Logo a la izquierda, manifiesto a la derecha.
 *
 * El gesto es el de la referencia "animación 1": cada bloque de texto está
 * dentro de un recorte y sube desde debajo, en cascada. El logo entra con el
 * mismo movimiento pero más recorrido, para que pese más.
 *
 * Se dispara una sola vez, cuando la sección entra en pantalla. No hay
 * parallax: el contenido no se mueve con el scroll.
 */
const Manifesto = ({ label, parrafos, signature }: Props) => {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setVisible(true);
            return;
        }

        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.25 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Cada bloque entra un poco después que el anterior.
    const retardo = (i: number) => ({ animationDelay: `${0.15 + i * 0.13}s` });

    return (
        <section
            ref={ref}
            className={`${styles.section} ${visible ? styles.visible : ""}`}
        >
            <div className={styles.inner}>
                <div className={styles.logoCol}>
                    <span className={styles.recorte}>
                        {/* Dos versiones reales del logo en vez de una máscara
                            monocroma: así el punto conserva su rojo de marca.
                            El CSS enseña la que toca según el tema. */}
                        <span className={styles.sube} style={{ animationDelay: "0s" }}>
                            <img
                                src="/logo-micloss-blanco.png"
                                alt="Micloss"
                                className={`${styles.logo} ${styles.logoNoche}`}
                            />
                            <img
                                src="/logo-micloss-tinta.png"
                                alt=""
                                aria-hidden="true"
                                className={`${styles.logo} ${styles.logoDia}`}
                            />
                        </span>
                    </span>
                </div>

                <div className={styles.textoCol}>
                    <span className={styles.recorte}>
                        <span className={`${styles.sube} ${styles.label}`} style={retardo(0)}>
                            {label}
                        </span>
                    </span>

                    {parrafos.map((p, i) => (
                        <span key={i} className={styles.recorte}>
                            <span className={`${styles.sube} ${styles.parrafo}`} style={retardo(i + 1)}>
                                {p}
                            </span>
                        </span>
                    ))}

                    <span className={styles.recorte}>
                        <span
                            className={`${styles.sube} ${styles.firma}`}
                            style={retardo(parrafos.length + 1)}
                        >
                            {signature}
                        </span>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Manifesto;
