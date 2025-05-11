import {create} from "zustand";
import {Chapter, ChapterName, Disc} from "@/types";
import {chapters} from "@/chapters";

interface PiscisState {
    current: ChapterName | "";
    stack: ChapterName[];
    path: Disc;
    title: string;
    setPath: (path: Disc) => void;
    branches: ChapterName[];
    links: string[];
    text: string;
    setLinks: (links: ChapterName[]) => void;
    goToBranch: (link: string) => Chapter | false;
    goBack: () => void;
    ending: boolean;
    reset: () => void;
}

export const usePiscisStore = create<PiscisState>()((set, getState) => ({
    ending: false,
    current: "",
    stack: [],
    path: "none",
    text: "",
    title: "",
    setPath: (path) => set((_) => ({
        path
    })),
    branches: ["oroboros", "triqueta", "makora"],
    links: ["oroboros", "triqueta", "makora"],
    setLinks: (links: string[]) => set((_) => ({links})),
    goToBranch: (link) => {
        const state = getState();
        let index = -1;
        const confirmedLink = state.links.find((l, i) => {
            index = i;
            return l.toLowerCase().trim() === link;
        })
        if (confirmedLink !== undefined) {
            const branch = state.branches[index];
            const chapter = chapters.find(chapter => chapter.name === branch);
            if (chapter) {
                set((state) => ({
                    ending: chapter.ending,
                    current: branch,
                    path: chapter.disc,
                    title: chapter.title ?? "",
                    branches: chapter.branches,
                    links: chapter.links,
                    text: chapter.text,
                    stack: state.stack.concat([branch]),
                }));
                return chapter;
            } else return false;
        }
        else return false;
    },
    goBack: () => set((state) => {
        const chapter = chapters.find(chapter => chapter.name === state.stack[state.stack.length - 2]);
        if (chapter === undefined) return ({
            end: false,
            current: "",
            title: "",
            path: "none",
            branches: ["oroboros", "triqueta", "makora"],
            links: ["oroboros", "triqueta", "makora"],
            text: "",
            stack: [],
        })
        return ({
            ending: chapter.ending,
            title: chapter.title ?? "",
            current: chapter.name,
            path: chapter.disc,
            branches: chapter.branches,
            links: chapter.links,
            text: chapter.text,
            stack: state.stack.slice(0, -1),
        });
    }),
    reset: () => set((_) => ({
        end: false,
        current: "",
        title: "",
        path: "none",
        branches: ["oroboros", "triqueta", "makora"],
        links: ["oroboros", "triqueta", "makora"],
        text: "",
        stack: [],
    }))
}));