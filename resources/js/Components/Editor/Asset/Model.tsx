import {useZustand} from "@/store/useZustand"
import {PageObject} from "@/types"
import {Vector3} from "@react-three/fiber"
import axios from "axios"
import {toast} from "react-toast"

const modelArr: {
  imageSrc: string;
  modelSrc: string;
  position?: Vector3;
  rotation?: Vector3;
  scale?: Vector3;
  offset?: Vector3;
}[] = [
  {
    imageSrc: "/storage/model/arrow.png",
    modelSrc: "/storage/model/arrow_o.glb",
    rotation: [Math.PI * 0.5, 0, 0],
  },
  {
    imageSrc: "/storage/model/bathroom.png",
    modelSrc: "/storage/model/bathroom_o.glb",
    offset: [0, -1.5, 0],
  },
  {
    imageSrc: "/storage/model/boot.png",
    modelSrc: "/storage/model/boot_o.glb",
    scale: [3, 3, 3],
    offset: [0.04, 1.8, 0],
  },
  {
    imageSrc: "/storage/model/canon.png",
    modelSrc: "/storage/model/canon_o.glb",
    scale: [0.5, 0.5, 0.5],
  },
  {
    imageSrc: "/storage/model/car.png",
    modelSrc: "/storage/model/car_o.glb",
    scale: [0.1, 0.1, 0.1],
    offset: [0, -6, 0],
  },
  {
    imageSrc: "/storage/model/casual_christ.png",
    modelSrc: "/storage/model/casual_christ_o.glb",
    scale: [2, 2, 2],
    offset: [0, -1, 0],
  },
  {
    imageSrc: "/storage/model/chick.png",
    modelSrc: "/storage/model/chick_o.glb",
    scale: [0.2, 0.2, 0.2],
    offset: [0, -10, 0],
  },
  {
    imageSrc: "/storage/model/coin_race.png",
    modelSrc: "/storage/model/coin_race_o.glb",
    offset: [0, -2.5, 0],
  },
  {
    imageSrc: "/storage/model/colosseum.png",
    modelSrc: "/storage/model/colosseum_o.glb",
    scale: [0.1, 0.1, 0.1],
    offset: [0, -10, 0],
  },
  {
    imageSrc: "/storage/model/cottage.png",
    modelSrc: "/storage/model/cottage_o.glb",
    offset: [0, -0.5, 0],
  },
  {
    imageSrc: "/storage/model/crushed_chicken.png",
    modelSrc: "/storage/model/crushed_chicken_o.glb",
    offset: [0, -1.5, 0],
  },
  {
    imageSrc: "/storage/model/cup.png",
    modelSrc: "/storage/model/cup_o.glb",
    offset: [0, -2, 0],
  },
  {
    imageSrc: "/storage/model/hamburger.png",
    modelSrc: "/storage/model/hamburger_o.glb",
    offset: [0, -1, 0],
  },
  {
    imageSrc: "/storage/model/hands.png",
    modelSrc: "/storage/model/hands_o.glb",
    offset: [-0.5, -2, 0],
  },
  {
    imageSrc: "/storage/model/helmet.png",
    modelSrc: "/storage/model/helmet_o.glb",
    scale: [10, 10, 10],
    offset: [0, -1.8, 0],
  },
  {
    imageSrc: "/storage/model/hologram.png",
    modelSrc: "/storage/model/hologram_o.glb",
    scale: [0.5, 0.5, 0.5],
    offset: [0, -1, 0],
  },
  {
    imageSrc: "/storage/model/hydrant.png",
    modelSrc: "/storage/model/hydrant_o.glb",
    offset: [0, -1, 0],
  },
  {
    imageSrc: "/storage/model/industrial_arm.png",
    modelSrc: "/storage/model/industrial_arm_o.glb",
    scale: [0.2, 0.2, 0.2],
    offset: [0, -19, 0],
  },
  {
    imageSrc: "/storage/model/industrial_worker.png",
    modelSrc: "/storage/model/industrial_worker_o.glb",
    scale: [2, 2, 2],
    offset: [0, -1, 0],
  },
  {
    imageSrc: "/storage/model/mouth.png",
    modelSrc: "/storage/model/mouth_o.glb",
    scale: [0.03, 0.03, 0.03],
    offset: [0, -5, 25],
  },
  {
    imageSrc: "/storage/model/park.png",
    modelSrc: "/storage/model/park_o.glb",
    scale: [0.1, 0.1, 0.1],
  },
  {
    imageSrc: "/storage/model/real_hammer.png",
    modelSrc: "/storage/model/real_hammer_o.glb",
    scale: [0.2, 0.2, 0.2],
    offset: [0, -5, 0],
  },
  {
    imageSrc: "/storage/model/revive.png",
    modelSrc: "/storage/model/revive_o.glb",
    offset: [0, -1, 0],
  },
  {
    imageSrc: "/storage/model/teddy.png",
    modelSrc: "/storage/model/teddy_o.glb",
    offset: [0, -1, 0],
  },
  {
    imageSrc: "/storage/model/tentacles.png",
    modelSrc: "/storage/model/tentacles_o.glb",
  },
  {
    imageSrc: "/storage/model/triceratops.png",
    modelSrc: "/storage/model/triceratops_o.glb",
    scale: [0.3, 0.3, 0.3],
  },
  {
    imageSrc: "/storage/model/vest.png",
    modelSrc: "/storage/model/vest_o.glb",
    scale: [5, 5, 5],
    offset: [0, -1.3, 0],
  },
]

export const Model = () => {
  const { selPageId, setPageObject, setSelPageObjectId } = useZustand()

  return (
    <div className="flex gap-2 flex-wrap">
      {modelArr.map((v, i) => (
        <img
          className="w-32 h-20 border rounded cursor-pointer border-gray-500"
          key={i}
          src={v.imageSrc}
          onClick={async () => {
            if (!selPageId) {
              return
            }
            const newPageObject: PageObject = {
              page_id: selPageId,
              type: "glb",
              url: v.modelSrc,
            }

            if (v.position) {
              const p = v.position.toString().split(",").map(parseFloat)
              newPageObject.px = p[0]
              newPageObject.py = p[1]
              newPageObject.pz = p[2]
            }

            if (v.rotation) {
              const r = v.rotation.toString().split(",").map(parseFloat)
              newPageObject.rx = r[0]
              newPageObject.ry = r[1]
              newPageObject.rz = r[2]
            }

            if (v.scale) {
              const s = v.scale.toString().split(",").map(parseFloat)
              newPageObject.sx = s[0]
              newPageObject.sy = s[1]
              newPageObject.sz = s[2]
            }

            if (v.offset) {
              const o = v.offset.toString().split(",").map(parseFloat)
              newPageObject.ox = o[0]
              newPageObject.oy = o[1]
              newPageObject.oz = o[2]
            }

            const res = await axios.post("/savePageObject", newPageObject)
            toast("Model created.")
            newPageObject.id = res.data.id
            setPageObject(newPageObject)
            setSelPageObjectId(res.data.id)
          }}
        />
      ))}
    </div>
  )
}
