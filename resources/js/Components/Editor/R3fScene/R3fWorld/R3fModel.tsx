/* eslint-disable react/no-unknown-property */
import {TransformControls} from "@react-three/drei"
import {Euler, Vector3, useFrame} from "@react-three/fiber"
import {useGesture} from "@use-gesture/react"
import {AnimatePresence} from "framer-motion"
import {motion} from "framer-motion-3d"
import {ReactNode, useEffect} from "react"
import {useCustomGltf} from "../../../../hooks/useCustomGltf"
import {AXES_LENGTH} from "../../../../utils/constants"

export type R3fModelType = {
  modelPath: string;
  children?: ReactNode;
  position?: Vector3;
  rotation?: Euler;
  scale?: Vector3;
  visible?: boolean;
  showModelAnimation?: boolean;
  showAxesHelper?: boolean;
  useCloneGltf?: boolean;
  useMotion?: boolean;
};

export const R3fModel = ({
  modelPath,
  children,
  position,
  rotation,
  scale,
  visible = true,
  showModelAnimation = true,
  showAxesHelper = false,
  useCloneGltf = false,
  useMotion = false,
}: R3fModelType) => {
  const { modelScene, mixer, actions } = useCustomGltf(modelPath, useCloneGltf)

  const bind = useGesture({
    onClick: () => {
      console.log("test: onClick")
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
          enabled={false}
          showX={false}
          showY={false}
          showZ={false}
        >
          <group
            position={position || [0, 0, 0]}
            rotation={rotation || [0, 0, 0]}
            scale={scale || 1}
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
