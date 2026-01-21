import styles from "./page.module.css";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";

export default async function Home({ params }: { params: Promise<{ lang: "en" | "es" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const brands = ["Vogue", "Nike", "Apple", "National Geographic", "Sony", "BMW", "Zara", "Vogue", "Nike", "Apple", "National Geographic", "Sony", "BMW", "Zara"];

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>
                        <span className={styles.titleLine}>{dict.home.hero.capturing}</span>
                        <span className={styles.titleLine + " " + styles.indent}>{dict.home.hero.unseen}</span>
                    </h1>
                    <p className={styles.subtitle}>
                        {dict.home.hero.subtitle}
                    </p>
                </div>
                <div className={styles.heroImage}>
                    <div className={styles.imageBox}></div>
                </div>
            </section>

            <section className={styles.brands}>
                <div className={styles.brandsMarquee}>
                    {brands.concat(brands).map((brand, i) => (
                        <span key={i} className={styles.brandItem}>{brand}</span>
                    ))}
                </div>
            </section>

            <section className={styles.manifesto}>
                <h2 className={styles.sectionTitle}>{dict.home.manifesto.title}</h2>
                <p className={styles.manifestoText}>
                    {dict.home.manifesto.text}
                </p>
            </section>

            <section className={styles.featured}>
                <h2 className={styles.sectionTitle}>{dict.home.featured.title}</h2>
                <div className={styles.featuredGrid}>
                    <Link href={`/${lang}/collections/urban-serenity`} className={styles.featuredItem}>
                        <div className={styles.featuredImageWrapper}>
                            <div className={styles.featuredImage}></div>
                        </div>
                        <div className={styles.featuredMeta}>
                            <h3>Urban Serenity</h3>
                            <span className={styles.viewWork}>{dict.home.featured.view_all}</span>
                        </div>
                    </Link>
                    <Link href={`/${lang}/collections/silent-stories`} className={styles.featuredItem}>
                        <div className={styles.featuredImageWrapper}>
                            <div className={styles.featuredImage}></div>
                        </div>
                        <div className={styles.featuredMeta}>
                            <h3>Silent Stories</h3>
                            <span className={styles.viewWork}>{dict.home.featured.view_all}</span>
                        </div>
                    </Link>
                </div>
            </section>

            <section className={styles.recognition}>
                <h2 className={styles.sectionTitle}>{dict.home.recognition.title}</h2>
                <div className={styles.awardsList}>
                    <div className={styles.award}>
                        <span className={styles.year}>2025</span>
                        <span className={styles.name}>IPA - International Photography Awards</span>
                        <span className={styles.place}>1st Place, Street Photography</span>
                    </div>
                    <div className={styles.award}>
                        <span className={styles.year}>2024</span>
                        <span className={styles.name}>Sony World Photography Awards</span>
                        <span className={styles.place}>Finalist, Architecture</span>
                    </div>
                    <div className={styles.award}>
                        <span className={styles.year}>2023</span>
                        <span className={styles.name}>Leica Oskar Barnack Award</span>
                        <span className={styles.place}>Nominee</span>
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <h2 className={styles.ctaTitle}>{dict.home.cta.title}</h2>
                <Link href={`/${lang}/budget`} className={styles.ctaButton}>
                    {dict.home.cta.button}
                </Link>
            </section>
        </main>
    );
}
