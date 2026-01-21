import styles from "./collections.module.css";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";

const collections = [
    { id: "urban-serenity", title: "Urban Serenity", count: 12, image: "#" },
    { id: "natural-echoes", title: "Natural Echoes", count: 8, image: "#" },
    { id: "silent-stories", title: "Silent Stories", count: 15, image: "#" },
    { id: "nocturnal-rhythm", title: "Nocturnal Rhythm", count: 10, image: "#" },
];

export default async function CollectionsPage({ params }: { params: Promise<{ lang: "en" | "es" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{dict.collections.title}</h1>
                <p className={styles.subtitle}>{dict.collections.subtitle}</p>
            </header>

            <div className={styles.grid}>
                {collections.map((col) => (
                    <Link href={`/${lang}/collections/${col.id}`} key={col.id} className={styles.card}>
                        <div className={styles.imagePlaceholder}></div>
                        <div className={styles.cardContent}>
                            <h2 className={styles.cardTitle}>{col.title}</h2>
                            <p className={styles.cardCount}>{col.count} {dict.collections.photographs}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
