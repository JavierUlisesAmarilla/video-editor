import {create, GetState, SetState} from "zustand"
import {CommonSlice, createCommonSlice} from "./createCommonSlice"
import {createKeyboardSlice, KeyboardSlice} from "./createKeyboardSlice"
import {createMouseSlice, MouseSlice} from "./createMouseSlice"
import {createUISlice, UISlice} from "./createUISlice"

export type ZustandState = CommonSlice &
  KeyboardSlice &
  MouseSlice &
  UISlice;

export type ZustandSlice<T> = (
  set: SetState<ZustandState>,
  get: GetState<ZustandState>
) => T;

export const useZustand = create<ZustandState>((set, get) => ({
  ...createCommonSlice(set, get),
  ...createKeyboardSlice(set, get),
  ...createMouseSlice(set, get),
  ...createUISlice(set, get),
}))
