/* eslint-disable react/no-unknown-property */
import {IPageObject} from "@/types"
import {PositionalAudio} from "@react-three/drei"
import {useCustomGltf} from "../../../../hooks/useCustomGltf"
import {R3fTransformControls} from "./R3fTransformControls"

export const R3fAudio = ({ pageObject }: { pageObject: IPageObject }) => {
  const { modelScene } = useCustomGltf("/storage/model/cup_o.glb", true)

  return (
    <R3fTransformControls pageObject={pageObject}>
      {modelScene && (
        <primitive object={modelScene} position={[0, -0.5, 0]} scale={2}>
          <PositionalAudio url={pageObject.url} loop/>
        </primitive>
      )}
    </R3fTransformControls>
  )
}
