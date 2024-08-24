import {useZustand} from "@/store/useZustand"
import {Item, Menu} from "react-contexify"
import "react-contexify/dist/ReactContexify.css"
import {BsTrash} from "react-icons/bs"

export const CONTEXIFY_ID = "contexify"

export const Contexify = () => {
  const { selPageObjectId } = useZustand()

  const onRemoveObject = () => {
    console.log("test: onRemoveObject")
  }

  return (
    <Menu id={CONTEXIFY_ID}>
      <Item disabled={!selPageObjectId} onClick={onRemoveObject}>
        <div className="flex gap-1 items-center">
          <BsTrash className="text-base"/>
          <div>Remove Object</div>
        </div>
      </Item>
    </Menu>
  )
}
