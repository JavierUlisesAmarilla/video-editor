import {BsPlusSquare} from "react-icons/bs"

export const Slide = () => {
  return (
    <div className="text-sm flex flex-col items-center gap-1 p-1">
      <div className="flex items-center gap-1 border p-1 cursor-pointer">
        <BsPlusSquare/>
        New Page
      </div>
    </div>
  )
}
