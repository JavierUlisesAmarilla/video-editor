import {IPageObject} from "@/types"
import {R3fHtml} from "./R3fHtml"

export const R3fGif = ({ pageObject }: { pageObject: IPageObject }) => {
  return (
    <R3fHtml pageObject={pageObject}>
      <img src={pageObject.url}/>
    </R3fHtml>
  )
}
