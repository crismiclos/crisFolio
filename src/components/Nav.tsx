"use client";

import Link from "next/link";
import styles from "./Nav.module.css";
import { usePathname } from "next/navigation";

const Nav = ({ lang }: { lang: string }) => {
    const pathname = usePathname();

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
            <div className={styles.links}>
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
            </div>
        </nav>
    );
};

export default Nav;
