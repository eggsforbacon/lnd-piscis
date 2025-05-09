import type {Metadata} from "next";
import {Tektur} from "next/font/google";
import "./globals.css";
import React from "react";

const tektur = Tektur({
    variable: "--font-tektur",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Piscis",
    description: "Una narrativa interactiva realizada por Samuel Hernández",
};

export default function RootLayout(
    {children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es-CO">
        <body
            className={`${tektur.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
