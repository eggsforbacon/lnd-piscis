"use client";

import {ReactNode} from "react";
import {Disc} from "@/types";
import {usePiscisStore} from "@/store/piscis";

type _Props = {
    children: ReactNode | string;
    inherentPath?: Disc;
}

const Hypertext = ({children, inherentPath}: _Props) => {
    const {path, goToBranch} = usePiscisStore();

    const linkColor: { [key in Disc]: string } = {
        "none": "text-white",
        "piscis": "text-desiree-orange-400",
        "oroboros": "text-sebastian-purple-400",
        "triqueta": "text-eric-yellow-400",
        "makora": "text-romel-green-400",
    };

    const decorations: { [key in Disc]: string } = {
        "none": "decoration-white",
        "piscis": "hover:decoration-desiree-orange-400",
        "oroboros": "hover:decoration-sebastian-purple-400",
        "triqueta": "hover:decoration-eric-yellow-400",
        "makora": "hover:decoration-romel-green-400",
    };

    const handleClick = () => {
        const value = children as string;
        goToBranch(value.toLowerCase().trim());
    }

    return (
        <button onClick={() => handleClick()}
                className={`${inherentPath ? "" : "lg:text-xl"} font-bold underline decoration-transparent underline-offset-4 decoration-2 transition-all duration-200 ease-in-out ${decorations[inherentPath ?? path]} ${linkColor[inherentPath ?? path]}`}>{children}</button>
    );
}

export default Hypertext;