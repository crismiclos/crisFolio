"use client";

import { useEffect, useCallback } from "react";
import styles from "./Lightbox.module.css";

interface Image {
    id: number;
    type: "horizontal" | "vertical";
}

interface LightboxProps {
    images: Image[];
    currentIndex: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
    const image = images[currentIndex];

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft") onPrev();
        if (e.key === "ArrowRight") onNext();
    }, [onClose, onPrev, onNext]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [handleKeyDown]);

    if (!image) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <button className={styles.closeBtn} onClick={onClose}>&times;</button>

            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <button className={styles.navBtn} onClick={onPrev}>&#8592;</button>

                <div className={`${styles.imageContainer} ${styles[image.type]}`}>
                    <div className={styles.imagePlaceholder}></div>
                    <div className={styles.meta}>
                        <span>{currentIndex + 1} / {images.length}</span>
                        <h3>MICLOSS / {image.type.toUpperCase()}</h3>
                    </div>
                </div>

                <button className={styles.navBtn} onClick={onNext}>&#8594;</button>
            </div>

            <div className={styles.thumbnails}>
                {images.map((img, idx) => (
                    <div
                        key={img.id}
                        className={`${styles.thumb} ${idx === currentIndex ? styles.active : ""}`}
                        onClick={(e) => { e.stopPropagation(); /* Logic to go to index could go here if prop was added */ }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
