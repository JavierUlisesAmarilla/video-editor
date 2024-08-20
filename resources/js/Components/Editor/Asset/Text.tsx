import InputLabel from "@/Components/InputLabel"
import TextInput from "@/Components/TextInput"
import {useState} from "react"
import {HexColorPicker} from "react-colorful"

export const Text = () => {
  const [isHexColorPickerVisible, setIsHexColorPickerVisible] = useState(false)
  const [textColor, setTextColor] = useState("#000000")

  return (
    <div className="p-2 flex flex-col gap-2">
      <div>
        <InputLabel htmlFor="text" value="Text"/>
        <TextInput
          id="text"
          className="mt-1 block w-full"
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
    </div>
  )
}
