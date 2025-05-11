export type Disc = "none" | "oroboros" | "triqueta" | "makora" | "piscis";

export type ChapterName =
    | "tunel"
    | "baño"
    | "agujero negro"
    | "tierno"
    | "noruega"
    | "amalgama"
    | "epitafio"
    | "laguna"
    | "ella"
    | "croquetas"
    | "durmiendo"
    | "océano"
    | "amarillo"
    | "se trata de ella"
    | "dolor"
    | "entendimiento"
    | "muchas vidas" | Disc;

export type Chapter = {
    ending: boolean;
    title?: string;
    name: ChapterName,
    text: string,
    links: string[],
    branches: ChapterName[]
    disc: Disc;
}