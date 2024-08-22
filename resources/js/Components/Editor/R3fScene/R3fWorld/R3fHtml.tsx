import {useZustand} from "@/store/useZustand"
import {PageObject} from "@/types"
import {Html} from "@react-three/drei"
import {ReactNode} from "react"
import {R3fTransformControls} from "./R3fTransformControls"

export const R3fHtml = ({
  pageObject,
  children,
}: {
  pageObject: PageObject;
  children: ReactNode;
}) => {
  const { setSelPageObjectId } = useZustand()

  return (
    <R3fTransformControls pageObject={pageObject}>
      <Html className="relative" transform>
        <div
          className="relative"
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
