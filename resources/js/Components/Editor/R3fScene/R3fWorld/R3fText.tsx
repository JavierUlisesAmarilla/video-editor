import {IPageObject, ITextInfo} from "@/types"
import {R3fHtml} from "./R3fHtml"

export const R3fText = ({ pageObject }: { pageObject: IPageObject }) => {
  const textInfo: ITextInfo = JSON.parse(pageObject.url)

  return (
    <R3fHtml pageObject={pageObject}>
      <div
        style={{
          color: textInfo.color,
          fontFamily: textInfo.fontFamily,
          fontWeight: textInfo.fontWeight,
          fontSize: textInfo.fontSize,
          lineHeight: textInfo.lineHeight,
          letterSpacing: textInfo.letterSpacing,
          textDecorationThickness: textInfo.textDecorationThickness,
          // @ts-expect-error -- TODO
          textAlign: textInfo.textAlign,
        }}
      >
        {textInfo.text}
      </div>
    </R3fHtml>
  )
}
