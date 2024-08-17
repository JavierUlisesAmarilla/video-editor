import {ZustandSlice} from "./useZustand"

export type SceneSlice = {
  canvasEl: HTMLElement | undefined;
  setCanvasEl: (canvasEl: HTMLElement | undefined) => void;
};

export const createSceneSlice: ZustandSlice<SceneSlice> = (set) => {
  return {
    canvasEl: undefined,
    setCanvasEl: (canvasEl) => set(() => ({ canvasEl })),
  }
}
