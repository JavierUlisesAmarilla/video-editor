/* eslint-disable react/no-unknown-property */
import {AXES_LENGTH, SHOW_AXES_HELPER} from "@/utils/constants"

export const R3fWorld = () => {
  return <>{SHOW_AXES_HELPER && <axesHelper args={[AXES_LENGTH]}/>}</>
}
