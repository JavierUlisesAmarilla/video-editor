import {useZustand} from "@/store/useZustand"
import {PageObject} from "@/types"
import {TransformControls} from "@react-three/drei"
import axios from "axios"
import {ReactNode} from "react"

export const R3fTransformControls = ({
  pageObject,
  children,
}: {
  pageObject: PageObject;
  children: ReactNode;
}) => {
  const { selPageObjectId, setSelPageObjectId, setPageObject, transformMode } =
    useZustand()
  const transformControlsEnabled = pageObject.id === selPageObjectId

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
      onClick={() => {
        if (pageObject.id) {
          setSelPageObjectId(pageObject.id)
        }
      }}
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
      <group>{children}</group>
    </TransformControls>
  )
}
