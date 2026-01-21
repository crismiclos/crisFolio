import styles from "./budget.module.css";
import { getDictionary } from "@/lib/dictionary";

export default async function BudgetPage({ params }: { params: Promise<{ lang: "en" | "es" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>{dict.budget.title}</h1>
                <p className={styles.subtitle}>{dict.budget.subtitle}</p>

                <form className={styles.form}>
                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>{dict.budget.form.name}</label>
                            <input type="text" placeholder={lang === "es" ? "Tu nombre" : "Your name"} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>{dict.budget.form.email}</label>
                            <input type="email" placeholder="hello@micloss.com" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>{dict.budget.form.session}</label>
                            <select>
                                <option>{lang === "es" ? "Retrato" : "Portrait"}</option>
                                <option>{lang === "es" ? "Editorial" : "Editorial"}</option>
                                <option>{lang === "es" ? "Evento" : "Event"}</option>
                                <option>{lang === "es" ? "Comercial" : "Commercial"}</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>{dict.budget.form.location}</label>
                            <input type="text" placeholder={lang === "es" ? "Ciudad, País" : "City, Country"} />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>{dict.budget.form.details}</label>
                        <textarea rows={5} placeholder={lang === "es" ? "Cuéntame tu visión..." : "Tell me your vision..."}></textarea>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        {dict.budget.form.submit}
                    </button>
                </form>
            </div>
        </main>
    );
}
