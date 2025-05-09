"use client";

import React, {useState} from "react";
import {usePiscisStore} from "@/store/piscis";
import {Disc} from "@/types";

const Input = () => {
    const {current, goToBranch, goBack, path} = usePiscisStore();

    const [link, setLink] = useState<string>("");
    const [hint, setHint] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
        setHint("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            next();
        }
    };

    const next = () => {
        setHint("");
        if (link !== "") {
            const result = goToBranch(link.toLowerCase().trim());
            if (result === false) {
                setHint("Ese capítulo no existe.");
            } else {
                setLink("");
            }
        } else {
            setHint("No puedes ir a un capítulo sin nombre.");
        }
    }

    const baseButton = "cursor-pointer px-16 py-4 rounded-xl font-bold"

    const nextStyles: { [key in Disc]: string } = {
        "none": "bg-neutral-300 text-neutral-950",
        "piscis": "bg-desiree-orange-300 text-desiree-orange-950",
        "oroboros": "bg-sebastian-purple-300 text-sebastian-purple-950",
        "triqueta": "bg-eric-yellow-500 text-eric-yellow-950",
        "makora": "bg-romel-green-500 text-romel-green-950",
    };

    const backStyles: { [key in Disc]: string } = {
        "none": "border-neutral-300 text-neutral-300",
        "piscis": "border-desiree-orange-300 text-desiree-orange-300",
        "oroboros": "border-sebastian-purple-300 text-sebastian-purple-300",
        "triqueta": "border-eric-yellow-300 text-eric-yellow-300",
        "makora": "border-romel-green-300 text-romel-green-300",
    };

    return (
        <div className="relative flex flex-col gap-2 pb-16">
            <input
                value={link}
                onChange={(e) => handleChange(e)}
                onKeyUp={(e) => handleKeyDown(e)}
                className="w-full focus:outline-0 rounded-xl border-2 border-neutral-600 px-6 py-4 text-white font-bold placeholder-neutral-600"/>
            <p className="text-neutral-600 text-sm">{hint}</p>
            <button
                onClick={() => next()}
                className={`${baseButton} ${nextStyles[path]}`}>
                Pasar página
            </button>
            {current !== "" && (
                <button
                    onClick={() => goBack()}
                    className={`${baseButton} border-2 ${backStyles[path]}`}>
                    Volver
                </button>
            )}
        </div>
    );
}

export default Input;