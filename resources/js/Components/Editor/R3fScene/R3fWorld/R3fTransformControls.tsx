import {useApi} from "@/hooks/useApi"
import {useZustand} from "@/store/useZustand"
import {IPageObject} from "@/types"
import {TransformControls} from "@react-three/drei"
import {ReactNode} from "react"

export const R3fTransformControls = ({
  pageObject,
  children,
}: {
  pageObject: IPageObject;
  children: ReactNode;
}) => {
  const { selPageObjectId, setSelPageObjectId, transformMode } = useZustand()
  const { updatePageObjectTransform } = useApi()
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
        updatePageObjectTransform(pageObject, object)
      }}
    >
      <group>{children}</group>
    </TransformControls>
  )
}
