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
                    {theme === "dark" ? "☼" : "☾"}
                </button>
            </div>
        </nav>
    );
};

export default Nav;
