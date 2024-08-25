import {useApi} from "@/hooks/useApi"
import {useZustand} from "@/store/useZustand"
import classNames from "classnames"
import {BsCardImage, BsPlusSquare} from "react-icons/bs"

export const Slide = () => {
  const { pageArr, selPageId, setSelPageId } = useZustand()
  const { createNewPage } = useApi()

  return (
    <div className="w-full h-full text-sm flex flex-col items-center gap-2 p-2 overflow-auto">
      {pageArr.map((page, idx) => (
        <div
          className={classNames(
            "border w-full p-2 relative rounded cursor-pointer",
            {
              "border-gray-500": page.id !== selPageId,
              "border-red-500": page.id === selPageId,
            }
          )}
          key={idx}
          onClick={() => {
            setSelPageId(page.id!)
          }}
        >
          <BsCardImage className="text-7xl w-full"/>
          <div className="absolute top-1 left-1 bg-black px-3 rounded border text-white">
            {idx + 1}
          </div>
        </div>
      ))}
      <div
        className="flex items-center gap-1 border p-1 cursor-pointer rounded border-gray-500"
        onClick={createNewPage}
      >
        <BsPlusSquare/>
        New Page
      </div>
    </div>
  )
}
