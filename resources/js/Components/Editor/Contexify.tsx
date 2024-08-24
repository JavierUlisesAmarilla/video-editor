import {useZustand} from "@/store/useZustand"
import axios from "axios"
import {Item, Menu} from "react-contexify"
import "react-contexify/dist/ReactContexify.css"
import {BsTrash} from "react-icons/bs"
import {toast} from "react-toast"

export const CONTEXIFY_ID = "contexify"

export const Contexify = () => {
  const { selPageObjectId, setSelPageObjectId, removePageObject } =
    useZustand()

  return (
    <Menu id={CONTEXIFY_ID}>
      <Item
        disabled={!selPageObjectId}
        onClick={async () => {
          const res = await axios.delete(
            `/deletePageObject/${selPageObjectId}`
          )

          if (res.data) {
            toast("Page object removed.")
            removePageObject(selPageObjectId)
            setSelPageObjectId(0)
          }
        }}
      >
        <div className="flex gap-1 items-center">
          <BsTrash className="text-base"/>
          <div>Remove Object</div>
        </div>
      </Item>
    </Menu>
  )
}
