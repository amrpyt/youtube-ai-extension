import { atomWithPlasmoStorage } from "./atom-with-plasmo-storage"

export const geminiKeyAtom = atomWithPlasmoStorage<string | null>("geminiKey", null)
