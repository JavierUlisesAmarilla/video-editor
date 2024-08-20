import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import {useState} from "react"
import {HexColorPicker} from "react-colorful"
import Switch from "react-custom-checkbox/switch"
import Select from "react-select"

const fountainOptions = [
  { value: "arial", label: "Arial" },
  { value: "verdana", label: "Verdana" },
]

export const Text = () => {
  const [isHexColorPickerVisible, setIsHexColorPickerVisible] = useState(false)
  const [textColor, setTextColor] = useState("#000000")
  const [isTransparent, setIsTransparent] = useState(false)
  const [selectedFountainOption, setSelectedFountainOption] = useState(null)

  return (
    <div className="p-2 flex flex-col gap-2">
      <div>
        <InputLabel htmlFor="text" value="Text"/>
        <TextInput
          className="mt-1 block w-full"
          id="text"
          // value={data.name}
          // onChange={(e) => setData('name', e.target.value)}
          isFocused
        />
      </div>
      <div className="flex gap-1">
        <div
          className="w-12 h-12 rounded-full cursor-pointer"
          style={{ backgroundColor: textColor }}
          onClick={() => setIsHexColorPickerVisible(!isHexColorPickerVisible)}
        />
        {isHexColorPickerVisible && (
          <HexColorPicker color={textColor} onChange={setTextColor}/>
        )}
      </div>
      <div className="flex gap-1 items-center">
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
          options={fountainOptions}
          isSearchable={false}
        />
      </div>
    </div>
  )
}
