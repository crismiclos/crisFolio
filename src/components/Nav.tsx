"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";
import { usePathname } from "next/navigation";

const Nav = ({ lang }: { lang: string }) => {
    const pathname = usePathname();
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

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
        en: {
            home: "Home",
            collections: "Collections",
            budget: "Budget",
            contact: "Contact"
        },
        es: {
            home: "Inicio",
            collections: "Colecciones",
            budget: "Presupuesto",
            contact: "Contacto"
        }
    }[lang as "en" | "es"] || {
        home: "Home",
        collections: "Collections",
        budget: "Budget",
        contact: "Contact"
    };

    const links = [
        { name: menu.home, path: `/${lang}` },
        { name: menu.collections, path: `/${lang}/collections` },
        { name: menu.budget, path: `/${lang}/budget` },
        { name: menu.contact, path: `/${lang}/contact` },
    ];

    return (
        <nav className={styles.nav}>
            <Link href={`/${lang}`} className={styles.logo}>
                MICLOSS
            </Link>

            <button
                className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
                onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
                {links.map((link) => (
                    <Link
                        key={link.path}
                        href={link.path}
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Nav;
