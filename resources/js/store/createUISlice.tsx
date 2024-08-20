import {Page} from "@/types"
import {ZustandSlice} from "./useZustand"

export type UISlice = {
  pageArr: Page[];
  setPageArr: (pageArr: Page[]) => void;
  addPage: (page: Page) => void;
  selPageId: number;
  setSelPageId: (selPageId: number) => void;
  removePage: (pageId: number) => void;

  selAssetId: string;
  setSelAssetId: (selAssetId: string) => void;
};

export const createUISlice: ZustandSlice<UISlice> = (set, get) => {
  return {
    pageArr: [],
    setPageArr: (pageArr) => set(() => ({ pageArr })),
    addPage: (page) => set(() => ({ pageArr: [...get().pageArr, page] })),
    selPageId: 0,
    setSelPageId: (selPageId) => set(() => ({ selPageId })),
    removePage: (pageId) =>
      set(() => ({ pageArr: get().pageArr.filter((v) => v.id !== pageId) })),

    selAssetId: "text",
    setSelAssetId: (selAssetId) => set(() => ({ selAssetId })),
  }
}
