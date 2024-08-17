import {useZustand} from "@/store/useZustand"
import {Page} from "@/types"
import axios from "axios"
import classNames from "classnames"
import {BiRedo, BiSolidBrush, BiUndo} from "react-icons/bi"
import {BsPlusSquare, BsTrash} from "react-icons/bs"

export const Scene = () => {
  const { selPageId, setSelPageId, addPage, removePage } = useZustand()

  return (
    <div className="w-full h-full flex flex-col text-sm">
      <div className="flex justify-between items-center p-1">
        <div className="flex gap-1 items-center">
          <div className="flex gap-1 items-center p-1 border rounded cursor-pointer">
            <BiUndo className="text-base"/>
            <div>Undo</div>
          </div>
          <div className="flex gap-1 items-center p-1 border rounded cursor-pointer">
            <BiRedo className="text-base"/>
            <div>Redo</div>
          </div>
          <div className="flex gap-1 items-center p-1 border rounded cursor-pointer">
            <BiSolidBrush className="text-base"/>
            <div>Background</div>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <div
            className={classNames(
              "flex gap-1 items-center p-1 border rounded cursor-pointer",
              { "text-gray-500": !selPageId }
            )}
            onClick={async () => {
              if (selPageId) {
                const res = await axios.delete(`/deletePage/${selPageId}`)

                if (res.data) {
                  removePage(selPageId)
                  setSelPageId(0)
                }
              }
            }}
          >
            <BsTrash className="text-base"/>
            <div>Remove Page</div>
          </div>
          <div
            className="flex gap-1 items-center p-1 border rounded cursor-pointer"
            onClick={async () => {
              const newPage: Page = {}
              const res = await axios.post("/savePage", newPage)
              newPage.id = res.data.id
              addPage(newPage)
              setSelPageId(newPage.id!)
            }}
          >
            <BsPlusSquare className="text-base"/>
            <div>New Page</div>
          </div>
        </div>
      </div>
      <div className="flex-1">Scene</div>
    </div>
  )
}
