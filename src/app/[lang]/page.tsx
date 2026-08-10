import styles from "./page.module.css";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import Manifesto from "@/components/Manifesto";
import Hero from "@/components/Hero";

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

            {/* ---------- CARTA DE PRESENTACIÓN + SERVICIOS ---------- */}
            <section className={styles.services}>
                <div className={styles.servicesInner}>
                    <p className={styles.sectionLabel}>{home.services.label}</p>
                    <p className={styles.intent}>{home.services.intent}</p>

                    <div className={styles.serviceList}>
                        {home.services.items.map((s: {
                            num: string; title: string; focus: string; purpose: string; cta: string;
                        }) => (
                            <article key={s.num} className={styles.service}>
                                <span className={styles.serviceNum}>{s.num}</span>
                                <div className={styles.serviceBody}>
                                    <h3 className={styles.serviceTitle}>{s.title}</h3>
                                    <dl className={styles.serviceMeta}>
                                        <dt>{home.services.focus}</dt>
                                        <dd>{s.focus}</dd>
                                        <dt>{home.services.purpose}</dt>
                                        <dd>{s.purpose}</dd>
                                    </dl>
                                </div>
                                <Link href={`/${lang}/budget`} className={styles.serviceCta}>
                                    {s.cta}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

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
