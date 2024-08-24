/* eslint-disable react/no-unknown-property */
import {IPageObject} from "@/types"
import {useFrame} from "@react-three/fiber"
import {ReactNode, useEffect} from "react"
import {useCustomGltf} from "../../../../hooks/useCustomGltf"
import {AXES_LENGTH} from "../../../../utils/constants"
import {R3fTransformControls} from "./R3fTransformControls"

export const R3fModel = ({
  pageObject,
  children,
  showModelAnimation = false,
  showAxesHelper = false,
  useCloneGltf = false,
}: {
  pageObject: IPageObject;
  children?: ReactNode;
  showModelAnimation?: boolean;
  showAxesHelper?: boolean;
  useCloneGltf?: boolean;
}) => {
  const { modelScene, mixer, actions } = useCustomGltf(
    pageObject.url,
    useCloneGltf
  )

  useEffect(() => {
    if (actions && showModelAnimation) {
      Object.values(actions).forEach((action) => {
        action.play()
      })
    }
  }, [actions, showModelAnimation])

  useFrame((_state, delta) => {
    if (mixer) {
      mixer.update(delta)
    }
  })

  return (
    <R3fTransformControls pageObject={pageObject}>
      <group
        position={[pageObject.ox || 0, pageObject.oy || 0, pageObject.oz || 0]}
      >
        {modelScene && <primitive object={modelScene}/>}
        {children}
        {showAxesHelper && <axesHelper args={[AXES_LENGTH]}/>}
      </group>
    </R3fTransformControls>
  )
}
