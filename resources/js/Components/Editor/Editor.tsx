import {Asset} from "./Asset/Asset"
import {Scene} from "./Scene"
import {Slide} from "./Slide"
import {Timeline} from "./Timeline"

export const Editor = () => {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="h-2/3 flex justify-between">
        <div className="w-40">
          <Slide/>
        </div>
        <div className="w-2/3 border border-gray-500">
          <Scene/>
        </div>
        <div className="w-96">
          <Asset/>
        </div>
      </div>
      <div className="h-1/3">
        <Timeline/>
      </div>
    </div>
  )
}
