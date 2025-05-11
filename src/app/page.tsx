"use client";

import React from "react";
import Link from "next/link";
import Navigation from "@/components/navigation";
import Piscis from "@/components/svg/piscis";
import {usePiscisStore} from "@/store/piscis";
import {Disc} from "@/types";
import Ouroboros from "@/components/svg/ouroboros";
import Triquetra from "@/components/svg/triquetra";
import Makora from "@/components/svg/makora";
import Hypertext from "@/components/Hypertext";

export default function Home() {
    const {current, path, links, text, title} = usePiscisStore();

    const renderBackground = (path: Disc) => {
        switch (path) {
            case "piscis":
                return <Piscis
                    className="fill-desiree-orange-800/80 lg:fill-desiree-orange-900 aspect-square w-128 lg:w-220 h-128 lg:h-220"/>
            case "oroboros":
                return <Ouroboros
                    className="fill-sebastian-purple-800/80 lg:fill-sebastian-purple-900 aspect-square w-128 lg:w-220 h-128 lg:h-220"/>
            case "triqueta":
                return <Triquetra
                    className="fill-eric-yellow-800/80 lg:fill-eric-yellow-900 aspect-square w-128 lg:w-220 h-128 lg:h-220"/>
            case "makora":
                return <Makora
                    className="fill-romel-green-800/80 lg:fill-romel-green-900 aspect-square w-128 lg:w-220 h-128 lg:h-220"/>
        }
    };

    const pickAnimation = (path: Disc) => {
        switch (path) {
            case "oroboros":
                return "animate-ouroboros";
            case "triqueta":
                return "animate-triquetra";
            case "makora":
                return "animate-makora";
            case "piscis":
                return "animate-piscis";
            default:
                return "";
        }
    }

    const sheets: { [key in Disc]: string } = {
        "none": "bg-black/10",
        "piscis": "bg-desiree-orange-500/10 brightness-50",
        "oroboros": "bg-sebastian-purple-500/10 brightness-50",
        "triqueta": "bg-eric-yellow-500/10 brightness-50",
        "makora": "bg-romel-green-500/10 brightness-50",
    };

    const textColor: { [key in Disc]: string } = {
        "none": "text-neutral-400",
        "piscis": "text-desiree-orange-600",
        "oroboros": "text-sebastian-purple-600",
        "triqueta": "text-eric-yellow-600",
        "makora": "text-romel-green-600",
    };

    return (
        <main
            className="overflow-clip font-tektur text-white flex flex-col items-center justify-start lg:justify-center gap-6 px-6 py-4 bg-gradient-to-t from-neutral-950 via-neutral-900 to-neutral-950 min-w-screen min-h-screen relative">
            <span
                className={`absolute top-0 left-0 w-full h-full select-none pointer-events-none backdrop-blur-lg transition-all duration-500 ease-in-out ${sheets[path]}`}/>
            {current === "" ? (
                <div
                    className="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full select-none pointer-events-none">
                    <Piscis
                        className="fill-neutral-800/80 lg:fill-neutral-900 aspect-square w-128 lg:w-220 h-128 lg:h-220"/>
                </div>
            ) : (
                <div
                    className={`absolute ${pickAnimation(path)} flex flex-col items-center justify-center top-0 left-0 w-full h-full select-none pointer-events-none opacity-30`}>
                    {renderBackground(path)}
                </div>
            )}
            {current === "" ? (
                <section
                    className="max-w-144 text-center relative flex flex-col items-stretch justify-center gap-8 lg:gap-16">
                    <div className="flex flex-col gap-4 items-stretch">
                        <h1 className="font-bold text-7xl lg:text-8xl">Piscis</h1>
                        <h2 className="text-3xl lg:text-5xl">Una experiencia narrativa interactiva</h2>
                        <Link href="https://github.com/eggsforbacon" target="_blank">Por Samuel Hernández</Link>
                    </div>
                    <div className="flex flex-col gap-4 items-stretch">
                        <h2 className="text-2xl font-bold">Instrucciones</h2>
                        <p className="text-neutral-400 lg:text-lg">
                            Verás el texto en el centro de la pantalla, y abajo, un botón para volver a la pantalla
                            anterior. Algunas palabras estarán resaltadas en negrita: haz click sobre ellas
                            para navegar la historia. Puedes comenzar eligiendo una de las siguientes.</p>
                        <p className="text-sebastian-purple-500">El <Hypertext
                            inherentPath="oroboros">Oroboros</Hypertext>.<br/>Negado a ver, me como mi propia cola.</p>
                        <p className="text-eric-yellow-500">La <Hypertext
                            inherentPath="triqueta">Triqueta</Hypertext>.<br/>Tan inescapable es el destino como
                            sempiterno.</p>
                        <p className="text-romel-green-500"><Hypertext inherentPath="makora">Makora</Hypertext>.<br/>El
                            balance se mantiene en cuanto transcienda.</p>
                    </div>
                </section>
            ) : (
                <section
                    className="max-w-256 text-justify relative flex flex-col items-stretch h-full justify-between lg:justify-start gap-16">
                    {path === "piscis" && (
                        <h1 className={"relative text-desiree-orange-400 font-bold text-3xl"}>{title}</h1>
                    )}
                    <p className={`lg:text-xl transition-all duration-500 ease-in-out ${textColor[path]}`}>{text.split("$").map((part, index) => {
                        const texts = part.split("\n");
                        return (
                            <React.Fragment key={index}>
                                {texts.map((text, j) => {
                                    return (
                                        <React.Fragment key={j}>
                                            {text}{j < texts.length - 1 && <br/>}
                                        </React.Fragment>
                                    )
                                })}{index < links.length && <Hypertext>{links[index]}</Hypertext>}
                            </React.Fragment>
                        );
                    })
                    }</p>
                    <Navigation/>
                </section>
            )}
        </main>
    );
}
