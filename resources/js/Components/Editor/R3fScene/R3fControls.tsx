import {MIN_POLAR_ANGLE_FACTOR} from "@/utils/constants"
import {OrbitControls} from "@react-three/drei"

export const R3fControls = () => {
  return (
    <OrbitControls
      makeDefault
      maxPolarAngle={(1 - MIN_POLAR_ANGLE_FACTOR) * Math.PI}
      minPolarAngle={MIN_POLAR_ANGLE_FACTOR * Math.PI}
    />
  )
}
