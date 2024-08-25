import {useZustand} from "@/store/useZustand"
import classNames from "classnames"
// import {BiRedo, BiUndo} from "react-icons/bi"
import {useApi} from "@/hooks/useApi"
import {BsPlusSquare, BsTrash} from "react-icons/bs"
import {R3fScene} from "./R3fScene/R3fScene"

const transformModes: { [key: string]: string } = {
  translate: "Translate",
  rotate: "Rotate",
  scale: "Scale",
}

export const Scene = () => {
  const { transformMode, setTransformMode } = useZustand()
  const { createNewPage, deleteSelPageCond, deleteSelPage } = useApi()

  return (
    <div className="w-full h-full text-sm relative">
      <div className="absolute w-full flex justify-between items-center p-2 z-10 bg-white">
        <div className="flex gap-2 items-center">
          {Object.keys(transformModes).map((v, i) => (
            <div
              className={classNames(
                "flex gap-1 items-center p-1 border rounded cursor-pointer",
                {
                  "border-gray-500": transformMode !== v,
                  "border-red-500": transformMode === v,
                }
              )}
              key={i}
              onClick={() =>
                setTransformMode(v as "translate" | "rotate" | "scale")
              }
            >
              {transformModes[v]}
            </div>
          ))}
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
            onClick={createNewPage}
          >
            <BsPlusSquare className="text-base"/>
            <div>New Page</div>
          </div>
          <div
            className={classNames(
              "flex gap-1 items-center p-1 border rounded cursor-pointer border-gray-500",
              { "text-gray-500": !deleteSelPageCond() }
            )}
            onClick={deleteSelPage}
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
