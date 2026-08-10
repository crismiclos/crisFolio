"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";
import { usePathname } from "next/navigation";

const Nav = ({ lang }: { lang: string }) => {
    const pathname = usePathname();
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [menuOpen, setMenuOpen] = useState(false);
    // Al primer scroll el header se recoge y se queda centrado.
    const [recogido, setRecogido] = useState(false);

    // Píldora de vidrio que se desliza entre las opciones. Se mide sobre el
    // DOM porque los anchos dependen del texto (cambia entre es/en) y de la
    // tipografía ya cargada.
    const linksRef = React.useRef<HTMLDivElement>(null);
    const itemRefs = React.useRef<Array<HTMLAnchorElement | null>>([]);
    const [hovered, setHovered] = useState<number | null>(null);
    const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        // Umbral bajo: basta con separarse del tope para que se recoja.
        const alScroll = () => setRecogido(window.scrollY > 8);
        alScroll();
        window.addEventListener("scroll", alScroll, { passive: true });
        return () => window.removeEventListener("scroll", alScroll);
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const menu = {
        en: { home: "Home", collections: "Work", budget: "Budget", contact: "Contact" },
        es: { home: "Inicio", collections: "Trabajos", budget: "Presupuesto", contact: "Contacto" },
    }[lang as "en" | "es"] || {
        home: "Home", collections: "Work", budget: "Budget", contact: "Contact",
    };

    const links = [
        { name: menu.home, path: `/${lang}` },
        { name: menu.collections, path: `/${lang}/collections` },
        { name: menu.budget, path: `/${lang}/budget` },
        { name: menu.contact, path: `/${lang}/contact` },
    ];

    // Todas las opciones pesan igual: la píldora las recorre todas, Contacto
    // incluido. Ninguna lleva fondo sólido propio.
    const activeIndex = links.findIndex((l) => l.path === pathname);

    useEffect(() => {
        const target = hovered ?? (activeIndex >= 0 ? activeIndex : null);

        const medir = () => {
            // En móvil el menú es una columna a pantalla completa: sin píldora.
            if (window.innerWidth <= 1024 || target === null) {
                setPill((p) => ({ ...p, visible: false }));
                return;
            }
            const el = itemRefs.current[target];
            const cont = linksRef.current;
            if (!el || !cont) return;
            const a = el.getBoundingClientRect();
            const b = cont.getBoundingClientRect();
            setPill({ left: a.left - b.left, width: a.width, visible: true });
        };

        medir();
        document.fonts?.ready.then(medir).catch(() => {});
        window.addEventListener("resize", medir);
        return () => window.removeEventListener("resize", medir);
    }, [hovered, activeIndex, pathname, lang, recogido]);

    return (
        <nav className={`${styles.nav} ${recogido ? styles.recogido : ""}`}>
            <Link href={`/${lang}`} className={styles.logo}>
                MICLOS
            </Link>

            <button
                className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
                onClick={toggleMenu}
                aria-label="Toggle Menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`${styles.links} ${menuOpen ? styles.open : ""}`} ref={linksRef}>
                <span
                    className={styles.pill}
                    aria-hidden="true"
                    style={{
                        left: `${pill.left}px`,
                        width: `${pill.width}px`,
                        opacity: pill.visible ? 1 : 0,
                    }}
                />
                {links.map((link, i) => (
                    <Link
                        key={link.path}
                        href={link.path}
                        ref={(el) => { itemRefs.current[i] = el; }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        className={`${styles.link} ${pathname === link.path ? styles.active : ""}`}
                    >
                        {link.name}
                    </Link>
                ))}
                <div className={styles.langSwitcher}>
                    <Link href={pathname.replace(`/${lang}`, "/en")} className={lang === "en" ? styles.activeLang : ""}>EN</Link>
                    <span>/</span>
                    <Link href={pathname.replace(`/${lang}`, "/es")} className={lang === "es" ? styles.activeLang : ""}>ES</Link>
                </div>
                <button
                    onClick={toggleTheme}
                    className={styles.themeToggle}
                    aria-label="Toggle Theme"
                >
                    {theme === "dark" ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Nav;
