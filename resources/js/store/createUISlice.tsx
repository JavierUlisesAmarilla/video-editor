import {IPage, IPageObject} from "@/types"
import {ZustandSlice} from "./useZustand"

export interface UISlice {
  pageArr: IPage[];
  setPageArr: (pageArr: IPage[]) => void;
  addPage: (page: IPage) => void;
  selPageId: number;
  setSelPageId: (selPageId: number) => void;
  setSelPage: (page: IPage) => void;
  removePage: (pageId: number) => void;

  pageObjectArr: IPageObject[];
  setPageObjectArr: (pageObjectArr: IPageObject[]) => void;
  setPageObject: (pageObject: IPageObject) => void;
  selPageObjectId: number;
  setSelPageObjectId: (selPageObjectId: number) => void;
  removePageObject: (pageObjectId: number) => void;

  selAssetId: string;
  setSelAssetId: (selAssetId: string) => void;

  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;

  transformMode: "translate" | "rotate" | "scale" | undefined;
  setTransformMode: (transformMode: "translate" | "rotate" | "scale") => void;
}

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
            v = { ...v, ...page }
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
        const idx = arr.findIndex((v) => v.id === pageObject.id)
        if (idx > -1) {
          arr[idx] = { ...arr[idx], ...pageObject }
        } else {
          arr.push(pageObject)
        }
        return { pageObjectArr: arr }
      }),
    selPageObjectId: 0,
    setSelPageObjectId: (selPageObjectId) => set(() => ({ selPageObjectId })),
    removePageObject: (pageObjectId) =>
      set(() => ({
        pageObjectArr: get().pageObjectArr.filter((v) => v.id !== pageObjectId),
      })),

    selAssetId: "background",
    setSelAssetId: (selAssetId) => set(() => ({ selAssetId })),

    isSaving: false,
    setIsSaving: (isSaving) => set(() => ({ isSaving })),

    transformMode: "translate",
    setTransformMode: (transformMode) => set(() => ({ transformMode })),
  }
}
