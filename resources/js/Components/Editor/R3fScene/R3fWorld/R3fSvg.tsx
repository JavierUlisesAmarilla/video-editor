import {IPageObject} from "@/types"
import {Svg} from "@react-three/drei"
import {R3fTransformControls} from "./R3fTransformControls"

export const R3fSvg = ({ pageObject }: { pageObject: IPageObject }) => {
  return (
    <R3fTransformControls pageObject={pageObject}>
      <Svg src={pageObject.url} scale={0.2}/>
    </R3fTransformControls>
  )
}
