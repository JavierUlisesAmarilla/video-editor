import {useZustand} from "@/store/useZustand"
import {Page} from "@/types"
import axios from "axios"
import classNames from "classnames"
// import {BiRedo, BiUndo} from "react-icons/bi"
import {BsPlusSquare, BsTrash} from "react-icons/bs"
import {toast} from "react-toast"
import {R3fScene} from "./R3fScene/R3fScene"

export const Scene = () => {
  const { pageArr, selPageId, setSelPageId, addPage, removePage } =
    useZustand()

  return (
    <div className="w-full h-full text-sm relative">
      <div className="absolute w-full flex justify-between items-center p-2 z-10 bg-white">
        <div className="flex gap-2 items-center">
          {/* <div className="flex gap-1 items-center p-1 border rounded cursor-pointer border-gray-500">
            <BiUndo className="text-base"/>
            <div>Undo</div>
          </div>
          <div className="flex gap-1 items-center p-1 border rounded cursor-pointer border-gray-500">
            <BiRedo className="text-base"/>
            <div>Redo</div>
          </div> */}
        </div>
        <div className="flex gap-2 items-center">
          <div
            className="flex gap-1 items-center p-1 border rounded cursor-pointer border-gray-500"
            onClick={async () => {
              const newPage: Page = {}
              const res = await axios.post("/savePage", newPage)
              toast("New page created.")
              newPage.id = res.data.id
              addPage(newPage)
              setSelPageId(newPage.id!)
            }}
          >
            <BsPlusSquare className="text-base"/>
            <div>New Page</div>
          </div>
          <div
            className={classNames(
              "flex gap-1 items-center p-1 border rounded cursor-pointer border-gray-500",
              { "text-gray-500": !selPageId }
            )}
            onClick={async () => {
              if (selPageId) {
                const res = await axios.delete(`/deletePage/${selPageId}`)

                if (res.data) {
                  toast(
                    `Page ${pageArr.findIndex((v) => v.id === selPageId) + 1} removed.`
                  )
                  removePage(selPageId)
                  setSelPageId(0)
                }
              }
            }}
          >
            <BsTrash className="text-base"/>
            <div>Remove Page</div>
          </div>
        </div>
      </div>
      <R3fScene/>
    </div>
  )
}
