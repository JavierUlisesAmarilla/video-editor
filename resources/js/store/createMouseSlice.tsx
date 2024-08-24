import {ZustandSlice} from "./useZustand"

export interface MouseSlice {
  isLeftMouse: boolean;
  setIsLeftMouse: (isLeftMouse: boolean) => void;

  isMiddleMouse: boolean;
  setIsMiddleMouse: (isMiddleMouse: boolean) => void;

  isRightMouse: boolean;
  setIsRightMouse: (isRightMouse: boolean) => void;
}

export const createMouseSlice: ZustandSlice<MouseSlice> = (set) => {
  return {
    isLeftMouse: false,
    setIsLeftMouse: (isLeftMouse) => set(() => ({ isLeftMouse })),

    isMiddleMouse: false,
    setIsMiddleMouse: (isMiddleMouse) => set(() => ({ isMiddleMouse })),

    isRightMouse: false,
    setIsRightMouse: (isRightMouse) => set(() => ({ isRightMouse })),
  }
}
