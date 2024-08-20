import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import {useState} from "react"
import {HexColorPicker} from "react-colorful"
import Switch from "react-custom-checkbox/switch"
import {
  BsAlignBottom,
  BsAlignCenter,
  BsAlignEnd,
  BsAlignMiddle,
  BsAlignStart,
  BsAlignTop,
  BsTextCenter,
  BsTextLeft,
  BsTextParagraph,
  BsTextRight,
} from "react-icons/bs"
import Select from "react-select"

export const Text = () => {
  const [isHexColorPickerVisible, setIsHexColorPickerVisible] = useState(false)
  const [textColor, setTextColor] = useState("#000000")
  const [isTransparent, setIsTransparent] = useState(false)
  const [selectedFountainOption, setSelectedFountainOption] = useState()
  const [selectedWeightOption, setSelectedWeightOption] = useState()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <InputLabel htmlFor="text" value="Text"/>
        <TextInput
          className="mt-1 block w-full"
          id="text"
          // value={data.name}
          // onChange={(e) => setData('name', e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <div
          className="w-12 h-12 rounded-full cursor-pointer"
          style={{ backgroundColor: textColor }}
          onClick={() => setIsHexColorPickerVisible(!isHexColorPickerVisible)}
        />
        {isHexColorPickerVisible && (
          <HexColorPicker color={textColor} onChange={setTextColor}/>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <div>Transparent</div>
        <Switch
          checked={isTransparent}
          // @ts-expect-error -- TODO
          onChange={setIsTransparent}
        />
      </div>
      <div>
        <InputLabel htmlFor="fountain" value="Fountain"/>
        <Select
          className="mt-1 block w-full"
          id="fountain"
          value={selectedFountainOption}
          // @ts-expect-error -- TODO
          onChange={setSelectedFountainOption}
          options={[
            { value: "arial", label: "Arial" },
            { value: "verdana", label: "Verdana" },
          ]}
          isSearchable={false}
        />
      </div>
      <div>
        <InputLabel htmlFor="weight" value="Weight"/>
        <Select
          className="mt-1 block w-full"
          id="weight"
          value={selectedWeightOption}
          // @ts-expect-error -- TODO
          onChange={setSelectedWeightOption}
          options={[
            { value: "regular", label: "Regular" },
            { value: "italic", label: "Italic" },
            { value: "semiBold", label: "Semi-Bold" },
            { value: "bold", label: "Bold" },
          ]}
          isSearchable={false}
        />
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <InputLabel htmlFor="size" value="Size"/>
          <TextInput className="mt-1 block w-full" id="size"/>
        </div>
        <div className="w-full">
          <InputLabel htmlFor="lineSpacing" value="Line Spacing"/>
          <TextInput className="mt-1 block w-full" id="lineSpacing"/>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <InputLabel htmlFor="spacing" value="Spacing"/>
          <TextInput className="mt-1 block w-full" id="spacing"/>
        </div>
        <div className="w-full">
          <InputLabel htmlFor="thickness" value="Thickness"/>
          <TextInput className="mt-1 block w-full" id="thickness"/>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>Align</div>
        <div className="flex gap-4">
          <BsTextLeft className="border text-3xl rounded cursor-pointer"/>
          <BsTextCenter className="border text-3xl rounded cursor-pointer"/>
          <BsTextRight className="border text-3xl rounded cursor-pointer"/>
          <BsTextParagraph className="border text-3xl rounded cursor-pointer"/>
        </div>
      </div>
      <div className="flex flex-col gap-1">
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
      </div>
    </div>
  )
}
