import { aboutInterface } from "./interfaces";
import { atom } from "jotai"

export const aboutAtom = atom<aboutInterface[]|null|"">(null) 