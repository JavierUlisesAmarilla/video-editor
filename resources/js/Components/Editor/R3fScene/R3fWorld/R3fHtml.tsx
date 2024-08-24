import {useZustand} from "@/store/useZustand"
import {IPageObject} from "@/types"
import {Html} from "@react-three/drei"
import {ReactNode} from "react"
import {R3fTransformControls} from "./R3fTransformControls"

export const R3fHtml = ({
  pageObject,
  children,
}: {
  pageObject: IPageObject;
  children: ReactNode;
}) => {
  const { setSelPageObjectId } = useZustand()

  return (
    <R3fTransformControls pageObject={pageObject}>
      <Html
        className="relative"
        transform
        zIndexRange={[9, 0]}
        occlude="blending"
      >
        <div
          className="relative text-8xl p-8"
          onClick={() => {
            if (pageObject.id) {
              setSelPageObjectId(pageObject.id)
            }
          }}
        >
          {children}
        </div>
      </Html>
    </R3fTransformControls>
  )
}
