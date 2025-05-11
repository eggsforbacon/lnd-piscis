"use client";

import React from "react";
import {usePiscisStore} from "@/store/piscis";
import {Disc} from "@/types";

const Input = () => {
    const {goBack, path} = usePiscisStore();

    const backStyles: { [key in Disc]: string } = {
        "none": "bg-neutral-300 text-neutral-950",
        "piscis": "bg-desiree-orange-300 text-desiree-orange-950",
        "oroboros": "bg-sebastian-purple-300 text-sebastian-purple-950",
        "triqueta": "bg-eric-yellow-500 text-eric-yellow-950",
        "makora": "bg-romel-green-500 text-romel-green-950",
    };

    return (
        <div className="relative flex flex-col gap-2 pb-16">
            <button
                onClick={() => goBack()}
                className={`cursor-pointer px-16 py-4 rounded-xl font-bold ${backStyles[path]}`}>
                Volver
            </button>
        </div>
    );
}

export default Input;