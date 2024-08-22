/* eslint-disable react/no-unknown-property */
import {useZustand} from "@/store/useZustand"
import {PageObject} from "@/types"
import {
  TransformControls,
  meshBounds,
  useTexture
} from "@react-three/drei"
import axios from "axios"
import {DoubleSide} from "three"

export const R3fImage = ({ pageObject }: { pageObject: PageObject }) => {
  const { selPageObjectId, setSelPageObjectId, setPageObject, transformMode } =
    useZustand()
  const transformControlsEnabled = pageObject.id === selPageObjectId
  const texture = useTexture(pageObject.url)

  return (
    <TransformControls
      mode={transformMode}
      enabled={transformControlsEnabled}
      showX={transformControlsEnabled}
      showY={transformControlsEnabled}
      showZ={transformControlsEnabled}
      position={[pageObject.px || 0, pageObject.py || 0, pageObject.pz || 0]}
      rotation={[pageObject.rx || 0, pageObject.ry || 0, pageObject.rz || 0]}
      scale={[pageObject.sx || 1, pageObject.sy || 1, pageObject.sz || 1]}
      onMouseUp={(e) => {
        // @ts-expect-error -- TODO
        const object = e?.target.object
        const position = object.position
        const rotation = object.rotation
        const scale = object.scale
        pageObject.px = position.x
        pageObject.py = position.y
        pageObject.pz = position.z
        pageObject.rx = rotation.x
        pageObject.ry = rotation.y
        pageObject.rz = rotation.z
        pageObject.sx = scale.x
        pageObject.sy = scale.y
        pageObject.sz = scale.z
        axios
          .post("/savePageObject", pageObject)
          .then(() => setPageObject(pageObject))
      }}
    >
      <mesh
        raycast={meshBounds}
        onClick={() => {
          if (pageObject.id) {
            setSelPageObjectId(pageObject.id)
          }
        }}
      >
        <planeGeometry args={[8, 5]}/>
        <meshBasicMaterial map={texture} toneMapped={false} side={DoubleSide}/>
      </mesh>
    </TransformControls>
  )
}
