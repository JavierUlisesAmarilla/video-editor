import {useZustand} from "@/store/useZustand"
import classNames from "classnames"
import {ReactNode} from "react"
import {BiCube} from "react-icons/bi"
import {BsOpticalAudio, BsTextareaT, BsTv} from "react-icons/bs"
import {GiCarambola} from "react-icons/gi"
import {HiOutlineTemplate} from "react-icons/hi"
import {Audio} from "./Audio"
import {Multimedia} from "./Multimedia"
import {Text} from "./Text"
import {ThreeD} from "./ThreeD"

const assets: {
  [key: string]: { icon: ReactNode; title: string; content?: ReactNode };
} = {
  text: {
    icon: <BsTextareaT className="text-5xl"/>,
    title: "Text",
    content: <Text/>,
  },
  multimedia: {
    icon: <BsTv className="text-5xl"/>,
    title: "Multimedia",
    content: <Multimedia/>,
  },
  "3d": {
    icon: <BiCube className="text-5xl"/>,
    title: "3D",
    content: <ThreeD/>,
  },
  audio: {
    icon: <BsOpticalAudio className="text-5xl"/>,
    title: "Audio",
    content: <Audio/>,
  },
  effect: {
    icon: <GiCarambola className="text-5xl"/>,
    title: "Effect",
  },
  template: {
    icon: <HiOutlineTemplate className="text-5xl"/>,
    title: "Template",
  },
}

export const Asset = () => {
  const { selAssetId, setSelAssetId } = useZustand()

  return (
    <div className="w-full h-full flex text-sm">
      <div className="h-full flex flex-col items-center p-2 bg-black gap-2 overflow-auto text-white">
        {Object.keys(assets).map((k) => (
          <div
            className={classNames(
              "flex flex-col items-center p-1 cursor-pointer bg-opacity-50 rounded w-full",
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
      <div className="flex-1 overflow-auto p-4">
        {selAssetId && assets[selAssetId].content}
      </div>
    </div>
  )
}
