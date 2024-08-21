/* eslint-disable react/no-unknown-property */
import {LIGHT_RADIUS} from "@/utils/constants"
import {meshBounds} from "@react-three/drei"

export const LightPoint = () => {
  return (
    <mesh raycast={meshBounds}>
      <sphereGeometry args={[LIGHT_RADIUS]}/>
      <meshStandardMaterial color="red"/>
    </mesh>
  )
}
