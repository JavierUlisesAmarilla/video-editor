import {useZustand} from "@/store/useZustand"
import {Page} from "@/types"
import axios from "axios"
import classNames from "classnames"
import {BsCardImage, BsPlusSquare} from "react-icons/bs"
import {toast} from "react-toast"

export const Slide = () => {
  const { pageArr, addPage, selPageId, setSelPageId } = useZustand()

  return (
    <div className="text-sm flex flex-col items-center gap-1 p-1">
      {pageArr.map((page, idx) => (
        <div
          className={classNames(
            "border w-full p-1 relative rounded cursor-pointer",
            { "border-red-500": page.id === selPageId }
          )}
          key={idx}
          onClick={() => {
            setSelPageId(page.id!)
          }}
        >
          <BsCardImage className="text-8xl w-full"/>
          <div className="absolute top-1 left-1 bg-black px-3 py-0.5 rounded border text-white">
            {idx + 1}
          </div>
        </div>
      ))}
      <div
        className="flex items-center gap-1 border p-1 cursor-pointer rounded"
        onClick={async () => {
          const newPage: Page = {}
          const res = await axios.post("/savePage", newPage)
          toast("New page created.")
          newPage.id = res.data.id
          addPage(newPage)
          setSelPageId(newPage.id!)
        }}
      >
        <BsPlusSquare/>
        New Page
      </div>
    </div>
  )
}
