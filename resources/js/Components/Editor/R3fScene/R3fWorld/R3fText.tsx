import {PageObject} from "@/types"
import {R3fHtml} from "./R3fHtml"

export const R3fText = ({ pageObject }: { pageObject: PageObject }) => {
  return (
    <R3fHtml pageObject={pageObject}>
      <div className="">{pageObject.url}</div>
    </R3fHtml>
  )
}
