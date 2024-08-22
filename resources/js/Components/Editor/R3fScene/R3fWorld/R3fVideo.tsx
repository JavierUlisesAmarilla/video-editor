/* eslint-disable react/no-unknown-property */
import {PageObject} from "@/types"
import {meshBounds, useVideoTexture} from "@react-three/drei"
import {DoubleSide} from "three"
import {R3fTransformControls} from "./R3fTransformControls"

export const R3fVideo = ({ pageObject }: { pageObject: PageObject }) => {
  const texture = useVideoTexture(pageObject.url, { start: true, loop: true })

  return (
    <R3fTransformControls pageObject={pageObject}>
      <mesh raycast={meshBounds}>
        <planeGeometry args={[8, 5]}/>
        <meshBasicMaterial map={texture} toneMapped={false} side={DoubleSide}/>
      </mesh>
    </R3fTransformControls>
  )
}
