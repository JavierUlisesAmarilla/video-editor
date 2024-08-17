import {Page} from "@/types"
import {ZustandSlice} from "./useZustand"

export type UISlice = {
  pageArr: Page[];
  setPageArr: (pageArr: Page[]) => void;
};

export const createUISlice: ZustandSlice<UISlice> = (set) => {
  return {
    pageArr: [],
    setPageArr: (pageArr) => set(() => ({ pageArr })),
  }
}
