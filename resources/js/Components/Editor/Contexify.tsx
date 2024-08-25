import {useZustand} from "@/store/useZustand"
import {IPageObject} from "@/types"
import axios from "axios"
import {Item, Menu} from "react-contexify"
import "react-contexify/dist/ReactContexify.css"
import {BiDuplicate} from "react-icons/bi"
import {BsTrash} from "react-icons/bs"
import {toast} from "react-toast"

export const CONTEXIFY_ID = "contexify"

export const Contexify = () => {
  const {
    pageArr,
    selPageId,
    setSelPageId,
    pageObjectArr,
    selPageObjectId,
    setSelPageObjectId,
    setPageObject,
    removePageObject,
  } = useZustand()
  const selPageObject = pageObjectArr.find((v) => v.id === selPageObjectId)
  const nextPageId =
    pageArr[pageArr.findIndex((v) => v.id === selPageId) + 1]?.id

  return (
    <Menu id={CONTEXIFY_ID}>
      <Item
        disabled={!selPageObjectId}
        onClick={async () => {
          if (!selPageObjectId) {
            return
          }
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
          <div>Remove object</div>
        </div>
      </Item>
      <Item
        disabled={!selPageObject || !nextPageId}
        onClick={async () => {
          if (!selPageObject || !nextPageId) {
            return
          }
          const nextPageObject: IPageObject = {
            ...selPageObject,
            id: 0,
            page_id: nextPageId,
          }
          const res = await axios.post("/savePageObject", nextPageObject)
          nextPageObject.id = res.data.id
          selPageObject.next_id = res.data.id
          await axios.post("/savePageObject", selPageObject)
          toast("Duplicated to next page.")
          setPageObject(nextPageObject)
          setPageObject(selPageObject)
          setSelPageId(nextPageId)
          setSelPageObjectId(res.data.id)
        }}
      >
        <div className="flex gap-1 items-center">
          <BiDuplicate className="text-base"/>
          <div>Duplicate to next page</div>
        </div>
      </Item>
    </Menu>
  )
}
