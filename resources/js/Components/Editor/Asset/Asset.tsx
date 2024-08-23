import {useZustand} from "@/store/useZustand"
import classNames from "classnames"
import {ReactNode} from "react"
import {BiCube, BiSolidBrush} from "react-icons/bi"
import {BsOpticalAudio, BsTextareaT, BsTv} from "react-icons/bs"
import {GiCarambola} from "react-icons/gi"
import {HiOutlineTemplate} from "react-icons/hi"
import {Audio} from "./Audio"
import {Background} from "./Background"
import {Effect} from "./Effect"
import {Model} from "./Model"
import {Multimedia} from "./Multimedia"
import {Template} from "./Template"
import {Text} from "./Text"

const assets: {
  [key: string]: { icon: ReactNode; title: string; content?: ReactNode };
} = {
  background: {
    icon: <BiSolidBrush className="text-3xl"/>,
    title: "Background",
    content: <Background/>,
  },
  text: {
    icon: <BsTextareaT className="text-3xl"/>,
    title: "Text",
    content: <Text/>,
  },
  multimedia: {
    icon: <BsTv className="text-3xl"/>,
    title: "Media",
    content: <Multimedia/>,
  },
  model: {
    icon: <BiCube className="text-3xl"/>,
    title: "Model",
    content: <Model/>,
  },
  audio: {
    icon: <BsOpticalAudio className="text-3xl"/>,
    title: "Audio",
    content: <Audio/>,
  },
  effect: {
    icon: <GiCarambola className="text-3xl"/>,
    title: "Effect",
    content: <Effect/>,
  },
  template: {
    icon: <HiOutlineTemplate className="text-3xl"/>,
    title: "Template",
    content: <Template/>,
  },
}

export const Asset = () => {
  const { selAssetId, setSelAssetId } = useZustand()

  return (
    <div className="w-full h-full flex text-xs">
      <div className="h-full flex flex-col items-center p-1 bg-black gap-2 overflow-auto text-white">
        {Object.keys(assets).map((k) => (
          <div
            className={classNames(
              "flex flex-col items-center p-2 cursor-pointer bg-opacity-50 rounded w-full",
              { "bg-gray-500": k === selAssetId }
            )}
            key={k}
            onClick={() => setSelAssetId(k)}
          >
            {assets[k].icon}
            {assets[k].title}
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-auto p-2">
        {selAssetId && assets[selAssetId].content}
      </div>
    </div>
  )
}
