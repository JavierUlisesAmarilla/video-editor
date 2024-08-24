import {IPageObject, ITextInfo} from "@/types"
import {R3fHtml} from "./R3fHtml"

export const R3fText = ({ pageObject }: { pageObject: IPageObject }) => {
  const textInfo: ITextInfo = JSON.parse(pageObject.url)

  return (
    <R3fHtml pageObject={pageObject}>
      <div className="">{textInfo.text}</div>
    </R3fHtml>
  )
}
