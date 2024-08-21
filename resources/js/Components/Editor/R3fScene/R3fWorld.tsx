/* eslint-disable react/no-unknown-property */
import {AXES_LENGTH, SHOW_AXES_HELPER} from "@/utils/constants"
import {useThree} from "@react-three/fiber"
import {useEffect} from "react"
import {Color} from "three"

export const R3fWorld = () => {
  const { scene } = useThree()

  useEffect(() => {
    scene.background = new Color("yellow")
  }, [])

  return <>{SHOW_AXES_HELPER && <axesHelper args={[AXES_LENGTH]}/>}</>
}
