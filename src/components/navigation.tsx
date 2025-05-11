"use client";

import React from "react";
import {usePiscisStore} from "@/store/piscis";
import {Disc} from "@/types";

const Navigation = () => {
    const {goBack, path, ending, reset} = usePiscisStore();

    const baseButtonStyles = "cursor-pointer px-16 py-4 rounded-xl";

    const backStyles: { [key in Disc]: string } = {
        "none": "bg-neutral-300 text-neutral-950",
        "piscis": "bg-desiree-orange-300 text-desiree-orange-950",
        "oroboros": "bg-sebastian-purple-300 text-sebastian-purple-950",
        "triqueta": "bg-eric-yellow-500 text-eric-yellow-950",
        "makora": "bg-romel-green-500 text-romel-green-950",
    };

    const resetStyles: { [key in Disc]: string } = {
        "none": "border-neutral-300 text-neutral-300",
        "piscis": "border-desiree-orange-300 text-desiree-orange-300",
        "oroboros": "border-sebastian-purple-300 text-sebastian-purple-300",
        "triqueta": "border-eric-yellow-300 text-eric-yellow-300",
        "makora": "border-romel-green-300 text-romel-green-300",
    };

    return (
        <div className="relative flex flex-col gap-2 pb-16">
            <button
                onClick={() => goBack()}
                className={`${baseButtonStyles} font-bold ${backStyles[path]}`}>
                Volver
            </button>
            {ending && (
                <button
                    className={`${baseButtonStyles} font-bold border ${resetStyles[path]}`}
                    onClick={() => reset()}>
                    Reiniciar
                </button>
            )}
        </div>
    );
}

export default Navigation;