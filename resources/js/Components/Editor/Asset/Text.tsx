import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import {useZustand} from "@/store/useZustand"
import {IPageObject, ITextInfo} from "@/types"
import axios from "axios"
import classNames from "classnames"
import {ReactNode, useState} from "react"
import {HexColorPicker} from "react-colorful"
import {
  BsTextCenter,
  BsTextLeft,
  BsTextParagraph,
  BsTextRight,
} from "react-icons/bs"
import Select from "react-select"
import {toast} from "react-toast"

const addTextInfoToStringify = (
  textInfo: ITextInfo,
  stringify: string
): string => {
  const parse: ITextInfo = { ...JSON.parse(stringify), ...textInfo }
  stringify = JSON.stringify(parse)
  return stringify
}

const textAligns: { [key: string]: ReactNode } = {
  left: <BsTextLeft/>,
  center: <BsTextCenter/>,
  right: <BsTextRight/>,
  justify: <BsTextParagraph/>,
}

const fontFamilyOptionArr = [
  {
    value: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
    label: "Sans",
  },
  {
    value: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`,
    label: "Serif",
  },
  {
    value: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
    label: "Mono",
  },
]

const fontWeightOptionArr = [
  { value: 100, label: "Thin" },
  { value: 200, label: "Extra Light" },
  { value: 300, label: "Light" },
  { value: 400, label: "Normal" },
  { value: 500, label: "Medium" },
  { value: 600, label: "Semi Bold" },
  { value: 700, label: "Bold" },
  { value: 800, label: "Extra Bold" },
  { value: 900, label: "Black" },
]

export const Text = () => {
  const {
    selPageObjectId,
    setSelPageObjectId,
    pageObjectArr,
    setPageObject,
    selPageId,
    isSaving,
    setIsSaving,
  } = useZustand()
  const selPageObject = pageObjectArr.find((v) => v.id === selPageObjectId)
  const textInfo: ITextInfo =
    selPageObject?.type === "text" ? JSON.parse(selPageObject.url || "{}") : {}
  const text = textInfo.text || ""
  const color = textInfo.color || "#000000"
  const fontFamily = textInfo.fontFamily || ""
  const fontWeight = textInfo.fontWeight || ""
  const fontSize = textInfo.fontSize || ""
  const lineHeight = textInfo.lineHeight || ""
  const letterSpacing = textInfo.letterSpacing || ""
  const textDecorationThickness = textInfo.textDecorationThickness || ""
  const textAlign = textInfo.textAlign

  const [isHexColorPickerVisible, setIsHexColorPickerVisible] = useState(false)

  const updateSelTextInfo = (newTextInfo: ITextInfo) => {
    if (selPageObject?.type === "text") {
      selPageObject.url = addTextInfoToStringify(
        newTextInfo,
        selPageObject.url
      )
      setPageObject(selPageObject)
      axios.post("/savePageObject", selPageObject)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <InputLabel htmlFor="text" value="Text"/>
        <TextInput
          className="mt-1 block w-full"
          id="text"
          value={text}
          onChange={async (e) => {
            if (isSaving) {
              return
            }

            if (selPageObject?.type === "text") {
              updateSelTextInfo({ text: e.target.value })
            } else if (selPageId) {
              setIsSaving(true)
              const newPageObject: IPageObject = {
                page_id: selPageId,
                type: "text",
                url: addTextInfoToStringify(
                  {
                    text: e.target.value,
                    color: "#000000",
                    fontFamily: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                    fontWeight: 400,
                    fontSize: 96,
                    lineHeight: 1,
                    letterSpacing: 0,
                    textDecorationThickness: 0,
                    textAlign: "left",
                  },
                  "{}"
                ),
              }
              const res = await axios.post("/savePageObject", newPageObject)
              toast("Text created.")
              newPageObject.id = res.data.id
              setPageObject(newPageObject)
              setSelPageObjectId(res.data.id)
              setIsSaving(false)
            }
          }}
        />
      </div>
      <div className="flex gap-4">
        <div
          className="w-12 h-12 rounded-full cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => setIsHexColorPickerVisible(!isHexColorPickerVisible)}
        />
        {isHexColorPickerVisible && (
          <HexColorPicker
            color={color}
            onChange={(v) => updateSelTextInfo({ color: v })}
          />
        )}
      </div>
      {/* <div className="flex gap-4 items-center">
        <div>Transparent</div>
        <Switch
          checked={isTransparent}
          // @ts-expect-error -- TODO
          onChange={setIsTransparent}
        />
      </div> */}
      <div>
        <InputLabel htmlFor="fontfamily" value="Font Family"/>
        <Select
          className="mt-1 block w-full"
          id="fontfamily"
          value={fontFamilyOptionArr.find((v) => v.value === fontFamily)}
          onChange={(v) => updateSelTextInfo({ fontFamily: v?.value })}
          options={fontFamilyOptionArr}
          isSearchable={false}
        />
      </div>
      <div>
        <InputLabel htmlFor="fontweight" value="Font Weight"/>
        <Select
          className="mt-1 block w-full"
          id="fontweight"
          value={fontWeightOptionArr.find((v) => v.value === fontWeight)}
          onChange={(v) => updateSelTextInfo({ fontWeight: v?.value })}
          options={fontWeightOptionArr}
          isSearchable={false}
        />
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <InputLabel htmlFor="fontsize" value="Font Size"/>
          <TextInput
            className="mt-1 block w-full"
            id="fontsize"
            value={fontSize}
            onChange={(e) =>
              updateSelTextInfo({ fontSize: Number(e.target.value) })
            }
          />
        </div>
        <div className="w-full">
          <InputLabel htmlFor="lineHeight" value="Line Height"/>
          <TextInput
            className="mt-1 block w-full"
            id="lineHeight"
            value={lineHeight}
            onChange={(e) => {
              updateSelTextInfo({ lineHeight: Number(e.target.value) })
            }}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <InputLabel htmlFor="letterSpacing" value="Letter Spacing"/>
          <TextInput
            className="mt-1 block w-full"
            id="letterSpacing"
            value={letterSpacing}
            onChange={(e) => {
              updateSelTextInfo({ letterSpacing: Number(e.target.value) })
            }}
          />
        </div>
        <div className="w-full">
          <InputLabel htmlFor="thickness" value="Thickness"/>
          <TextInput
            className="mt-1 block w-full"
            id="thickness"
            value={textDecorationThickness}
            onChange={(e) => {
              updateSelTextInfo({
                textDecorationThickness: Number(e.target.value),
              })
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>Text Align</div>
        <div className="flex gap-4">
          {Object.keys(textAligns).map((v, i) => (
            <div
              className={classNames("border text-3xl rounded cursor-pointer", {
                "border-red-500": textAlign === v,
              })}
              key={i}
              onClick={() => updateSelTextInfo({ textAlign: v })}
            >
              {textAligns[v]}
            </div>
          ))}
        </div>
      </div>
      {/* <div className="flex flex-col gap-1">
        <div>Position</div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <BsAlignTop className="border text-3xl rounded cursor-pointer"/>
              Top
            </div>
            <div className="flex items-center gap-1">
              <BsAlignBottom className="border text-3xl rounded cursor-pointer"/>
              Bottom
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <BsAlignMiddle className="border text-3xl rounded cursor-pointer"/>
              Middle
            </div>
            <div className="flex items-center gap-1">
              <BsAlignCenter className="border text-3xl rounded cursor-pointer"/>
              Center
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <BsAlignStart className="border text-3xl rounded cursor-pointer"/>
              Left
            </div>
            <div className="flex items-center gap-1">
              <BsAlignEnd className="border text-3xl rounded cursor-pointer"/>
              Right
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}
