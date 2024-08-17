import {useZustand} from "@/store/useZustand"
import axios from "axios"
import {BsCardImage, BsPlusSquare} from "react-icons/bs"

export const Slide = () => {
  const { pageArr, addPage } = useZustand()

  const onNewPage = async () => {
    const newPage = {}
    await axios.post("/savePage", newPage)
    addPage(newPage)
  }

  return (
    <div className="text-sm flex flex-col items-center gap-1 p-1">
      {pageArr.map((page, idx) => (
        <div
          className="border w-full p-1 relative rounded cursor-pointer"
          key={idx}
        >
          <BsCardImage className="text-8xl w-full"/>
          <div className="absolute top-1 left-1 bg-black px-3 py-0.5 rounded border text-white border-gray-500">
            {idx + 1}
          </div>
        </div>
      ))}
      <div
        className="flex items-center gap-1 border p-1 cursor-pointer rounded"
        onClick={onNewPage}
      >
        <BsPlusSquare/>
        New Page
      </div>
    </div>
  )
}
