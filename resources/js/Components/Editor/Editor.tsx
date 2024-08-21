import {Asset} from "./Asset/Asset"
import {Scene} from "./Scene"
import {Slide} from "./Slide"

export const Editor = () => {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="h-3/4 flex">
        <div className="w-1/12 border border-gray-500">
          <Slide/>
        </div>
        <div className="w-8/12 border border-gray-500">
          <Scene/>
        </div>
        <div className="w-3/12 border border-gray-500">
          <Asset/>
        </div>
      </div>
      <div className="h-1/4 p-2 border border-gray-500">Timeline</div>
    </div>
  )
}
