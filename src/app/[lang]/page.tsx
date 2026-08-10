import styles from "./page.module.css";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import Manifesto from "@/components/Manifesto";
import Hero from "@/components/Hero";
import ServicesStack from "@/components/ServicesStack";

export default async function Home({ params }: { params: Promise<{ lang: "en" | "es" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const home = dict.home;

    // Clientes reales (Brand Core). Se duplican para que la cinta sea continua.
    const brands = [
        "ALÓ CARACAS",
        "PASTEUR DE VENEZUELA",
        "CONTROL BODY",
        "BANCAMIGA",
        "BEGREAT BARBER STUDIO",
        "MHP SALES MANAGER",
    ];

    return (
        <main className={styles.main}>
            {/* ---------- HERO CON DISEÑO REFERENCIA SUPER 8 ---------- */}
            <Hero title={home.hero.title} subtitle={home.hero.subtitle} />

            {/* ---------- LOGO + MANIFIESTO (revelado en cascada) ---------- */}
            <Manifesto
                label={home.manifesto.label}
                parrafos={home.manifesto.parrafos}
                signature={home.manifesto.signature}
            />

            {/* ---------- SECCIÓN DE SERVICIOS (Sticky Stacking Cards) ---------- */}
            <ServicesStack lang={lang} />

            {/* ---------- MARQUESINA DE CLIENTES (cierre de página) ---------- */}
            <section className={styles.brands} aria-label="Clientes">
                <div className={styles.brandsMarquee}>
                    {brands.concat(brands).map((brand, i) => (
                        <span key={i} className={styles.brandItem} aria-hidden={i >= brands.length}>
                            {brand}
                        </span>
                    ))}
                </div>
            </section>
        </main>
    );
}
