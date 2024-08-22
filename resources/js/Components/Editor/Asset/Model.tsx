import {useZustand} from "@/store/useZustand"
import {PageObject} from "@/types"
import {toChunk} from "@/utils/common"
import axios from "axios"
import {toast} from "react-toast"

const modelArr: { type: string; imageSrc: string; modelSrc: string }[][] =
  toChunk(
    [
      {
        imageSrc: "/storage/model/arrow.png",
        modelSrc: "/storage/model/arrow_o.glb",
      },
      {
        imageSrc: "/storage/model/bathroom.png",
        modelSrc: "/storage/model/bathroom_o.glb",
      },
      {
        imageSrc: "/storage/model/boot.png",
        modelSrc: "/storage/model/boot_o.glb",
      },
      {
        imageSrc: "/storage/model/canon.png",
        modelSrc: "/storage/model/canon_o.glb",
      },
      {
        imageSrc: "/storage/model/car.png",
        modelSrc: "/storage/model/car_o.glb",
      },
      {
        imageSrc: "/storage/model/casual_christ.png",
        modelSrc: "/storage/model/casual_christ_o.glb",
      },
      {
        imageSrc: "/storage/model/chick.png",
        modelSrc: "/storage/model/chick_o.glb",
      },
      {
        imageSrc: "/storage/model/coin_race.png",
        modelSrc: "/storage/model/coin_race_o.glb",
      },
      {
        imageSrc: "/storage/model/colosseum.png",
        modelSrc: "/storage/model/colosseum_o.glb",
      },
      {
        imageSrc: "/storage/model/cottage.png",
        modelSrc: "/storage/model/cottage_o.glb",
      },
      {
        imageSrc: "/storage/model/crushed_chicken.png",
        modelSrc: "/storage/model/crushed_chicken_o.glb",
      },
      {
        imageSrc: "/storage/model/cup.png",
        modelSrc: "/storage/model/cup_o.glb",
      },
      {
        imageSrc: "/storage/model/hamburger.png",
        modelSrc: "/storage/model/hamburger_o.glb",
      },
      {
        imageSrc: "/storage/model/hands.png",
        modelSrc: "/storage/model/hands_o.glb",
      },
      {
        imageSrc: "/storage/model/helmet.png",
        modelSrc: "/storage/model/helmet_o.glb",
      },
      {
        imageSrc: "/storage/model/hologram.png",
        modelSrc: "/storage/model/hologram_o.glb",
      },
      {
        imageSrc: "/storage/model/hydrant.png",
        modelSrc: "/storage/model/hydrant_o.glb",
      },
      {
        imageSrc: "/storage/model/industrial_arm.png",
        modelSrc: "/storage/model/industrial_arm_o.glb",
      },
      {
        imageSrc: "/storage/model/industrial_worker.png",
        modelSrc: "/storage/model/industrial_worker_o.glb",
      },
      {
        imageSrc: "/storage/model/mouth.png",
        modelSrc: "/storage/model/mouth_o.glb",
      },
      {
        imageSrc: "/storage/model/park.png",
        modelSrc: "/storage/model/park_o.glb",
      },
      {
        imageSrc: "/storage/model/real_hammer.png",
        modelSrc: "/storage/model/real_hammer_o.glb",
      },
      {
        imageSrc: "/storage/model/revive.png",
        modelSrc: "/storage/model/revive_o.glb",
      },
      {
        imageSrc: "/storage/model/teddy.png",
        modelSrc: "/storage/model/teddy_o.glb",
      },
      {
        imageSrc: "/storage/model/tentacles.png",
        modelSrc: "/storage/model/tentacles_o.glb",
      },
      {
        imageSrc: "/storage/model/triceratops.png",
        modelSrc: "/storage/model/triceratops_o.glb",
      },
      {
        imageSrc: "/storage/model/vest.png",
        modelSrc: "/storage/model/vest_o.glb",
      },
    ],
    2
  )

export const Model = () => {
  const { selPageId, setPageObject } = useZustand()

  return (
    <div className="flex flex-col gap-2">
      {modelArr.map((arr, i1) => (
        <div className="flex gap-2" key={i1}>
          {arr.map((v, i2) => (
            <img
              className="w-32 h-20 border rounded cursor-pointer border-gray-500"
              key={i2}
              src={v.imageSrc}
              onClick={async () => {
                const newPageObject: PageObject = {
                  page_id: selPageId,
                  type: "glb",
                  url: v.modelSrc,
                }
                const res = await axios.post("/savePageObject", newPageObject)
                toast("Model created.")
                newPageObject.id = res.data.id
                setPageObject(newPageObject)
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
