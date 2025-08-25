import { aboutInterFace, userFrontendSourceInterface } from "./interfaces";
import { atom } from "jotai"

export const aboutAtom = atom<aboutInterFace[]|null|"">(null) 
export const userAtom = atom<userFrontendSourceInterface|null|undefined>()
export const navOpenAtom = atom<boolean>(false)