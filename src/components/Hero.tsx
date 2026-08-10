import styles from "./Hero.module.css";

interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className={styles.hero}>
      {/* Barra superior estilo Super 8 */}
      <div className={styles.topBar}>
        <span>©2026</span>
      </div>

      {/* Contenido Central: Titular + Foto de perfil + Subtítulo.
          Cada línea es una máscara: el texto sube desde debajo del recorte. */}
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>
            <span className={styles.titleInner} style={{ animationDelay: "0.05s" }}>
              MENOS RUIDO
            </span>
          </span>
          <span className={styles.titleLine}>
            <span className={styles.titleInner} style={{ animationDelay: "0.22s" }}>
              <span>MÁS</span>

              {/* Foto de perfil recortada en pantalla de TV */}
              <span className={styles.photoMask} aria-hidden="true" />

              <span>VISIÓN</span>
            </span>
          </span>
        </h1>

        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {/* Barra Inferior */}
      <footer className={styles.bottomBar}>
        DIRECCIÓN CREATIVA · FOTOGRAFÍA COMERCIAL · PRODUCCIÓN DE VIDEO
      </footer>
    </section>
  );
}
