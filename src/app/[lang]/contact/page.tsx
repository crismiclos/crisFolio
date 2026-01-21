import styles from "./contact.module.css";
import { getDictionary } from "@/lib/dictionary";

export default async function ContactPage({ params }: { params: Promise<{ lang: "en" | "es" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{dict.contact.title}</h1>
                <p className={styles.subtitle}>{dict.contact.subtitle}</p>
            </header>

            <div className={styles.content}>
                <div className={styles.contactInfo}>
                    <div className={styles.infoBlock}>
                        <h3>{dict.contact.inquiries}</h3>
                        <p>hello@micloss.com</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <h3>{dict.contact.social}</h3>
                        <div className={styles.socialLinks}>
                            <a href="#">Instagram</a>
                            <a href="#">Twitter/X</a>
                            <a href="#">LinkedIn</a>
                        </div>
                    </div>
                    <div className={styles.infoBlock}>
                        <h3>{dict.contact.location}</h3>
                        <p>{dict.contact.location_text}</p>
                    </div>
                </div>

                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder={dict.contact.form.name} required />
                        <span className={styles.bar}></span>
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="email" placeholder={dict.contact.form.email} required />
                        <span className={styles.bar}></span>
                    </div>
                    <div className={styles.inputGroup}>
                        <textarea rows={5} placeholder={dict.contact.form.message} required></textarea>
                        <span className={styles.bar}></span>
                    </div>
                    <button type="submit" className={styles.submitBtn}>{dict.contact.form.submit}</button>
                </form>
            </div>
        </main>
    );
}
