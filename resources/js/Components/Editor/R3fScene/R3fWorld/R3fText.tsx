import {IPageObject} from "@/types"
import {R3fHtml} from "./R3fHtml"

export const R3fText = ({ pageObject }: { pageObject: IPageObject }) => {
  return (
    <R3fHtml pageObject={pageObject}>
      <div className="">{pageObject.url}</div>
    </R3fHtml>
  )
}
