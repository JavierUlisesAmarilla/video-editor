/* eslint-disable react/no-unknown-property */
import {useZustand} from "@/store/useZustand"
import {AXES_LENGTH, SHOW_AXES_HELPER, loaders} from "@/utils/constants"
import {useThree} from "@react-three/fiber"
import {useEffect} from "react"
import {Color} from "three"

const bgColor = new Color()

export const R3fWorld = () => {
  const { pageArr, selPageId } = useZustand()
  const { scene } = useThree()

  useEffect(() => {
    const selPage = pageArr.find((v) => v.id === selPageId)

    if (selPage?.background) {
      if (selPage.background.substring(0, 1) === "#") {
        bgColor.set(selPage.background)
        scene.background = bgColor
      } else {
        loaders.loadAsset("texture", selPage.background).then((v) => {
          scene.background = v
        })
      }
    } else {
      scene.background = null
    }
  }, [pageArr, selPageId])

  return <>{SHOW_AXES_HELPER && <axesHelper args={[AXES_LENGTH]}/>}</>
}
