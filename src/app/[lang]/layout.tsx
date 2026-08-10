import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "../globals.css";
import Nav from "@/components/Nav";

// Sistema de dos voces, no dos fuentes sueltas:
//  - Inter: toda la lectura (cabezales de página, cuerpo, interfaz).
//  - Anton: solo el titular del hero. Gótica condensada de cartel, que es
//    lo que da el carácter de la referencia Super 8.
// Outfit se retiró: competía con Inter en el mismo rol y producía cuatro
// tratamientos distintos de titular.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });

export const metadata: Metadata = {
    title: "Micloss | Photographer Portfolio",
    description: "A premium photography portfolio by Micloss showcasing unique moments.",
};

export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "es" }];
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <html lang={lang} className={`${inter.variable} ${anton.variable}`}>
            <body>
                <div className="noise" />
                <Nav lang={lang} />
                {children}
            </body>
        </html>
    );
}
