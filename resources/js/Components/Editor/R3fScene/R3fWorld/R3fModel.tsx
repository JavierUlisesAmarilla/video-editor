/* eslint-disable react/no-unknown-property */
import {useZustand} from "@/store/useZustand"
import {PageObject} from "@/types"
import {TransformControls} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import {useGesture} from "@use-gesture/react"
import axios from "axios"
import {AnimatePresence} from "framer-motion"
import {motion} from "framer-motion-3d"
import {ReactNode, useEffect} from "react"
import {useCustomGltf} from "../../../../hooks/useCustomGltf"
import {AXES_LENGTH} from "../../../../utils/constants"

export const R3fModel = ({
  pageObject,
  children,
  visible = true,
  showModelAnimation = false,
  showAxesHelper = false,
  useCloneGltf = false,
  useMotion = false,
}: {
  pageObject: PageObject;
  children?: ReactNode;
  visible?: boolean;
  showModelAnimation?: boolean;
  showAxesHelper?: boolean;
  useCloneGltf?: boolean;
  useMotion?: boolean;
}) => {
  const { selPageObjectId, setSelPageObjectId, setPageObject, transformMode } =
    useZustand()
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
          mode={transformMode}
          enabled={transformControlsEnabled}
          showX={transformControlsEnabled}
          showY={transformControlsEnabled}
          showZ={transformControlsEnabled}
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
          <group
            position={[
              pageObject.ox || 0,
              pageObject.oy || 0,
              pageObject.oz || 0,
            ]}
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
