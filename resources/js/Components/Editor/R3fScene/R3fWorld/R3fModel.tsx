/* eslint-disable react/no-unknown-property */
import {useZustand} from "@/store/useZustand"
import {PageObject} from "@/types"
import {TransformControls} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import {useGesture} from "@use-gesture/react"
import {AnimatePresence} from "framer-motion"
import {motion} from "framer-motion-3d"
import {ReactNode, useEffect} from "react"
import {useCustomGltf} from "../../../../hooks/useCustomGltf"
import {AXES_LENGTH} from "../../../../utils/constants"

export type R3fModelType = {
  pageObject: PageObject;
  children?: ReactNode;
  visible?: boolean;
  showModelAnimation?: boolean;
  showAxesHelper?: boolean;
  useCloneGltf?: boolean;
  useMotion?: boolean;
};

export const R3fModel = ({
  pageObject,
  children,
  visible = true,
  showModelAnimation = true,
  showAxesHelper = false,
  useCloneGltf = false,
  useMotion = false,
}: R3fModelType) => {
  const { selPageObjectId, setSelPageObjectId } = useZustand()
  const { modelScene, mixer, actions } = useCustomGltf(
    pageObject.url,
    useCloneGltf
  )
  const transformControlsEnabled = pageObject.id === selPageObjectId

  const bind = useGesture({
    onClick: () => {
      if (pageObject.id) {
        setSelPageObjectId(pageObject.id)
      }
    },
  })

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
    <AnimatePresence>
      {modelScene && (
        <TransformControls
          mode="translate"
          enabled={transformControlsEnabled}
          showX={transformControlsEnabled}
          showY={transformControlsEnabled}
          showZ={transformControlsEnabled}
        >
          <group
            position={[
              pageObject.px || 0,
              pageObject.py || 0,
              pageObject.pz || 0,
            ]}
            rotation={[
              pageObject.rx || 0,
              pageObject.ry || 0,
              pageObject.rz || 0,
            ]}
            scale={[pageObject.sx || 1, pageObject.sy || 1, pageObject.sz || 1]}
            visible={visible}
          >
            <motion.primitive
              object={modelScene}
              initial={{
                scale: useMotion ? 0 : 1,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: useMotion ? 0 : 1,
              }}
              {...bind()}
            />
            {children}
            {showAxesHelper && <axesHelper args={[AXES_LENGTH]}/>}
          </group>
        </TransformControls>
      )}
    </AnimatePresence>
  )
}
