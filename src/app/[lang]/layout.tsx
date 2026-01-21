import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
        <html lang={lang} className={`${inter.variable} ${outfit.variable}`}>
            <body>
                <div className="noise" />
                <Nav lang={lang} />
                {children}
            </body>
        </html>
    );
}
