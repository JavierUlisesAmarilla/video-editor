import {Page, PageObject} from "@/types"
import {ZustandSlice} from "./useZustand"

export type UISlice = {
  pageArr: Page[];
  setPageArr: (pageArr: Page[]) => void;
  addPage: (page: Page) => void;
  selPageId: number;
  setSelPageId: (selPageId: number) => void;
  setSelPage: (page: Page) => void;
  removePage: (pageId: number) => void;

  pageObjectArr: PageObject[];
  setPageObjectArr: (pageObjectArr: PageObject[]) => void;
  setPageObject: (pageObject: PageObject) => void;
  selPageObjectId: number;
  setSelPageObjectId: (selPageObjectId: number) => void;

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
    setSelPage: (page) =>
      set(() => ({
        pageArr: get().pageArr.map((v) => {
          if (v.id === get().selPageId) {
            if (page.background) {
              v.background = page.background
            }
          }
          return v
        }),
      })),
    removePage: (pageId) =>
      set(() => ({ pageArr: get().pageArr.filter((v) => v.id !== pageId) })),

    pageObjectArr: [],
    setPageObjectArr: (pageObjectArr) => set(() => ({ pageObjectArr })),
    setPageObject: (pageObject) =>
      set(() => {
        const arr = get().pageObjectArr
        const obj = arr.find((v) => v.id === pageObject.id)

        if (obj) {
          if (pageObject.page_id) {
            obj.page_id = pageObject.page_id
          }
        } else {
          arr.push(pageObject)
        }

        return { pageObjectArr: arr }
      }),
    selPageObjectId: 0,
    setSelPageObjectId: (selPageObjectId) => set(() => ({ selPageObjectId })),

    selAssetId: "background",
    setSelAssetId: (selAssetId) => set(() => ({ selAssetId })),
  }
}
