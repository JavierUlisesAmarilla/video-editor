import {Page} from "@/types"
import {ZustandSlice} from "./useZustand"

export type UISlice = {
  pageArr: Page[];
  setPageArr: (pageArr: Page[]) => void;
  addPage: (page: Page) => void;
};

export const createUISlice: ZustandSlice<UISlice> = (set, get) => {
  return {
    pageArr: [],
    setPageArr: (pageArr) => set(() => ({ pageArr })),
    addPage: (page) => set(() => ({ pageArr: [...get().pageArr, page] })),
  }
}
