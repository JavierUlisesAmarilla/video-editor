import {ZustandSlice} from "./useZustand"

export interface CommonSlice {
  preventAllEvent: boolean;
  setPreventAllEvent: (preventAllEvent: boolean) => void;
}

export const createCommonSlice: ZustandSlice<CommonSlice> = (set) => {
  return {
    preventAllEvent: false,
    setPreventAllEvent: (preventAllEvent) => set(() => ({ preventAllEvent })),
  }
}
