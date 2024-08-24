import {IAnimationActionMap} from "@/types"
import {useEffect, useState} from "react"
import {AnimationMixer} from "three"
import {GLTF} from "three-stdlib"

export const useEachGltfActions = (
  mixer: AnimationMixer | undefined,
  animGltf: GLTF | undefined
) => {
  const [actions, setActions] = useState<IAnimationActionMap>()

  useEffect(() => {
    if (!mixer || !animGltf) {
      return
    }
    const newActions: IAnimationActionMap = {}
    animGltf.animations.forEach((animation) => {
      newActions[animation.name] = mixer.clipAction(animation)
    })
    setActions(newActions)
  }, [animGltf, mixer])

  return actions
}
