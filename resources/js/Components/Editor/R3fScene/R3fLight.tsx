/* eslint-disable react/no-unknown-property */
import {LightPoint} from "./R3fUtils"

export const R3fLight = () => {
  return (
    <>
      <ambientLight color={0xf0f0f0} intensity={3}>
        <LightPoint/>
      </ambientLight>
      <spotLight
        position={[0, 200, 200]}
        color={0xffffff}
        intensity={4.5}
        angle={Math.PI * 0.2}
        decay={0}
      >
        <LightPoint/>
      </spotLight>
    </>
  )
}
